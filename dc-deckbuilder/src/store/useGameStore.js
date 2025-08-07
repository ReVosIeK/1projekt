import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
  cards: [],
  playerDeck: [],
  mainDeck: [],
  hand: [],
  discard: [],
  lineup: [],
  played: [],
  power: 0,

  async loadCards() {
    const res = await fetch('/data/cards.json')
    const data = await res.json()
    set({ cards: data })
  },

  // 🔹 Talia startowa gracza
  initializePlayerDeck() {
    const starter = [
      ...Array(7).fill('punch'),
      ...Array(3).fill('vulnerability'),
    ]
    const shuffled = starter.sort(() => Math.random() - 0.5)
    set({ playerDeck: shuffled, discard: [], hand: [], played: [], power: 0 })
  },

  // 🔹 Talia główna (bez starterów)
  initializeMainDeck() {
    const { cards } = get()
    const nonStarters = cards
      .filter(c => !['punch', 'vulnerability'].includes(c.id))
      .map(c => c.id)

    const shuffled = nonStarters.sort(() => Math.random() - 0.5)
    set({ mainDeck: shuffled })
  },

  drawHand() {
    set((state) => {
      const drawn = state.playerDeck.slice(0, 5)
      const remaining = state.playerDeck.slice(5)
      return { hand: drawn, playerDeck: remaining }
    })
  },

  initializeLineup() {
    set((state) => {
      const lineup = state.mainDeck.slice(0, 5)
      const remaining = state.mainDeck.slice(5)
      return { lineup, mainDeck: remaining }
    })
  },

  playCard(cardId) {
    const { cards } = get()
    const cardData = cards.find(c => c.id === cardId)
    if (!cardData) return

    set((state) => {
      // Znajdujemy indeks pierwszego wystąpienia tej karty
      const idx = state.hand.findIndex(id => id === cardId)
      if (idx === -1) return {}

      // Kopiujemy rękę i usuwamy TYLKO 1 kartę
      const newHand = [...state.hand]
      newHand.splice(idx, 1)

      const newPlayed = [...state.played, cardId]
      const addedPower = cardData.power || 0

      return {
        hand: newHand,
        played: newPlayed,
        power: state.power + addedPower,
      }
    })
  },

  attemptBuyCard(cardId) {
    const { cards, hand, power } = get()
    const card = cards.find(c => c.id === cardId)
    if (!card) return

    console.log(`🛒 Próba zakupu: ${card.name_pl} (koszt: ${card.cost}, moc: ${power})`)

    if (power >= card.cost) {
      set((state) => {
        const newDiscard = [...state.discard, cardId]
        const newLineup = state.lineup.filter(id => id !== cardId)

        // Uzupełniamy Line-Up nową kartą z mainDeck
        let newMainDeck = [...state.mainDeck]
        if (newMainDeck.length > 0) {
          const newCard = newMainDeck[0]
          newLineup.push(newCard)
          newMainDeck = newMainDeck.slice(1)
        }

        return {
          discard: newDiscard,
          lineup: newLineup,
          mainDeck: newMainDeck,
        }
      })

      console.log(`✅ Karta ${card.name_pl} kupiona i dodana do discard!`)
    } else {
      console.log(`❌ Za mało mocy, aby kupić ${card.name_pl}`)
    }
  },

  endTurn() {
    set((state) => {
      const allToDiscard = [...state.hand, ...state.played]
      const newDiscard = [...state.discard, ...allToDiscard]

      let newDeck = [...state.playerDeck]
      let reshuffledDiscard = [...newDiscard]

      // Tasowanie discard, jeśli deck za mały
      if (newDeck.length < 5) {
        reshuffledDiscard = reshuffledDiscard.sort(() => Math.random() - 0.5)
        newDeck = [...newDeck, ...reshuffledDiscard]
        reshuffledDiscard = []
      }

      const newHand = newDeck.slice(0, 5)
      newDeck = newDeck.slice(5)

      return {
        hand: newHand,
        playerDeck: newDeck,
        discard: reshuffledDiscard,
        played: [],
        power: 0,
      }
    })
  },
}))

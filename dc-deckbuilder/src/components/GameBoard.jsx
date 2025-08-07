import { useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'

export default function GameBoard() {
  const cards = useGameStore(state => state.cards)
  const hand = useGameStore(state => state.hand)
  const lineup = useGameStore(state => state.lineup)
  const played = useGameStore(state => state.played)
  const power = useGameStore(state => state.power)

  const loadCards = useGameStore(state => state.loadCards)
  const initializePlayerDeck = useGameStore(state => state.initializePlayerDeck)
  const initializeMainDeck = useGameStore(state => state.initializeMainDeck)
  const drawHand = useGameStore(state => state.drawHand)
  const initializeLineup = useGameStore(state => state.initializeLineup)
  const attemptBuyCard = useGameStore(state => state.attemptBuyCard)
  const playCard = useGameStore(state => state.playCard)
  const endTurn = useGameStore(state => state.endTurn)

  useEffect(() => {
    loadCards()
  }, [])

  const startGame = () => {
    initializePlayerDeck()
    initializeMainDeck()
    drawHand()
    initializeLineup()
  }

  const getCardData = (id) => cards.find(c => c.id === id)

  return (
    <div className="text-white w-full max-w-7xl mx-auto flex flex-col h-full overflow-hidden">
      {/* Nagłówek */}
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">DC Deck-Building Game</h1>
        <button
          className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
          onClick={startGame}
        >
          🔄 Rozpocznij grę
        </button>
        <div className="mt-2 text-lg">Moc: {power}</div>
      </div>

      {/* 🃏 Line-Up */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">🃏 Line-Up</h2>
        <div className="flex justify-center gap-4 overflow-x-auto p-2 bg-gray-800 bg-opacity-70 rounded-xl max-w-6xl mx-auto">
          {lineup.map((cardId, i) => {
            const card = getCardData(cardId)
            return (
              <div
                key={i}
                onClick={() => attemptBuyCard(cardId)}
                className="w-36 h-52 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-yellow-500"
                title={`Koszt: ${card?.cost}`}
              >
                <img
                  src={card?.image_path}
                  alt={card?.name_pl}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* 🔹 Zagrane karty */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-center">Zagrane karty</h2>
        <div className="flex justify-center gap-4 min-h-[8rem]">
          {played.map((cardId, i) => {
            const card = getCardData(cardId)
            return (
              <div key={i} className="w-28 h-40 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={card?.image_path}
                  alt={card?.name_pl}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ✋ Ręka gracza */}
      <div className="w-full px-4 pb-28 mt-auto">
        <div className="flex justify-center gap-4 overflow-x-auto p-2 bg-gray-900 bg-opacity-70 rounded-xl shadow-xl max-w-6xl mx-auto">
          {hand.map((cardId, i) => {
            const card = getCardData(cardId)
            return (
              <div
                key={i}
                onClick={() => playCard(cardId)}
                className="w-36 h-52 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={card?.image_path}
                  alt={card?.name_pl}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )
          })}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={endTurn}
            className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-400 transition"
          >
            🔚 Zakończ turę
          </button>
        </div>
      </div>
    </div>
  )
}

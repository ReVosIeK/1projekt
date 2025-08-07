import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'PL')
  const navigate = useNavigate()

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const startNewGame = () => {
    localStorage.removeItem('gameState')  // Kasowanie poprzedniej gry
    navigate('/game')  // Przejście do gry
  }

  const continueGame = () => {
    const gameState = JSON.parse(localStorage.getItem('gameState'))
    if (gameState) {
      navigate('/game')  // Przejście do kontynuowania gry
    } else {
      alert("Brak zapisanej gry!")
    }
  }

  return (
    <div className="text-white w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8">DC Deck-Building Game</h1>

      {/* Wybór języka */}
      <div className="mb-6">
        <button
          onClick={() => handleLanguageChange('PL')}
          className={`px-4 py-2 rounded-lg ${language === 'PL' ? 'bg-yellow-500' : 'bg-gray-700'}`}
        >
          Polski
        </button>
        <button
          onClick={() => handleLanguageChange('ENG')}
          className={`px-4 py-2 rounded-lg ${language === 'ENG' ? 'bg-yellow-500' : 'bg-gray-700'} ml-4`}
        >
          English
        </button>
      </div>

      {/* Przyciski gry */}
      <div className="flex gap-6">
        <button
          onClick={startNewGame}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition"
        >
          Nowa Gra
        </button>

        <button
          onClick={continueGame}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition"
        >
          Kontynuuj
        </button>
      </div>

      {/* Zakładka ustawień */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/settings')}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
        >
          Ustawienia
        </button>
      </div>
    </div>
  )
}
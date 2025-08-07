import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'PL')
  const navigate = useNavigate()

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <div className="text-white w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8">Ustawienia</h1>

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

      <div className="mt-8">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
        >
          Powrót do strony głównej
        </button>
      </div>
    </div>
  )
}
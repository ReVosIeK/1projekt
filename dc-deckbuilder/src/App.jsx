import GameBoard from './components/GameBoard'
import Chat from './components/Chat'
import EventLog from './components/EventLog'
import { useState } from 'react'

export default function App() {
  const [showChat, setShowChat] = useState(false) // 🔒 domyślnie ukryty
  const [showLog, setShowLog] = useState(false)   // 🔒 domyślnie ukryty

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-zinc-900 to-black text-white font-sans flex overflow-hidden relative">
      {/* Środkowa plansza */}
      <div className="flex-grow flex items-center justify-center overflow-hidden">
        <GameBoard />
      </div>

      {/* 💬 Czat – prawy dolny róg */}
      {showChat && (
        <div className="absolute bottom-4 right-4 w-[300px] h-[25vh] min-h-[160px] p-3 bg-zinc-800 border border-zinc-600 rounded-xl shadow-xl overflow-y-auto z-40">
          <Chat />
        </div>
      )}

      {/* 📜 Dziennik zdarzeń – lewy dolny róg */}
      {showLog && (
        <div className="absolute bottom-4 left-4 w-[300px] h-[25vh] min-h-[160px] p-3 bg-zinc-800 border border-zinc-600 rounded-xl shadow-xl overflow-y-auto z-40">
          <EventLog />
        </div>
      )}

      {/* Pasek sterowania 📜 💬 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex gap-4 bg-zinc-700 bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-zinc-500">
          <button
            onClick={() => setShowLog(prev => !prev)}
            className="w-8 h-8 rounded-full bg-white text-black text-lg font-bold shadow hover:scale-110 transition"
            title="Pokaż/Ukryj dziennik"
          >
            📜
          </button>
          <button
            onClick={() => setShowChat(prev => !prev)}
            className="w-8 h-8 rounded-full bg-white text-black text-lg font-bold shadow hover:scale-110 transition"
            title="Pokaż/Ukryj czat"
          >
            💬
          </button>
        </div>
      </div>
    </div>
  )
}

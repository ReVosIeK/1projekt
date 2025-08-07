import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { text: input, author: 'You' }])
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold">💬 Czat</h2>
      <div className="flex-1 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">
            <strong>{msg.author}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="flex-1 rounded p-1 text-black"
          placeholder="Wpisz wiadomość"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-2 rounded text-sm"
        >Wyślij</button>
      </div>
    </div>
  )
}

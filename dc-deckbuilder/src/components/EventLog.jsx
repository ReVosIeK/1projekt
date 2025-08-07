import { useState } from 'react'

export default function EventLog() {
  const [events, setEvents] = useState([
    "Gra rozpoczęta.",
    "Gracz 1 dobrał 5 kart.",
    "Gracz 2 dobrał 5 kart."
  ])

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold">📜 Dziennik zdarzeń</h2>
      <div className="flex-1 overflow-y-auto text-sm space-y-1 mt-2">
        {events.map((ev, i) => <div key={i}>• {ev}</div>)}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get('/api/events').then(res => setEvents(res.data))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <li
              key={ev._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
            >
              <Link to={`/events/${ev._id}`}>
                <h3 className="text-2xl font-semibold mb-2 hover:text-blue-600">{ev.title}</h3>
                <p className="text-gray-600 mb-1">{ev.date} at {ev.time}</p>
                <p className="text-gray-500">{ev.location}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

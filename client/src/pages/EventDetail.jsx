import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../stores/useAuthStore'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, token } = useAuthStore()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    axios.get(`/api/events/${id}`).then(res => setEvent(res.data))
  }, [id])

  if (!event) return <p className="text-center mt-10">Loading...</p>

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Event deleted')
      navigate('/dashboard')
    } catch {
      alert('Error deleting event')
    }
  }

  const isCreator = user && event.createdBy === user.id

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-4 text-blue-700">{event.title}</h2>
      <p className="mb-2"><strong>Date:</strong> {event.date}</p>
      <p className="mb-2"><strong>Time:</strong> {event.time}</p>
      <p className="mb-2"><strong>Location:</strong> {event.location}</p>
      <p className="mb-2"><strong>Category:</strong> {event.category || 'N/A'}</p>
      <p className="mt-4 text-gray-700">{event.description}</p>

      {isCreator && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/dashboard?edit=${id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded text-white font-semibold transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white font-semibold transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

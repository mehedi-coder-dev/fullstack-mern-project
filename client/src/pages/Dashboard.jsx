import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../stores/useAuthStore'

export default function Dashboard() {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const [events, setEvents] = useState([])
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
  })

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchEvents()
  }, [token])

  useEffect(() => {
    if (editId) {
      const ev = events.find((e) => e._id === editId)
      if (ev) setForm(ev)
    } else {
      setForm({
        title: '',
        date: '',
        time: '',
        location: '',
        category: '',
        description: '',
      })
    }
  }, [editId, events])

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events')
      setEvents(res.data.filter((ev) => ev.createdBy === user.id))
    } catch {
      alert('Error fetching your events')
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await axios.patch(`/api/events/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        alert('Event updated')
      } else {
        await axios.post('/api/events', form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        alert('Event created')
      }
      fetchEvents()
      navigate('/dashboard')
    } catch {
      alert('Error saving event')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Your Events</h2>

      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <h3 className="text-2xl font-semibold">
          {editId ? 'Edit Event' : 'Create Event'}
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition"
        >
          {editId ? 'Update Event' : 'Create Event'}
        </button>
      </form>

      <div>
        {events.length === 0 ? (
          <p className="text-gray-600">You have not created any events yet.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((ev) => (
              <li
                key={ev._id}
                className="border p-4 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{ev.title}</h3>
                <p>
                  {ev.date} at {ev.time}
                </p>
                <p>{ev.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

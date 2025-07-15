import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import { useEffect } from 'react'

function Header() {
  const { user, logout, fetchUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <Link to="/" className="font-extrabold text-3xl hover:text-gray-200 transition">Eventify</Link>
      <nav className="space-x-4 mt-3 sm:mt-0">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/events" className="hover:text-gray-300 transition">Events</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header

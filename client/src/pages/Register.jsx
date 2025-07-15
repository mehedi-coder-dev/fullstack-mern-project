import { useState } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await register(name, email, password)
    if (res.success) navigate('/login')
    else alert(res.message)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      <input type="text" placeholder="Name" className="w-full p-2 border" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" className="w-full p-2 border" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2 border" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  )
}

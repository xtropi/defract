import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoute({ children }) {
  const auth = useAuth()
  return auth.currentUser ? children : <Navigate to="/" />
}

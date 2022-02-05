import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const useAuth = () => {
  const { googleAuth, handleGoogleAuthentication } = useContext(AuthContext)
  return { googleAuth, handleGoogleAuthentication }
}

/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})

export const INITIAL_STATE = {
  email: '',
  name: '',
  image: '',
  status: 'unauthenticated',
  token: '',
}

export const AuthStateProvider = ({ children }) => {
  const [googleAuth, setGoogleAuth] = useState(INITIAL_STATE)
  const handleGoogleAuthentication = ({ email, name, image, status, token }) => {
    setGoogleAuth({ email, name, image, status, token })
  }
  return (
    <AuthContext.Provider value={{ googleAuth, handleGoogleAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

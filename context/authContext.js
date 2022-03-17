import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storageAuth } from '../config/constants'

export const AuthContext = createContext({})

export const INITIAL_STATE = {
  email: '',
  name: '',
  image: '',
  status: 'unauthenticated',
  token: '',
}

let authObjectStorage
const getAuthData = async () => {
  const jsonValue = await AsyncStorage.getItem(storageAuth)
  return jsonValue !== null ? JSON.parse(jsonValue) : INITIAL_STATE
}
getAuthData().then((res) => (authObjectStorage = res))

export const AuthStateProvider = ({ children }) => {
  const [googleAuth, setGoogleAuth] = useState(authObjectStorage)

  const handleGoogleAuthentication = async ({ email, name, image, status, token }) => {
    const newAuthGoogle = { email, name, image, status, token }
    const jsonValue = JSON.stringify(newAuthGoogle)
    setGoogleAuth(newAuthGoogle)
    await AsyncStorage.setItem(storageAuth, jsonValue)
  }
  return (
    <AuthContext.Provider value={{ googleAuth, handleGoogleAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

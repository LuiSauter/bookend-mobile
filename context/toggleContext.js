/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storageTheme } from '../config/constants'

export const ToggleContext = createContext({})

let themeString
const data = AsyncStorage.getItem(storageTheme)
data.then((res) => (themeString = res))

const storageDark = async () => {
  try {
    await AsyncStorage.setItem(storageTheme, 'dark')
  } catch (e) {
    console.error(e)
  }
}
const storageLight = async () => {
  try {
    await AsyncStorage.setItem(storageTheme, 'light')
  } catch (e) {
    console.error(e)
  }
}

export const ToggleStateProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [darkTheme, setDarkTheme] = useState(themeString === 'dark')
  const [word, setWord] = useState('')

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      darkTheme ? storageDark() : storageLight()
    }
    return () => (cleanup = false)
  }, [darkTheme])

  const handleModalVisible = () => setModalVisible(!modalVisible)
  const handleDarkTheme = () => setDarkTheme(!darkTheme)
  const handleChangeWord = (text) => setWord(text)

  return (
    <ToggleContext.Provider
      value={{
        modalVisible,
        handleModalVisible,
        darkTheme,
        handleDarkTheme,
        word,
        handleChangeWord,
      }}
    >
      {children}
    </ToggleContext.Provider>
  )
}

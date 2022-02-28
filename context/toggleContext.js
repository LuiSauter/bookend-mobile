/* eslint-disable react/prop-types */
import { useColorScheme } from 'react-native'
import React, { createContext, useState } from 'react'

export const ToggleContext = createContext({})

export const ToggleStateProvider = ({ children }) => {
  const scheme = useColorScheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [darkTheme, setDarkTheme] = useState(scheme === 'dark')
  const [word, setWord] = useState('')

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

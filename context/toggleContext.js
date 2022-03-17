import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storageTheme } from '../config/constants'
import * as NavigationBar from 'expo-navigation-bar'

export const ToggleContext = createContext({})

let themeString
const data = AsyncStorage.getItem(storageTheme)
data.then((res) => (themeString = res))

const storageDark = async () => {
  try {
    NavigationBar.setBackgroundColorAsync('#192734')
    NavigationBar.setButtonStyleAsync('light')
    await AsyncStorage.setItem(storageTheme, 'dark')
  } catch (e) {
    console.error(e)
  }
}
const storageLight = async () => {
  try {
    NavigationBar.setBackgroundColorAsync('#F5FDFF')
    NavigationBar.setButtonStyleAsync('dark')
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

  const handleModalVisible = () => {
    modalVisible ? (
      NavigationBar.setVisibilityAsync('visible')
    ) : (
      NavigationBar.setVisibilityAsync('hidden'),
      NavigationBar.setBehaviorAsync('overlay-swipe')
    )
    setModalVisible(!modalVisible)
  }
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

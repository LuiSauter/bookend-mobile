/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const ToggleContext = createContext({})

export const ToggleStateProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [imageScreen, setImageScreen] = useState('')

  const handleAddImage = (image) => {
    setImageScreen(image)
  }

  const handleModalVisible = () => setModalVisible(!modalVisible)

  return (
    <ToggleContext.Provider
      value={{ modalVisible, handleModalVisible, imageScreen, handleAddImage }}
    >
      {children}
    </ToggleContext.Provider>
  )
}

/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const ToggleContext = createContext({})

export const ToggleStateProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentRef, setCurrentRef] = useState()

  const handleModalVisible = () => setModalVisible(!modalVisible)

  const handleRefToTop = (ref) => setCurrentRef(ref)

  return (
    <ToggleContext.Provider
      value={{
        modalVisible,
        handleModalVisible,
        handleRefToTop,
        currentRef,
      }}
    >
      {children}
    </ToggleContext.Provider>
  )
}

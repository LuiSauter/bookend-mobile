/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const ToggleContext = createContext({})

export const ToggleStateProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentRef, setCurrentRef] = useState()
  const [isFocused, setIsFocused] = useState({ home: false, books: false, search: false })

  const handleModalVisible = () => setModalVisible(!modalVisible)

  const handleRefToTop = (ref) => setCurrentRef(ref)

  const handleFocused = ({ isHome, isBooks, isSearch }) =>
    setIsFocused({ home: isHome, books: isBooks, search: isSearch })

  return (
    <ToggleContext.Provider
      value={{
        modalVisible,
        handleModalVisible,
        currentRef,
        handleRefToTop,
        isFocused,
        handleFocused,
      }}
    >
      {children}
    </ToggleContext.Provider>
  )
}

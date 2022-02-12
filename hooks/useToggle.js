import { useContext } from 'react'
import { ToggleContext } from '../context/toggleContext'

export const useToggle = () => {
  const { modalVisible, handleModalVisible, handleRefToTop, currentRef, loginOpen } =
    useContext(ToggleContext)

  return {
    modalVisible,
    handleModalVisible,
    handleRefToTop,
    currentRef,
    loginOpen,
  }
}

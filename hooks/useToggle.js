import { useContext } from 'react'
import { ToggleContext } from '../context/toggleContext'

export const useToggle = () => {
  const { modalVisible, handleModalVisible, imageScreen, handleAddImage } =
    useContext(ToggleContext)

  return { modalVisible, handleModalVisible, imageScreen, handleAddImage }
}

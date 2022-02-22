import { useContext } from 'react'
import { ToggleContext } from '../context/toggleContext'

export const useToggle = () => {
  const { modalVisible, handleModalVisible } = useContext(ToggleContext)

  return { modalVisible, handleModalVisible }
}

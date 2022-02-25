import { useContext } from 'react'
import { ToggleContext } from '../context/toggleContext'

export const useToggle = () => {
  const { modalVisible, handleModalVisible, darkTheme, handleDarkTheme } = useContext(ToggleContext)

  return { modalVisible, handleModalVisible, darkTheme, handleDarkTheme }
}

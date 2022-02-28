import { useContext } from 'react'
import { ToggleContext } from '../context/toggleContext'

export const useToggle = () => {
  const { modalVisible, handleModalVisible, darkTheme, handleDarkTheme, word, handleChangeWord } =
    useContext(ToggleContext)

  return { modalVisible, handleModalVisible, darkTheme, handleDarkTheme, word, handleChangeWord }
}

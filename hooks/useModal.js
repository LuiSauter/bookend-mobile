import { useState } from 'react'

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    console.log('press!')
    setModalVisible(!modalVisible)
  }

  return { handleModal, modalVisible }
}

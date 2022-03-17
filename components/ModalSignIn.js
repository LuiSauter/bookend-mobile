import React, { memo } from 'react'
import { View, Modal } from 'react-native'
import { useToggle } from '../hooks/useToggle'

export const ModalSignIn = ({ children }) => {
  const { handleModalVisible, modalVisible } = useToggle()
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleModalVisible()
        }}
      >
        {children}
      </Modal>
    </View>
  )
}
export default memo(ModalSignIn)

/* eslint-disable react/prop-types */
import React from 'react'
import { View, Modal } from 'react-native'
import { useToggle } from '../hooks/useToggle'

export default function ModalSignIn({ children }) {
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

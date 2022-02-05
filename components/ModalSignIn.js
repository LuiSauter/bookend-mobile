/* eslint-disable react/prop-types */
import React from 'react'
import { View, Modal } from 'react-native'
import { useModal } from '../hooks/useModal'

export default function ModalSignIn({ children }) {
  const { handleModalVisible, modalVisible } = useModal()
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('close')
          handleModalVisible()
        }}
      >
        {children}
      </Modal>
    </View>
  )
}

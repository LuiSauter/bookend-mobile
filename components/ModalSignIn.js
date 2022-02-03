/* eslint-disable react/prop-types */
import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { useModal } from '../hooks/useModal'

export default function ModalSignIn({ children }) {
  const { handleModalVisible, modalVisible } = useModal()
  return (
    <View style={styles.centeredView}>
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

export const styles = StyleSheet.create({
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
})

/* eslint-disable react/prop-types */
import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'

export default function ModalSignIn({ children, showModal, handleModal }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('close')
          handleModal()
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

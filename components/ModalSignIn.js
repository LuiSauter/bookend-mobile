/* eslint-disable react/prop-types */
import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'

export default function ModalSignIn({ children, showModal, handleModal }) {
  // const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent='true'
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

/* eslint-disable react/prop-types */
import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#192734' />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#192734',
    color: '#fff',
  },
})

export default Layout

/* eslint-disable react/prop-types */
import { StyleSheet, StatusBar, View, useColorScheme, Text } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
  const colorScheme = useColorScheme()
  console.log(colorScheme)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#192734' />
      {children}
      <Text>{colorScheme}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192734',
    color: '#fff',
  },
})

export default Layout

/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <StatusBar backgroundColor='#192734' />
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#192734',
    justifyContent: 'space-between',
    color: '#fff',
  },
})

export default Layout

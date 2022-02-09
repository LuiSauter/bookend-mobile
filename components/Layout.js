/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle='light-content'
        animated={true}
        showHideTransition={'fade'}
        backgroundColor={'#192734'}
      />
      <View style={{ height: '100%', justifyContent: 'center' }}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192734',
    justifyContent: 'space-between',
  },
})

export default Layout

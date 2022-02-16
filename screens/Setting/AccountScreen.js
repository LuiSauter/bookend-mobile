import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle='light-content'
        backgroundColor='#192734'
      />
      <Text style={styles.text}>AccountScreen</Text>
    </SafeAreaView>
  )
}
export default AccountScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#192734',
  },
  text: {
    color: 'white',
  },
})

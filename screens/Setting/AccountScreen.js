import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

const AccountScreen = () => {
  const { colors, dark } = useTheme()
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <Text style={[{ color: colors.text }]}>AccountScreen</Text>
    </SafeAreaView>
  )
}
export default AccountScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { useToggle } from '../hooks/useToggle'

const SearchScreen = () => {
  const { colors } = useTheme()
  const { darkTheme } = useToggle()
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.colorPrimary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <Text style={{ color: colors.text }}>Search Screen</Text>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

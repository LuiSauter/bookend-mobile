/* eslint-disable react/prop-types */
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import AllPostRanking from '../components/Post/AllPostRanking'
import { useTheme } from '@react-navigation/native'

const BookScreen = () => {
  const { colors, dark } = useTheme()
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'fade'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <AllPostRanking />
    </SafeAreaView>
  )
}

export default BookScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

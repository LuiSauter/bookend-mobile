import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { colors } from '../config/colors'
import { useToggle } from '../hooks/useToggle'

const SearchScreen = () => {
  const { handleFocused } = useToggle()
  const isFocused = useIsFocused()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      isFocused && handleFocused({ isHome: false, isBooks: false, isSearch: isFocused })
    }
    return () => {
      cleanup = false
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        // barStyle=''
        style='light'
        backgroundColor={colors.colorPrimary}
      />
      <Text style={styles.text}>Search Screen</Text>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.colorPrimary,
  },
  text: {
    color: 'white',
  },
})

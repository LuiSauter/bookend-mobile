import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useToggle } from '../hooks/useToggle'
import { useIsFocused } from '@react-navigation/native'
import { colors } from '../config/colors'

const BookScreen = () => {
  const { handleFocused } = useToggle()
  const isFocused = useIsFocused()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      isFocused && handleFocused({ isHome: false, isBooks: isFocused, isSearch: false })
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
        barStyle='light-content'
        backgroundColor={colors.colorPrimary}
      />
      <Text style={styles.text}>Books Screen</Text>
      <Text style={styles.text}>Books Screen</Text>
    </SafeAreaView>
  )
}

export default BookScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.colorPrimary,
  },
  text: {
    color: colors.textWhite,
  },
})

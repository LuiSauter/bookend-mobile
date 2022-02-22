/* eslint-disable react/prop-types */
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../config/colors'
import AllPostRanking from '../components/Post/AllPostRanking'

const BookScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle='light-content'
        backgroundColor={colors.colorPrimary}
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
    backgroundColor: colors.colorPrimary,
  },
  text: {
    color: colors.textWhite,
  },
})

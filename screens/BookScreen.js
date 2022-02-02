import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'

const BookScreen = () => {
  return (
    <Layout>
      <Text style={styles.text}>Books Screen</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
})

export default BookScreen

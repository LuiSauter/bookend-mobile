import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResultUser = ({ name, username, user, email, photo, verified }) => {
  return (
    <View>
      <Text>@{username}</Text>
    </View>
  )
}

export default ResultUser

const styles = StyleSheet.create({})

/* eslint-disable react/prop-types */
import { Text, StyleSheet } from 'react-native'
import React from 'react'
import IconOcticons from 'react-native-vector-icons/Octicons'

const NameUser = ({ name, verified, fontSize }) => {
  return (
    <Text style={[styles.userTextName, { fontSize: fontSize }]}>
      <Text>{name}</Text>
      {verified && <IconOcticons name='verified' color='white' size={15} />}
    </Text>
  )
}

const styles = StyleSheet.create({
  userTextName: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
})

export default NameUser

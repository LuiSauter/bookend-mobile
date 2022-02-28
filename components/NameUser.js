/* eslint-disable react/prop-types */
import { Text, StyleSheet } from 'react-native'
import React from 'react'
import IconOcticons from 'react-native-vector-icons/Octicons'
import { useTheme } from '@react-navigation/native'

const NameUser = ({ name, verified, fontSize }) => {
  const { colors, dark } = useTheme()
  return (
    <Text style={[styles.userTextName, { fontSize: fontSize, color: colors.text }]}>
      <Text>{name} </Text>
      <Text>
        {verified && (
          <IconOcticons
            name='verified'
            color={dark ? colors.white : colors.colorThirdBlue}
            size={fontSize}
          />
        )}
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  userTextName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
})

export default NameUser

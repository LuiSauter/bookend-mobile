import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Search = (props) => {
  const { colors } = useTheme()
  return (
    <TextInput
      {...props}
      style={[
        styles.textInput,
        { color: colors.colorThirdBlue, backgroundColor: colors.secondary },
      ]}
      placeholderTextColor={colors.textGray}
    />
  )
}

export default Search

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 3,
    borderRadius: 24,
    fontSize: 16,
    width: '100%',
  },
})

/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BtnLike from './Button/BtnLike'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons' //comment
import IconAntDesign from 'react-native-vector-icons/AntDesign' //sharealt
import { useTheme } from '@react-navigation/native'

const MultipleButtons = ({ id }) => {
  const { colors } = useTheme()
  return (
    <View style={styles.btnContainer}>
      <View style={styles.btn}>
        <IconAntDesign.Button
          name='sharealt'
          backgroundColor='transparent'
          borderRadius={50}
          color={colors.textGray}
          onPress={() => console.log('xd')}
          size={18}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      </View>
      <View style={styles.btn}>
        <IconEvilIcons.Button
          name='comment'
          backgroundColor='transparent'
          borderRadius={50}
          color={colors.textGray}
          onPress={() => console.log('xd')}
          size={26}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
        <Text style={[styles.text, { color: colors.textGray }]}>0</Text>
      </View>
      <BtnLike id={id} />
      <View style={styles.btn}>
        <Text style={[styles.text, { color: colors.textGray }]}>PDF</Text>
      </View>
    </View>
  )
}

export default MultipleButtons

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
})

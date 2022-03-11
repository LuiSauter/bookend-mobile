/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BtnLike from './Button/BtnLike'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons' //comment
import IconAntDesign from 'react-native-vector-icons/AntDesign' //sharealt
import { useNavigation, useTheme } from '@react-navigation/native'

const MultipleButtons = ({ id, bookUrl, title }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
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
      <TouchableOpacity
        onPress={() => navigation.navigate('PdfScreen', { bookUrl, title })}
        style={styles.btn}
      >
        <Text style={[styles.text, { color: colors.textGray }]}>PDF</Text>
      </TouchableOpacity>
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

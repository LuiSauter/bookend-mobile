/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import BtnLike from './Button/BtnLike'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons' //comment
import IconAntDesign from 'react-native-vector-icons/AntDesign' //sharealt
import { useNavigation, useTheme } from '@react-navigation/native'

const MultipleButtons = ({ id, bookUrl, title }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <View style={styles.btnContainer}>
      <Pressable
        android_ripple={{
          color: `${colors.colorThirdPurple}33`,
          borderless: true,
          radius: 22,
        }}
        onPress={() => console.log('xd')}
        style={({ pressed }) => [{ backgroundColor: pressed ? 'transparent' : 'transparent' }]}
      >
        <IconAntDesign
          name='sharealt'
          backgroundColor='transparent'
          borderRadius={50}
          color={colors.textGray}
          size={18}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      </Pressable>
      <Pressable
        android_ripple={{
          color: `${colors.colorThirdYellow}33`,
          borderless: true,
          radius: 22,
        }}
        onPress={() => console.log('xd')}
        style={({ pressed }) => [
          { backgroundColor: pressed ? 'transparent' : 'transparent', flexDirection: 'row' },
        ]}
      >
        <IconEvilIcons
          name='comment'
          backgroundColor='transparent'
          borderRadius={50}
          color={colors.textGray}
          size={26}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
        {/* <Text style={[styles.text, { color: colors.textGray, marginLeft: 5 }]}>0</Text> */}
      </Pressable>
      <BtnLike id={id} />
      <Pressable
        android_ripple={{
          color: `${colors.colorFourthRed}44`,
          borderless: true,
          radius: 22,
        }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? 'transparent' : 'transparent', flexDirection: 'row' },
        ]}
        onPress={() => navigation.navigate('PdfScreen', { bookUrl, title })}
      >
        <Text style={[styles.text, { color: colors.textGray }]}>PDF</Text>
      </Pressable>
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
    fontSize: 16,
  },
})

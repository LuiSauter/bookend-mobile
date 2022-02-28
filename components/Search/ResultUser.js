/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BtnFollow from '../Button/BtnFollow'
import { useNavigation, useTheme } from '@react-navigation/native'
import NameUser from '../NameUser'
import { useAuth } from '../../hooks/useAuth'

const ResultUser = ({ name, username, user, email, photo, verified }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { googleAuth } = useAuth()
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('UserScreen', {
          name: name,
          username: username,
          verified: verified,
        })
      }
      underlayColor={colors.colorUnderlay}
    >
      <View style={styles.item}>
        <View style={styles.textItem}>
          <Image source={{ uri: photo }} style={styles.image} />
          <View style={styles.text}>
            <NameUser name={name} fontSize={17} verified={verified} />
            <Text style={[styles.username, { color: colors.textGray }]}>@{username}</Text>
          </View>
        </View>
        {googleAuth.email !== email ? (
          <TouchableOpacity activeOpacity={0.6}>
            <BtnFollow username={username} user={user} />
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              color: colors.textGray,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            ver perfil
          </Text>
        )}
      </View>
    </TouchableHighlight>
  )
}

export default ResultUser

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  image: {
    borderRadius: 50,
    resizeMode: 'cover',
    width: 50,
    height: 50,
    marginRight: 16,
  },
  textItem: {
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 15,
  },
})

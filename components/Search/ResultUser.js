import { Image, StyleSheet, Text, Pressable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BtnFollow from '../Button/BtnFollow'
import { useNavigation, useTheme } from '@react-navigation/native'
import NameUser from '../NameUser'
import { useAuth } from '../../hooks/useAuth'
import { useQuery } from '@apollo/client'
import { FIND_USER } from '../../user/graphql-queries'
import { GET_DOMINANT_COLOR } from '../../post/graphql-queries'

const ResultUser = ({ name, username, user, email, photo, verified }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { googleAuth } = useAuth()
  const { data } = useQuery(FIND_USER, { variables: { email: email } })
  const { data: userDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: photo } })

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('UserScreen', {
          name: data?.findUser ? data?.findUser.me.name : '',
          username: data?.findUser ? data?.findUser.me.username : '',
          verified: data?.findUser ? data?.findUser.me.verified : '',
          user: user,
          email: email,
          dominantColor: userDominantColor?.getColors,
          photo: data?.findUser ? data?.findUser.me.photo : '',
          description: data?.findUser ? data?.findUser.description : '',
          location: data?.findUser ? data?.findUser.location : '',
          followers: data?.findUser ? data?.findUser.followers : [],
          following: data?.findUser ? data?.findUser.following : [],
          website: data?.findUser ? data?.findUser.website : '',
        })
      }
      android_ripple={{ color: colors.colorUnderlay }}
      style={({ pressed }) => [{ backgroundColor: pressed ? 'transparent' : 'transparent' }]}
    >
      <View style={[styles.item, { borderColor: colors.border }]}>
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
    </Pressable>
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
    borderBottomWidth: 1,
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

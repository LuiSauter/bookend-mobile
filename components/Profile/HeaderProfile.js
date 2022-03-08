/* eslint-disable react/prop-types */
import { useTheme } from '@react-navigation/native'
import React, { Fragment } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import BtnFollow from '../Button/BtnFollow'
import NameUser from '../NameUser'

const HeaderProfile = ({
  photo,
  verified,
  username,
  name,
  email,
  user,
  description,
  website,
  followers,
  userEmail,
  following,
  location,
}) => {
  const { colors } = useTheme()
  return (
    <Fragment>
      <View style={styles.profilePresentation}>
        <Image blurRadius={100} style={styles.imageBackground} source={{ uri: photo }} />
        <Image
          style={[styles.profileImage, { borderColor: colors.primary }]}
          source={{ uri: photo }}
        />
      </View>
      <View style={{ marginHorizontal: 16, marginTop: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <NameUser name={name} verified={verified} fontSize={20} />
          {userEmail !== email && <BtnFollow username={username} user={user} />}
        </View>
        <Text style={[styles.textOpacity, { color: colors.textGray }]}>@{username}</Text>
        <Text style={[styles.text, { color: colors.text }]}>{description}</Text>
        <View style={styles.textPresentation}>
          <Text style={[styles.textOpacity, { color: colors.textGray }]}>{location}</Text>
          <Text style={{ fontSize: 15, color: colors.colorThirdBlue, marginLeft: 16 }}>
            {website}
          </Text>
        </View>
        <View style={styles.textPresentation}>
          <Text style={[styles.text, { marginRight: 16, color: colors.text }]}>
            {followers.length}
            <Text style={{ color: colors.textGray }}> Following</Text>
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {following.length}
            <Text style={{ color: colors.textGray }}> Followers</Text>
          </Text>
        </View>
      </View>
    </Fragment>
  )
}

export default HeaderProfile

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginTop: 12,
  },
  textOpacity: {
    fontSize: 15,
  },
  profilePresentation: {
    alignItems: 'center',
  },
  imageBackground: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: 100,
  },
  profileImage: {
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 50,
    height: 90,
    width: 90,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    borderRadius: 50,
    zIndex: 1,
    position: 'relative',
  },
  textPresentation: { flex: 1, flexDirection: 'row' },
})

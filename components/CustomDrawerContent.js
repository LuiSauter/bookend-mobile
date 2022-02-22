/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useLazyQuery } from '@apollo/client'

import { useAuth } from '../hooks/useAuth'
import { FIND_USER } from '../user/graphql-queries'
import NameUser from './NameUser'
import bookendLogo from '../assets/img/default-user.png'

import HomeIcon from 'react-native-vector-icons/Ionicons'
// home-variant - home-variant-outline
import Ionicons from 'react-native-vector-icons/Ionicons'
// ios-person - ios-person-outline
// settings - settings-outline
// book - book-outline
// ios-search
import SignOutIcon from 'react-native-vector-icons/Ionicons'
import GoogleIcon from 'react-native-vector-icons/AntDesign'
import { auth } from '../lib/auth'
import { colors } from '../config/colors'
// sign-out-alt

const CustomDrawerContent = (props) => {
  const { signOut, promptAsync } = auth()
  const { googleAuth } = useAuth()
  const { email, status } = googleAuth

  const [getFindUserByEmail, { data, loading }] = useLazyQuery(FIND_USER, {
    variables: { email: email },
  })

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      status === 'authenticated' && getFindUserByEmail({ variables: { email: email } })
    }

    return () => {
      cleanup = false
    }
  }, [status])

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {status === 'authenticated' ? (
        loading ? (
          <ActivityIndicator color={colors.colorThirdBlue} size='small' style={styles.loading} />
        ) : (
          <>
            <Image style={styles.userImage} source={{ uri: data?.findUser.me.photo }} />
            <DrawerItem
              label={() => (
                <>
                  <NameUser
                    name={data?.findUser.me.name}
                    fontSize={17}
                    verified={data?.findUser.verified}
                  />
                  <Text style={{ fontSize: 16, color: colors.TextGray }}>
                    @{data?.findUser.me.username}
                  </Text>
                </>
              )}
              onPress={() => props.navigation.navigate('')}
            />
          </>
        )
      ) : (
        <>
          <Image source={bookendLogo} style={styles.userImageDefault} />
          <Text style={styles.textBookend}>Bookend</Text>
        </>
      )}
      <DrawerItem
        icon={() => (
          <HomeIcon name={'home'} size={22} style={styles.icon} color={colors.textWhite} />
        )}
        label='Inicio'
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate('HomeScreen')}
      />
      <DrawerItem
        icon={() => (
          <Ionicons name={'book'} size={22} style={styles.icon} color={colors.textWhite} />
        )}
        label='Libros'
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate('BookScreen')}
      />
      {status === 'authenticated' && (
        <DrawerItem
          icon={() => (
            <Ionicons
              name='ios-person-outline'
              size={24}
              style={styles.icon}
              color={colors.textWhite}
            />
          )}
          label='Perfil'
          labelStyle={styles.label}
          onPress={() =>
            props.navigation.navigate('UserScreen', {
              name: data?.findUser.me.name,
              username: data?.findUser.me.username,
              verified: data?.findUser.verified,
            })
          }
        />
      )}
      <DrawerItem
        label='Ajustes'
        labelStyle={styles.label}
        icon={() => (
          <Ionicons
            name='settings-outline'
            size={24}
            style={styles.icon}
            color={colors.textWhite}
          />
        )}
        onPress={() => props.navigation.navigate('SettingScreen')}
      />
      <View style={styles.login}>
        {status === 'authenticated' ? (
          <DrawerItem
            label='Cerrar sesión'
            labelStyle={{ color: `${colors.colorFourthRed}a5`, fontSize: 19, fontWeight: '500' }}
            icon={() => (
              <SignOutIcon
                name='log-out-outline'
                size={24}
                style={styles.icon}
                color={`${colors.colorFourthRed}a5`}
              />
            )}
            onPress={() => signOut()}
          />
        ) : (
          <DrawerItem
            label='Iniciar sesión'
            labelStyle={styles.label}
            icon={() => (
              <GoogleIcon name='google' size={24} style={styles.icon} color={colors.textWhite} />
            )}
            onPress={() => promptAsync()}
          />
        )}
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  container: { backgroundColor: colors.colorPrimary, flex: 1 },
  loading: { display: 'flex', margin: 16 },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 16,
    marginLeft: 16,
  },
  userImageDefault: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 16,
  },
  textBookend: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.colorThirdBlue,
    marginHorizontal: 16,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  label: {
    color: colors.textWhite,
    fontSize: 19,
    fontWeight: '500',
  },
  icon: {
    marginRight: 0,
    padding: 0,
  },
  login: {
    borderTopWidth: 1,
    borderTopColor: colors.TextGray,
    marginTop: 8,
    paddingTop: 8,
  },
})

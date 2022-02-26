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
import Ionicons from 'react-native-vector-icons/Ionicons'
import SignOutIcon from 'react-native-vector-icons/Ionicons'
import GoogleIcon from 'react-native-vector-icons/AntDesign'
import { auth } from '../lib/auth'
import { useTheme } from '@react-navigation/native'

const CustomDrawerContent = (props) => {
  const { colors } = useTheme()
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
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[styles.container, { backgroundColor: colors.primary }]}
    >
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
                  <Text style={{ fontSize: 16, color: colors.textGray }}>
                    @{data?.findUser.me.username}
                  </Text>
                </>
              )}
              onPress={() =>
                props.navigation.navigate('UserScreen', {
                  name: data?.findUser.me.name,
                  username: data?.findUser.me.username,
                  verified: data?.findUser.verified,
                })
              }
            />
          </>
        )
      ) : (
        <>
          <Image source={bookendLogo} style={styles.userImageDefault} />
          <Text style={[styles.textBookend, { color: colors.colorThirdBlue }]}>Bookend</Text>
        </>
      )}
      <DrawerItem
        icon={({ color }) => (
          <HomeIcon name={'home-outline'} size={22} style={styles.icon} color={color} />
        )}
        label='Inicio'
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate('HomeScreen')}
      />
      <DrawerItem
        icon={({ color }) => (
          <Ionicons name={'book-outline'} size={22} style={styles.icon} color={color} />
        )}
        label='Libros'
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate('BookScreen')}
      />
      {status === 'authenticated' && (
        <DrawerItem
          icon={({ color }) => (
            <Ionicons name='ios-person-outline' size={24} style={styles.icon} color={color} />
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
        icon={({ color }) => (
          <Ionicons name='settings-outline' size={24} style={styles.icon} color={color} />
        )}
        onPress={() => props.navigation.navigate('SettingScreen')}
      />
      <View style={[styles.login, { borderTopColor: colors.textGray + '33' }]}>
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
            labelStyle={[styles.label]}
            icon={({ color }) => (
              <GoogleIcon name='google' size={24} style={styles.icon} color={color} />
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
  container: { flex: 1 },
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
    marginHorizontal: 16,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 19,
    fontWeight: '500',
  },
  icon: {
    marginRight: 0,
    padding: 0,
  },
  login: {
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
})

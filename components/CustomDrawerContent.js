/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useLazyQuery } from '@apollo/client'

import { useAuth } from '../hooks/useAuth'
import { FIND_USER } from '../user/graphql-queries'
import NameUser from './NameUser'
import bookendLogo from '../assets/img/default-user.png'

import HomeIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// home-variant - home-variant-outline
import Ionicons from 'react-native-vector-icons/Ionicons'
// ios-person - ios-person-outline
// settings - settings-outline
// book - book-outline
// ios-search
import SignOutIcon from 'react-native-vector-icons/Ionicons'
import GoogleIcon from 'react-native-vector-icons/AntDesign'
import { useToggle } from '../hooks/useToggle'
import { auth } from '../lib/auth'
// sign-out-alt

const CustomDrawerContent = (props) => {
  const { isFocused } = useToggle()
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
      contentContainerStyle={{ backgroundColor: '#192734', flex: 1 }}
    >
      {status === 'authenticated' ? (
        loading ? (
          <ActivityIndicator color='#09f' size='small' style={{ display: 'flex', margin: 16 }} />
        ) : (
          <>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginTop: 16,
                marginLeft: 16,
              }}
              source={{ uri: data?.findUser.me.photo }}
            />
            <DrawerItem
              label={() => (
                <>
                  <NameUser
                    name={data?.findUser.me.name}
                    fontSize={17}
                    verified={data?.findUser.verified}
                  />
                  <Text style={{ fontSize: 16, color: '#ccc' }}>@{data?.findUser.me.username}</Text>
                </>
              )}
              onPress={() => props.navigation.navigate('')}
            />
          </>
        )
      ) : (
        <>
          <Image
            source={bookendLogo}
            style={{ width: 50, height: 50, borderRadius: 50, margin: 16 }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#09f',
              marginHorizontal: 16,
              marginBottom: 16,
              letterSpacing: 0.5,
            }}
          >
            Bookend
          </Text>
        </>
      )}
      <DrawerItem
        icon={() => (
          <HomeIcon
            name={isFocused.home ? 'home-variant' : 'home-variant-outline'}
            size={26}
            style={{ marginRight: 0, padding: 0 }}
            color='#fff'
          />
        )}
        label='Inicio'
        focused={isFocused.home}
        labelStyle={{ color: '#fff', fontSize: 20, fontWeight: '500' }}
        onPress={() => props.navigation.navigate('HomeScreen')}
      />
      <DrawerItem
        icon={() => (
          <Ionicons
            name={isFocused.books ? 'book' : 'book-outline'}
            size={22}
            style={{ marginRight: 0, padding: 0 }}
            color='#fff'
          />
        )}
        label='Libros'
        focused={isFocused.books}
        labelStyle={{ color: '#fff', fontSize: 20, fontWeight: '500' }}
        onPress={() => props.navigation.navigate('BookScreen')}
      />
      {status === 'authenticated' && (
        <DrawerItem
          icon={() => (
            <Ionicons
              name='ios-person-outline'
              size={24}
              style={{ marginRight: 0, padding: 0 }}
              color='#fff'
            />
          )}
          label='Perfil'
          labelStyle={{ color: '#fff', fontSize: 20, fontWeight: '500' }}
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
        labelStyle={{ color: '#fff', fontSize: 20, fontWeight: '500' }}
        icon={() => (
          <Ionicons
            name='settings-outline'
            size={24}
            style={{ marginRight: 0, padding: 0 }}
            color='#fff'
          />
        )}
        onPress={() => props.navigation.navigate('SettingScreen')}
      />
      <View style={{ borderTopWidth: 1, borderTopColor: '#aaa', marginTop: 8, paddingTop: 8 }}>
        {status === 'authenticated' ? (
          loading ? (
            <ActivityIndicator color='#09f' size='large' style={{ display: 'flex', margin: 16 }} />
          ) : (
            <DrawerItem
              label='Cerrar sesión'
              labelStyle={{ color: '#ef4444a5', fontSize: 20, fontWeight: '500' }}
              icon={() => (
                <SignOutIcon
                  name='log-out-outline'
                  size={24}
                  style={{ marginRight: 0, padding: 0 }}
                  color='#ef4444a5'
                />
              )}
              onPress={() => signOut()}
            />
          )
        ) : (
          <DrawerItem
            label='Iniciar sesión'
            labelStyle={{ color: '#fff', fontSize: 20, fontWeight: '500' }}
            icon={() => (
              <GoogleIcon
                name='google'
                size={24}
                style={{ marginRight: 0, padding: 0, marginLeft: 0 }}
                color='#fff'
              />
            )}
            onPress={() => promptAsync()}
          />
        )}
      </View>
    </DrawerContentScrollView>
  )
}
export default CustomDrawerContent

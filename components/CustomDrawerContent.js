/* eslint-disable react/prop-types */
import { useLazyQuery } from '@apollo/client'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { FIND_USER } from '../user/graphql-queries'
import NameUser from './NameUser'
import bookendLogo from '../assets/img/default-user.png'

const CustomDrawerContent = (props) => {
  const { googleAuth } = useAuth()
  const { email, status } = googleAuth
  const [getFindUserByEmail, { data }] = useLazyQuery(FIND_USER, {
    variables: { email: googleAuth.email },
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
        <View style={{ display: 'flex', margin: 16 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 16 }}
            source={{ uri: data?.findUser.me.photo }}
          />
          <NameUser
            name={data?.findUser.me.name}
            fontSize={17}
            verified={data?.findUser.verified}
          />
          <Text style={{ fontSize: 16, color: '#ccc' }}>@{data?.findUser.me.username}</Text>
        </View>
      ) : (
        <Image
          source={bookendLogo}
          style={{ width: 50, height: 50, borderRadius: 50, margin: 16 }}
        />
      )}
      <DrawerItemList {...props} />
      <DrawerItem
        label='Profile'
        labelStyle={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label='Books'
        labelStyle={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}
        onPress={() => props.navigation.navigate('BookScreen')}
      />
      <DrawerItem
        label='Settings'
        labelStyle={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  )
}
export default CustomDrawerContent

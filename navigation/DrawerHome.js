/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  Pressable,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useToggle } from '../hooks/useToggle'
import bookendLogo from '../assets/img/default-user.png'
import HomeScreen from '../screens/HomeScreen'
import { useAuth } from '../hooks/useAuth'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from '../user/graphql-queries'
import CustomDrawerContent from '../components/CustomDrawerContent'

const Drawer = createDrawerNavigator()

const DrawerHome = () => {
  const { handleModalVisible, currentRef } = useToggle()
  const { googleAuth } = useAuth()
  const [getFindUserByEmail, { data, loading }] = useLazyQuery(FIND_USER, {
    variables: { email: googleAuth.email },
  })

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      googleAuth.email && getFindUserByEmail({ variables: { email: googleAuth.email } })
    }

    return () => {
      cleanup = false
    }
  }, [googleAuth.email])

  return (
    <Drawer.Navigator
      initialRouteName='home'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name='home'
        options={() => ({
          title: '',
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#ddd',
          },
          // drawerActiveBackgroundColor: 'red',
          drawerActiveTintColor: '#09f',
          headerTintColor: '#fff',
          drawerIcon: () => (
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Inicio</Text>
          ),
          // drawerLabel: 'Home',
          headerRight: () => (
            <TouchableHighlight style={style.logoContainer} onPress={() => handleModalVisible()}>
              {googleAuth.status === 'unauthenticated' ? (
                <Image style={style.bookendLogo} source={bookendLogo} />
              ) : loading ? (
                <ActivityIndicator color='#09f' size='large' />
              ) : (
                <Image style={style.bookendLogo} source={{ uri: data?.findUser.me.photo }} />
              )}
            </TouchableHighlight>
          ),
          headerTitle: () => (
            <Pressable
              onPress={() => {
                currentRef.current.scrollToOffset({ offset: 0 })
              }}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Inicio</Text>
            </Pressable>
          ),
        })}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  )
}

export default DrawerHome

const style = StyleSheet.create({
  bookendLogo: {
    width: 33,
    height: 33,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  logoContainer: {
    borderRadius: 50,
    marginRight: 20,
  },
})

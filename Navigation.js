import React, { useEffect } from 'react'
import {
  TouchableHighlight,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useToggle } from './hooks/useToggle'
import HomeScreen from './screens/HomeScreen'
import BookScreen from './screens/BookScreen'
import bookendLogo from './assets/img/default-user.png'
import { useAuth } from './hooks/useAuth'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from './user/graphql-queries'
import UserScreen from './screens/UserScreen'
import NameUser from './components/NameUser'
import DetailScreen from './screens/DetailScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
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
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          title: '',
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerLeft: () => (
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
      />
      <Stack.Screen
        name='BookScreen'
        component={BookScreen}
        options={() => ({
          title: 'Books',
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name='UserScreen'
        component={UserScreen}
        options={({ route }) => ({
          title: '',
          headerTitle: (props) => (
            <NameUser
              {...props}
              name={route.params.name}
              verified={route.params.verified}
              fontSize={15}
            />
          ),
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name='DetailScreen'
        component={DetailScreen}
        options={() => ({
          title: 'Book',
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  )
}

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

export default Navigation

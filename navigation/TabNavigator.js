/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { FIND_USER } from '../user/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import { useAuth } from '../hooks/useAuth'
import { useToggle } from '../hooks/useToggle'
import HomeScreen from '../screens/HomeScreen'
import bookendLogo from '../assets/img/default-user.png'
import BookScreen from '../screens/BookScreen'
import SearchScreen from '../screens/SearchScreen'
import MenuIcon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const TabNavigator = ({ navigation }) => {
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
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: '#09f',
        tabBarStyle: {
          backgroundColor: '#192734',
          borderTopColor: '#aaaa',
        },
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          title: 'Inicio',
          tabBarLabelStyle: { color: '#fff', fontSize: 18, fontWeight: '500' },
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#ddd',
          },
          // drawerActiveBackgroundColor: 'red',
          tabBarActiveTintColor: '#09f',
          headerTintColor: '#fff',
          // tabBarIcon: () => (
          //   <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
          //     Home
          //   </Text>
          // ),
          // drawerLabel: 'Home',
          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <MenuIcon.Button
                name='options'
                backgroundColor='transparent'
                color='#fff'
                onPress={() => navigation.openDrawer()}
                size={24}
                padding={6}
                borderRadius={50}
                iconStyle={{ marginRight: 0, marginLeft: 0 }}
                underlayColor='#0003'
              />
            </View>
          ),
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
      />
      <Tab.Screen
        name='BookScreen'
        component={BookScreen}
        options={() => ({
          tabBarLabelStyle: { color: '#fff', fontSize: 18, fontWeight: '500' },
          title: 'Books',
          headerStyle: {
            backgroundColor: '#192734',
          },
          tabBarActiveTintColor: '#09f',
          headerTitleStyle: {
            color: '#ddd',
          },
          headerTintColor: '#fff',
          // tabBarIcon: () => (
          //   <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Book</Text>
          // ),
          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <MenuIcon.Button
                name='options'
                backgroundColor='transparent'
                color='#fff'
                onPress={() => navigation.openDrawer()}
                size={24}
                padding={6}
                borderRadius={50}
                iconStyle={{ marginRight: 0, marginLeft: 0 }}
                underlayColor='#0003'
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={() => ({
          tabBarLabelStyle: { color: '#fff', fontSize: 18, fontWeight: '500' },
          title: 'Search',
          headerStyle: {
            backgroundColor: '#192734',
          },
          tabBarActiveTintColor: '#09f',
          headerTitleStyle: {
            color: '#ddd',
          },
          headerTintColor: '#fff',
          // tabBarIcon: () => (
          //   <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Search</Text>
          // ),
          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <MenuIcon.Button
                name='options'
                backgroundColor='transparent'
                color='#fff'
                onPress={() => navigation.openDrawer()}
                size={24}
                padding={6}
                borderRadius={50}
                iconStyle={{ marginRight: 0, marginLeft: 0 }}
                underlayColor='#0003'
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  )
}
export default TabNavigator

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

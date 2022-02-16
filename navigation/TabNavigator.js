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
import { colors } from '../config/colors'

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
        tabBarActiveTintColor: colors.colorThirdBlue,
        tabBarStyle: { backgroundColor: colors.colorPrimary, borderTopColor: colors.TextGray },
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          title: 'Inicio',
          tabBarLabelStyle: { color: colors.textWhite, fontSize: 18, fontWeight: '500' },
          headerStyle: { backgroundColor: colors.colorPrimary },
          headerTitleStyle: { color: colors.textWhite },
          // drawerActiveBackgroundColor: 'red',
          tabBarActiveTintColor: colors.colorThirdBlue,
          headerTintColor: colors.textWhite,
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
                color={colors.textWhite}
                onPress={() => navigation.openDrawer()}
                size={24}
                padding={6}
                borderRadius={50}
                iconStyle={{ marginRight: 0, marginLeft: 0 }}
                underlayColor={colors.colorUnderlay}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableHighlight style={style.logoContainer} onPress={() => handleModalVisible()}>
              {googleAuth.status === 'unauthenticated' ? (
                <Image style={style.bookendLogo} source={bookendLogo} />
              ) : loading ? (
                <ActivityIndicator color={colors.colorThirdBlue} size='large' />
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
              <Text style={{ color: colors.textWhite, fontSize: 20 }}>Inicio</Text>
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name='BookScreen'
        component={BookScreen}
        options={() => ({
          tabBarLabelStyle: { color: colors.textWhite, fontSize: 18, fontWeight: '500' },
          title: 'Books',
          headerStyle: { backgroundColor: colors.colorPrimary },
          tabBarActiveTintColor: colors.colorThirdBlue,
          headerTitleStyle: { color: colors.textWhite },
          headerTintColor: colors.textWhite,
          // tabBarIcon: () => (
          //   <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Book</Text>
          // ),
          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <MenuIcon.Button
                name='options'
                backgroundColor='transparent'
                color={colors.textWhite}
                onPress={() => navigation.openDrawer()}
                size={24}
                padding={6}
                borderRadius={50}
                iconStyle={{ marginRight: 0, marginLeft: 0 }}
                underlayColor={colors.colorUnderlay}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={() => ({
          tabBarLabelStyle: { color: colors.textWhite, fontSize: 18, fontWeight: '500' },
          title: 'Search',
          headerStyle: { backgroundColor: colors.colorPrimary },
          tabBarActiveTintColor: colors.colorThirdBlue,
          headerTitleStyle: { color: colors.textWhite },
          headerTintColor: colors.textWhite,
          // tabBarIcon: () => (
          //   <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Search</Text>
          // ),
          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <MenuIcon.Button
                name='options'
                backgroundColor='transparent'
                color={colors.textWhite}
                onPress={() => navigation.openDrawer()}
                size={24}
                padding={6}
                borderRadius={50}
                iconStyle={{ marginRight: 0, marginLeft: 0 }}
                underlayColor={colors.colorUnderlay}
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
    backgroundColor: colors.textWhite,
  },
  logoContainer: {
    borderRadius: 50,
    marginRight: 20,
  },
})

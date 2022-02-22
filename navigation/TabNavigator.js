/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import BookScreen from '../screens/BookScreen'
import SearchScreen from '../screens/SearchScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../config/colors'
import { useToggle } from '../hooks/useToggle'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from '../user/graphql-queries'
import { useAuth } from '../hooks/useAuth'
import bookendLogo from '../assets/img/default-user.png'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { handleModalVisible } = useToggle()
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
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: colors.colorThirdBlue,
        tabBarStyle: {
          backgroundColor: colors.colorPrimary,
          borderTopColor: colors.TextGray,
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: colors.colorPrimary },
        headerTitleStyle: { color: colors.textWhite },
        headerTintColor: colors.textWhite,
        tabBarButton: (props) => <TouchableHighlight underlayColor='#0002' {...props} />,
        headerLeft: () => (
          <View style={{ marginLeft: 12 }}>
            <Icon.Button
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
          <TouchableHighlight style={styles.logoContainer} onPress={() => handleModalVisible()}>
            {googleAuth.status === 'unauthenticated' ? (
              <Image style={styles.bookendLogo} source={bookendLogo} />
            ) : loading ? (
              <ActivityIndicator color={colors.colorThirdBlue} size='large' />
            ) : (
              <Image style={styles.bookendLogo} source={{ uri: data?.findUser.me.photo }} />
            )}
          </TouchableHighlight>
        ),
      })}
      activeColor={colors.colorThirdBlue}
      tabBarActiveTintColor={colors.colorThirdBlue}
      tabBarInactiveTintColor={colors.TextGray}
      barStyle={{ backgroundColor: colors.colorPrimary }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.colorThirdBlue ? 'home' : 'home-outline'}
              size={22}
              style={{
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name='BookScreen'
        component={BookScreen}
        options={{
          title: 'Books',
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.colorThirdBlue ? 'book' : 'book-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.colorThirdBlue ? 'search' : 'search-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
export default TabNavigator
const styles = StyleSheet.create({
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

/* eslint-disable react/prop-types */
import React from 'react'
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'

import HomeScreen from '../screens/HomeScreen'
import BookScreen from '../screens/BookScreen'
import SearchScreen from '../screens/SearchScreen'
import Search from '../components/Search/Search'
import bookendLogo from '../assets/img/default-user.png'
import { useToggle } from '../hooks/useToggle'
import { useAuth } from '../hooks/useAuth'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { colors } = useTheme()
  const { handleModalVisible, handleChangeWord, word } = useToggle()
  const { googleAuth } = useAuth()

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: colors.colorThirdBlue,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.border,
          borderWidth: 1,
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        tabBarButton: (props) => <TouchableHighlight underlayColor='#0002' {...props} />,
        headerLeft: () => (
          <View style={{ marginLeft: 12 }}>
            <Icon.Button
              name='options'
              backgroundColor='transparent'
              color={colors.text}
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
              <Image
                style={[styles.bookendLogo, { backgroundColor: colors.textWhite }]}
                source={bookendLogo}
              />
            ) : (
              <Image style={styles.bookendLogo} source={{ uri: googleAuth.image }} />
            )}
          </TouchableHighlight>
        ),
      })}
      activeColor={colors.colorThirdBlue}
      tabBarActiveTintColor={colors.colorThirdBlue}
      tabBarInactiveTintColor={colors.textGray}
      barStyle={{ backgroundColor: colors.primary }}
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
          headerTitle: () => (
            <Search onChangeText={handleChangeWord} value={word} placeholder='buscar en bookend' />
          ),
          headerTitleAlign: 'center',
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
  },
  logoContainer: {
    borderRadius: 50,
    marginRight: 20,
  },
})

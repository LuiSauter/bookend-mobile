/* eslint-disable react/prop-types */
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import BookScreen from '../screens/BookScreen'
import SearchScreen from '../screens/SearchScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../config/colors'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.colorThirdBlue,
        tabBarStyle: {
          backgroundColor: colors.colorPrimary,
          borderTopColor: colors.TextGray,
        },
        headerShown: true,
        tabBarButton: (props) => <TouchableHighlight underlayColor='#0002' {...props} />,
      }}
      activeColor={colors.colorThirdBlue}
      tabBarActiveTintColor={colors.colorThirdBlue}
      tabBarInactiveTintColor={colors.TextGray}
      barStyle={{ backgroundColor: colors.colorPrimary }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarLabelStyle: { fontSize: 15, fontWeight: '500' },
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.colorThirdBlue ? 'home' : 'home-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='BookScreen'
        component={BookScreen}
        options={{
          title: 'Books',
          tabBarLabelStyle: { fontSize: 15, fontWeight: '500' },
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
          tabBarLabelStyle: { fontSize: 15, fontWeight: '500' },
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

/* eslint-disable react/prop-types */
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { View } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import BookScreen from '../screens/BookScreen'
import SearchScreen from '../screens/SearchScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../config/colors'

const Tab = createMaterialBottomTabNavigator()

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.colorThirdBlue,
        tabBarStyle: { backgroundColor: colors.colorPrimary, borderTopColor: colors.TextGray },
      }}
      activeColor={colors.textWhite}
      inactiveColor={colors.TextGray}
      barStyle={{ backgroundColor: colors.colorPrimary }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.textWhite ? 'home' : 'home-outline'}
              size={22}
              color={color}
            />
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
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.textWhite ? 'book' : 'book-outline'}
              size={22}
              color={color}
            />
          ),
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
          tabBarIcon: ({ color }) => (
            <Icon
              name={color === colors.textWhite ? 'search' : 'search-outline'}
              size={22}
              color={color}
            />
          ),
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
        })}
      />
    </Tab.Navigator>
  )
}
export default TabNavigator

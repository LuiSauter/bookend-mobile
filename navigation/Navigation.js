/* eslint-disable react/prop-types */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UserScreen from '../screens/UserScreen'
import NameUser from '../components/NameUser'
import DetailScreen from '../screens/DetailScreen'

import DrawerHome from './DrawerNavigator'
import SettingScreen from '../screens/SettingScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={() => ({ headerShown: true })}>
        <Stack.Screen name='DrawerHome' component={DrawerHome} options={{ headerShown: false }} />
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
        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={() => ({
            title: 'Ajustes',
            headerStyle: {
              backgroundColor: '#192734',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Navigation

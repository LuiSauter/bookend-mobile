/* eslint-disable react/prop-types */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BookScreen from '../screens/BookScreen'
import UserScreen from '../screens/UserScreen'
import NameUser from '../components/NameUser'
import DetailScreen from '../screens/DetailScreen'
import DrawerNavigation from './DrawerHome'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='HomeScreen'
            component={DrawerNavigation}
            options={{ headerShown: false }}
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
        </Stack.Group>
      </Stack.Navigator>
    </>
  )
}

export default Navigation

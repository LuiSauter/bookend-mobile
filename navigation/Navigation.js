/* eslint-disable react/prop-types */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UserScreen from '../screens/UserScreen'
import NameUser from '../components/NameUser'
import DetailScreen from '../screens/DetailScreen'

// import DrawerHome from './DrawerNavigator'
import SettingScreen from '../screens/SettingScreen'
import AccountScreen from '../screens/Setting/AccountScreen'
import ActivityScreen from '../screens/Setting/ActivityScreen'
import ContactSceen from '../screens/Setting/ContactSceen'
import DisplayScreen from '../screens/Setting/DisplayScreen'
import { colors } from '../config/colors'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='TabNavigation'
          component={TabNavigator}
          options={{ headerShown: false }}
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
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
        <Stack.Screen
          name='DetailScreen'
          component={DetailScreen}
          options={() => ({
            title: 'Book',
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={() => ({
            title: 'Ajustes',
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
        <Stack.Screen
          name='AccountScreen'
          component={AccountScreen}
          options={() => ({
            title: 'Tu cuenta',
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
        <Stack.Screen
          name='ActivityScreen'
          component={ActivityScreen}
          options={() => ({
            title: 'Tu actividad',
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
        <Stack.Screen
          name='ContactSceen'
          component={ContactSceen}
          options={() => ({
            title: 'Contacto del desarrollador',
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
        <Stack.Screen
          name='DisplayScreen'
          component={DisplayScreen}
          options={() => ({
            title: 'Pantalla y idiomas',
            headerStyle: { backgroundColor: colors.colorPrimary },
            headerTitleStyle: { color: colors.textWhite },
            headerTintColor: colors.textWhite,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Navigation

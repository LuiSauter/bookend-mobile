/* eslint-disable react/prop-types */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UserScreen from '../screens/UserScreen'
import NameUser from '../components/NameUser'
import DetailScreen from '../screens/DetailScreen'

import SettingScreen from '../screens/SettingScreen'
import AccountScreen from '../screens/Setting/AccountScreen'
import ActivityScreen from '../screens/Setting/ActivityScreen'
import ContactSceen from '../screens/Setting/ContactSceen'
import DisplayScreen from '../screens/Setting/DisplayScreen'
import DrawerNavigator from './DrawerNavigator'
import { useTheme } from '@react-navigation/native'
import AddPostScreen from '../screens/AddPostScreen'
import { Text, TouchableHighlight } from 'react-native'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen
          name='TabNavigation'
          component={DrawerNavigator}
          options={{
            headerShown: false,
            title: 'Inicio',
          }}
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
                fontSize={17}
              />
            ),
          })}
        />
        <Stack.Screen
          name='DetailScreen'
          component={DetailScreen}
          options={() => ({
            title: 'Book',
          })}
        />
        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={() => ({
            title: 'Ajustes',
          })}
        />
        <Stack.Screen
          name='AccountScreen'
          component={AccountScreen}
          options={() => ({
            title: 'Tu cuenta',
          })}
        />
        <Stack.Screen
          name='ActivityScreen'
          component={ActivityScreen}
          options={() => ({
            title: 'Tu actividad',
          })}
        />
        <Stack.Screen
          name='ContactSceen'
          component={ContactSceen}
          options={() => ({
            title: 'Contacto del desarrollador',
          })}
        />
        <Stack.Screen
          name='DisplayScreen'
          component={DisplayScreen}
          options={() => ({
            title: 'Pantalla y idiomas',
          })}
        />
        <Stack.Screen
          name='AddPostScreen'
          component={AddPostScreen}
          options={{
            title: '',
            headerRight: () => (
              <TouchableHighlight
                onPress={() => console.log('submit')}
                underlayColor={colors.colorUnderlay}
              >
                <Text
                  style={{
                    backgroundColor: colors.colorThirdBlue,
                    color: colors.white,
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingTop: 4,
                    paddingBottom: 6,
                    fontSize: 16,
                  }}
                >
                  Post
                </Text>
              </TouchableHighlight>
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Navigation

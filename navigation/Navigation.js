/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@react-navigation/native'

import UserScreen from '../screens/UserScreen'
import DetailScreen from '../screens/DetailScreen'
import SettingScreen from '../screens/SettingScreen'
import AccountScreen from '../screens/Setting/AccountScreen'
import ActivityScreen from '../screens/Setting/ActivityScreen'
import ContactSceen from '../screens/Setting/ContactSceen'
import DisplayScreen from '../screens/Setting/DisplayScreen'
import AddPostScreen from '../screens/AddPostScreen'

import NameUser from '../components/NameUser'
import DrawerNavigator from './DrawerNavigator'
import { usePost } from '../hooks/usePost'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { colors } = useTheme()
  const { isDisabled, handleDisabled, addNewPost } = usePost()
  const [currentData, setCurrentData] = useState(null)
  const addPost = (data) => {
    setCurrentData(data)
  }
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
          options={{ headerShown: false, title: 'Inicio' }}
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
          options={() => ({ title: 'Book' })}
        />
        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={() => ({ title: 'Ajustes' })}
        />
        <Stack.Screen
          name='AccountScreen'
          component={AccountScreen}
          options={() => ({ title: 'Tu cuenta' })}
        />
        <Stack.Screen
          name='ActivityScreen'
          component={ActivityScreen}
          options={() => ({ title: 'Tu actividad' })}
        />
        <Stack.Screen
          name='ContactSceen'
          component={ContactSceen}
          options={() => ({ title: 'Contacto del desarrollador' })}
        />
        <Stack.Screen
          name='DisplayScreen'
          component={DisplayScreen}
          options={() => ({ title: 'Pantalla y idiomas' })}
        />
        <Stack.Screen
          name='AddPostScreen'
          options={({ navigation }) => ({
            title: '',
            headerRight: () => (
              <TouchableHighlight
                onPress={() => {
                  currentData !== null && addNewPost(currentData)
                  navigation.navigate('HomeScreen')
                }}
                underlayColor={colors.colorUnderlay}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    styles.btnPost,
                    {
                      backgroundColor: isDisabled ? '#09fa' : colors.colorThirdBlue,
                      color: colors.white,
                    },
                  ]}
                >
                  Post
                </Text>
              </TouchableHighlight>
            ),
          })}
        >
          {(props) => (
            <AddPostScreen {...props} handleDisabled={handleDisabled} addPost={addPost} />
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({
  btnPost: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
    fontSize: 16,
  },
})

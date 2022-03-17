import React, { useState } from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation, useTheme } from '@react-navigation/native'

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
import { auth } from '../lib/auth'
import UpdateScreen from '../screens/UpdateScreen'
import PdfScreen from '../screens/PdfScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { colors } = useTheme()
  const { isDisabled, handleDisabled, addNewPost } = usePost()
  const [currentData, setCurrentData] = useState(null)
  const { message } = auth()
  const navigation = useNavigation()

  const addPost = (data) => {
    setCurrentData(data)
  }

  if (message === 'signup') navigation.navigate('UpdateScreen')

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='TabNavigation'
          component={DrawerNavigator}
          options={{ headerShown: false, title: 'Inicio' }}
        />
        <Stack.Screen
          name='UpdateScreen'
          component={UpdateScreen}
          options={{
            title: 'Update profile',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          }}
        />
        <Stack.Screen
          name='UserScreen'
          component={UserScreen}
          options={({ route }) => ({
            title: '',
            headerStyle: { backgroundColor: `rgb(${route.params.dominantColor})` },
            headerTintColor: 'white',
            headerTitle: (props) => (
              <NameUser
                {...props}
                name={route.params.name}
                verified={false}
                fontSize={17}
                color='white'
              />
            ),
          })}
        />
        <Stack.Screen
          name='DetailScreen'
          component={DetailScreen}
          options={() => ({
            title: 'Book',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          })}
        />
        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={() => ({
            title: 'Ajustes',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          })}
        />
        <Stack.Screen
          name='AccountScreen'
          component={AccountScreen}
          options={() => ({
            title: 'Tu cuenta',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          })}
        />
        <Stack.Screen
          name='ActivityScreen'
          component={ActivityScreen}
          options={() => ({
            title: 'Tu actividad',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          })}
        />
        <Stack.Screen
          name='ContactSceen'
          component={ContactSceen}
          options={() => ({
            title: 'Contacto del desarrollador',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          })}
        />
        <Stack.Screen
          name='DisplayScreen'
          component={DisplayScreen}
          options={() => ({
            title: 'Pantalla y idiomas',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
          })}
        />
        <Stack.Screen
          name='AddPostScreen'
          options={({ navigation }) => ({
            title: '',
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.text,
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
                      opacity: isDisabled ? 0.7 : 1,
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
        <Stack.Screen
          name='PdfScreen'
          component={PdfScreen}
          options={() => ({
            title: '',
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.textGray,
            headerShown: true,
            headerTransparent: true,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({
  btnPost: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
    fontSize: 16,
  },
})

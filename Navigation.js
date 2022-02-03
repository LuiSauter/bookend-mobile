import React from 'react'
import { TouchableHighlight, Image, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useModal } from './hooks/useModal'
import HomeScreen from './screens/HomeScreen'
import BookScreen from './screens/BookScreen'
import bookendLogo from './assets/img/default-user.png'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { handleModalVisible } = useModal()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          title: 'Inicio',
          headerStyle: {
            backgroundColor: '#192734',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerLeft: () => (
            <TouchableHighlight style={style.logoContainer} onPress={() => handleModalVisible()}>
              <Image style={style.bookendLogo} source={bookendLogo} />
            </TouchableHighlight>
          ),
        })}
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
    </Stack.Navigator>
  )
}

const style = StyleSheet.create({
  bookendLogo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  logoContainer: {
    borderRadius: 50,
    marginRight: 20,
  },
})

export default Navigation

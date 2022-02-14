/* eslint-disable react/prop-types */
import React from 'react'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from './TabNavigator'

const Drawer = createDrawerNavigator()

const DrawerHome = () => {
  return (
    <Drawer.Navigator
      initialRouteName='HomeScreen'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name='TabHome'
        component={TabNavigator}
        options={() => ({
          title: 'Inicio',
        })}
      />
    </Drawer.Navigator>
  )
}

export default DrawerHome

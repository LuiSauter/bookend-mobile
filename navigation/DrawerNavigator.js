/* eslint-disable react/prop-types */
import React from 'react'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from './TabNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='TabHome'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name='TabHome' component={TabNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from './TabNavigator'
import { colors } from '../config/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { useToggle } from '../hooks/useToggle'
import { useAuth } from '../hooks/useAuth'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from '../user/graphql-queries'
import bookendLogo from '../assets/img/default-user.png'

const Drawer = createDrawerNavigator()

const DrawerHome = () => {
  const { handleModalVisible, currentRef, isFocused } = useToggle()
  const { googleAuth } = useAuth()
  const [getFindUserByEmail, { data, loading }] = useLazyQuery(FIND_USER, {
    variables: { email: googleAuth.email },
  })

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      googleAuth.email && getFindUserByEmail({ variables: { email: googleAuth.email } })
    }

    return () => {
      cleanup = false
    }
  }, [googleAuth.email])

  return (
    <Drawer.Navigator
      initialRouteName='TabHome'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name='TabHome'
        component={TabNavigator}
        options={({ navigation }) => ({
          title: 'Inicio',
          headerStyle: { backgroundColor: colors.colorPrimary },
          headerTitleStyle: { color: colors.textWhite },
          headerTintColor: colors.textWhite,
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
          headerRight: () => (
            <TouchableHighlight style={styles.logoContainer} onPress={() => handleModalVisible()}>
              {googleAuth.status === 'unauthenticated' ? (
                <Image style={styles.bookendLogo} source={bookendLogo} />
              ) : loading ? (
                <ActivityIndicator color={colors.colorThirdBlue} size='large' />
              ) : (
                <Image style={styles.bookendLogo} source={{ uri: data?.findUser.me.photo }} />
              )}
            </TouchableHighlight>
          ),
          headerTitle: () => (
            <Pressable
              onPress={() => {
                currentRef.current.scrollToOffset({ offset: 0 })
              }}
            >
              <Text style={{ color: colors.textWhite, fontSize: 20 }}>
                {(isFocused.home && 'Inicio') ||
                  (isFocused.books && 'Books') ||
                  (isFocused.search && 'Search')}
              </Text>
            </Pressable>
          ),
        })}
      />
    </Drawer.Navigator>
  )
}

export default DrawerHome

const styles = StyleSheet.create({
  bookendLogo: {
    width: 33,
    height: 33,
    borderRadius: 50,
    backgroundColor: colors.textWhite,
  },
  logoContainer: {
    borderRadius: 50,
    marginRight: 20,
  },
})

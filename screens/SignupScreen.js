import React from 'react'
import { StyleSheet, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import { useQuery } from '@apollo/client'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import { FIND_USER } from '../user/graphql-queries'
import ProfileForm from '../components/Profile/ProfileForm'
import { useAuth } from '../hooks/useAuth'

const SignupScreen = () => {
  const { dark, colors } = useTheme()
  const { googleAuth } = useAuth()
  const { data } = useQuery(FIND_USER, { variables: { email: 'janco7249@gmail.com' } })

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: `${colors.primary}aa` }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <ScrollView>
        <LinearGradient
          colors={[colors.primary, `${colors.primary}66`]}
          style={styles.background}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          locations={[0, 1]}
        >
          <Text style={styles.text}>Welcome {data?.findUser.me.name}</Text>
          {data?.findUser && (
            <ProfileForm
              name={data?.findUser.me.name}
              username={data?.findUser.me.username}
              photo={data?.findUser.me.photo}
              description={data?.findUser.description}
              location={data?.findUser.location}
              email={data?.findUser.me.email}
              website={data?.findUser.website}
              gender={data?.findUser.gender}
              id={data?.findUser.id}
            />
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
})

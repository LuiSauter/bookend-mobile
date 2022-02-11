/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import ModalSignIn from '../components/ModalSignIn'
import * as AuthSession from 'expo-auth-session'
import { useToggle } from '../hooks/useToggle'
import { useMutation } from '@apollo/client'
import { LOGINQL } from '../login/graphql-mutations'
import { useAuth } from '../hooks/useAuth'
import { INITIAL_STATE } from '../context/authContext'
import AllPost from '../components/Post/AllPost'

WebBrowser.maybeCompleteAuthSession()

const HomeScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  })
  const { googleAuth, handleGoogleAuthentication } = useAuth()
  const { handleModalVisible } = useToggle()
  const [getLogin, { reset }] = useMutation(LOGINQL)

  const fetchUserInfo = async (token) => {
    if (token) {
      const res = await AuthSession.fetchUserInfoAsync({ accessToken: token }, Google.discovery)
      if (res) {
        return handleGoogleAuthentication({
          email: res.email,
          name: res.name,
          image: res.picture,
          token: token,
          status: 'authenticated',
        })
      }
    }
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      fetchUserInfo(authentication?.accessToken)
    }
  }, [response])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (googleAuth.token !== '') {
        getLogin({
          variables: { email: googleAuth.email, name: googleAuth.name, image: googleAuth.image },
        })
      }
    }

    return () => {
      cleanup = false
    }
  }, [googleAuth.token])

  const signOut = async () => {
    await AuthSession.revokeAsync(
      {
        token: response?.authentication?.accessToken,
        clientId: EXPO_CLIENT_ID,
      },
      Google.discovery,
    )
    reset()
    handleGoogleAuthentication(INITIAL_STATE)
    handleModalVisible()
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle='light-content'
        backgroundColor='#192734'
      />
      <AllPost />
      <ModalSignIn>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Button title='Books' onPress={() => navigation.push('BookScreen')} />
            {googleAuth.status === 'authenticated' ? (
              <Button title='Sign out' onPress={signOut} />
            ) : (
              <Button
                disabled={!request}
                title='Login'
                onPress={() => {
                  promptAsync()
                  handleModalVisible()
                }}
              />
            )}
            <Button
              title='Hide Modal'
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleModalVisible()}
            />
          </View>
        </View>
      </ModalSignIn>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#192734',
  },
  text: {
    color: '#fff',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#0099ff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default HomeScreen

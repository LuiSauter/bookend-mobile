/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import { useLazyQuery, useMutation } from '@apollo/client'
import GoogleIcon from 'react-native-vector-icons/AntDesign'

import ModalSignIn from '../components/ModalSignIn'
import { useToggle } from '../hooks/useToggle'
import { LOGINQL } from '../login/graphql-mutations'
import { useAuth } from '../hooks/useAuth'
import { INITIAL_STATE } from '../context/authContext'
import AllPost from '../components/Post/AllPost'
import { FIND_USER } from '../user/graphql-queries'
import NameUser from '../components/NameUser'

WebBrowser.maybeCompleteAuthSession()

const HomeScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  })
  const { googleAuth, handleGoogleAuthentication } = useAuth()
  const { status, email, name, image, token } = googleAuth
  const { handleModalVisible } = useToggle()
  const [getLogin, { reset }] = useMutation(LOGINQL)
  const [getProfile, { data }] = useLazyQuery(FIND_USER)

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
      if (token !== '') {
        getLogin({
          variables: { email: email, name: name, image: image },
        })
        getProfile({ variables: { email: email } })
      }
    }

    return () => {
      cleanup = false
    }
  }, [token])

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
            {status === 'authenticated' ? (
              data?.findUser ? (
                <View style={styles.modalUser}>
                  <Image style={styles.modalUserImage} source={{ uri: data?.findUser.me.photo }} />
                  <View>
                    <NameUser
                      fontSize={19}
                      name={data?.findUser.me.name}
                      verified={data?.findUser.verified}
                    />
                    <Text style={styles.modalUserText}>@{data?.findUser.me.username}</Text>
                  </View>
                </View>
              ) : (
                <ActivityIndicator color='#09f' size='large' />
              )
            ) : (
              <Text style={[styles.text, { marginBottom: 16 }]}>Sign In</Text>
            )}
            {googleAuth.status === 'authenticated' ? (
              <TouchableOpacity
                style={[
                  styles.buttonSignOut,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
                onPress={signOut}
                activeOpacity={0.7}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign Out</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
                disabled={!request}
                onPress={() => {
                  promptAsync()
                  handleModalVisible()
                }}
                activeOpacity={0.7}
              >
                <GoogleIcon
                  name='google'
                  color={'#fff'}
                  onPress={() => console.log('xd')}
                  size={24}
                />
                <Text style={[styles.textButton, { color: '#fff', marginLeft: 16 }]}>
                  Sign with Google
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleModalVisible()}
              activeOpacity={0.7}
            >
              <Text style={[styles.textButton, { color: '#fff' }]}>Cancel</Text>
            </TouchableOpacity>
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
    fontSize: 20,
    textAlign: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: '#4281e5',
  },
  buttonSignOut: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: '#4281e5a3',
  },
  buttonClose: {
    backgroundColor: '#ef4444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: '#192734',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#0099ff',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 32,
  },
  modalUser: {
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalUserImage: { height: 65, width: 65, borderRadius: 50, marginRight: 16 },
  modalUserText: { color: '#ddda', fontSize: 18 },
})

export default HomeScreen

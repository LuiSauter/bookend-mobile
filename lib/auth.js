import { useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { useMutation } from '@apollo/client'
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { storageAuth } from '../config/constants'
import { LOGINQL } from '../login/graphql-mutations'
import { INITIAL_STATE } from '../context/authContext'
import { useAuth } from '../hooks/useAuth'

WebBrowser.maybeCompleteAuthSession()
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'com.sauter.bookend',
  path: 'auth.expo.io',
})

export const auth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  })

  const { handleGoogleAuthentication, googleAuth } = useAuth()
  const { token, email, name, image } = googleAuth
  const [getLogin, { reset, data }] = useMutation(LOGINQL)

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
        getLogin({ variables: { email: email, name: name, image: image } })
      }
    }

    return () => {
      cleanup = false
    }
  }, [token])

  const signOut = async () => {
    await AuthSession.revokeAsync(
      {
        token: token !== '' ? token : response?.authentication?.accessToken,
        clientId: EXPO_CLIENT_ID,
      },
      Google.discovery,
    )
    reset()
    AsyncStorage.setItem(storageAuth, JSON.stringify(INITIAL_STATE))
    handleGoogleAuthentication(INITIAL_STATE)
  }

  return {
    promptAsync,
    request,
    signOut,
    redirectUri,
    message: data?.signin ? data?.signin.message : null,
  }
}

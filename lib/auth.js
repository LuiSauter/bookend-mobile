import { useEffect } from 'react'
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import { useAuth } from '../hooks/useAuth'
import { useMutation } from '@apollo/client'
import { LOGINQL } from '../login/graphql-mutations'
import { INITIAL_STATE } from '../context/authContext'

const redirectUri = AuthSession.makeRedirectUri({ scheme: 'app.bookend', path: 'auth.expo.io' })

export const auth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  })
  const { handleGoogleAuthentication, googleAuth } = useAuth()
  const { token, email, name, image } = googleAuth
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
      if (token !== '') {
        getLogin({
          variables: { email: email, name: name, image: image },
        })
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
    handleGoogleAuthentication(INITIAL_STATE)
  }

  return { promptAsync, request, signOut, redirectUri }
}

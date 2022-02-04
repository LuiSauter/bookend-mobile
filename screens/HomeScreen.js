/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
// import { ALL_USERS } from '../user/graphql-queries'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
// import { signedGoogle } from '../signed'
import Layout from '../components/Layout'
import ModalSignIn from '../components/ModalSignIn'
import * as AuthSession from 'expo-auth-session'
import { useModal } from '../hooks/useModal'
import { useMutation, useQuery } from '@apollo/client'
import { LOGINQL } from '../login/graphql-mutations'

WebBrowser.maybeCompleteAuthSession()

const HomeScreen = ({ navigation }) => {
  // const { data: dataAllUser } = useQuery(ALL_USERS)
  const [googleToken, setGoogleToken] = useState({ token: '', signed: false })
  const [user, setUser] = useState({
    email: '',
    name: '',
    image: '',
  })
  const { handleModalVisible } = useModal()
  const [getLogin, { data, error }] = useMutation(LOGINQL)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  })

  const fetchUserInfo = async (token) => {
    if (token) {
      const res = await AuthSession.fetchUserInfoAsync({ accessToken: token }, Google.discovery)
      if (res) {
        // console.log(res)
        setUser({ email: res.email, name: res.name, image: res.picture })
        // getLogin({ variables: { email: res.email, name: res.name, image: res.picture } })
        setGoogleToken({ token: token, signed: true })
      }
    }
  }

  useEffect(() => {
    console.log(response?.type, 'TYPE')
    if (response?.type === 'success') {
      const { authentication } = response
      // console.log(authentication)
      fetchUserInfo(authentication?.accessToken)
    }
  }, [response])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (googleToken.token) {
        console.log('hola')
        // getLogin({
        //   variables: {
        //     email: 'janco7249@gmail.com',
        //     name: 'Janco Alvarez Luis Gabriel',
        //     image:
        //       'https://lh3.googleusercontent.com/a-/AOh14GiprjDlsYm61mv-8-L6xMoXFAw5t38G8B7-wbsvcg=s96-c',
        //   },
        // })
        // getLogin({ variables: { email: user.email, name: user.name, image: user.image } })
        // fetchUserInfo(googleToken?.token)
      }
    }

    return () => {
      cleanup = false
    }
  }, [googleToken.token])

  const signOut = async () => {
    const data = await AuthSession.revokeAsync(
      {
        token: response?.authentication?.accessToken,
        clientId: EXPO_CLIENT_ID,
      },
      Google.discovery,
    )
    console.log(data)
    setGoogleToken({ token: '', signed: false })
  }

  console.log(error, 'err')

  return (
    <Layout>
      <Text style={styles.text}>Holis</Text>
      <Text style={styles.text}>{data?.signin.profile}</Text>
      <Button title='Go to books' onPress={() => navigation.navigate('BookScreen')} />
      <ModalSignIn>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            {googleToken.signed ? (
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
    </Layout>
  )
}

const styles = StyleSheet.create({
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

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
// import { useQuery } from '@apollo/client'
// import { ALL_USERS } from '../user/graphql-queries'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { signedGoogle } from '../signed'
import ModalSignIn from '../components/ModalSignIn'
import Layout from '../components/Layout'

WebBrowser.maybeCompleteAuthSession()

const HomeScreen = ({ showModal, handleModal }) => {
  // const { data } = useQuery(ALL_USERS)
  const [googleToken, setGoogleToken] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '430314882997-l8qvd3eu4cnnos93srci3kg46h8uefj5.apps.googleusercontent.com',
    androidClientId: '430314882997-eq2h27g5u9mu1qde9ill0n1dmacolq8b.apps.googleusercontent.com',
    iosClientId: '430314882997-pkd1i5t2ma44db1dpou2qrgfh7pavl0i.apps.googleusercontent.com',
    webClientId: '430314882997-vfbtg3sgsmsjateom5k010e074je60s5.apps.googleusercontent.com',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      setGoogleToken(authentication?.accessToken)
    }
  }, [response])

  const signedGoogleAccessToken = async (token) => {
    const data = await signedGoogle(token)
    console.log(data)
  }

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      googleToken && signedGoogleAccessToken(googleToken)
    }

    return () => {
      cleanup = false
    }
  }, [googleToken])

  return (
    <Layout>
      <Text style={styles.text}>Holis</Text>
      <ModalSignIn showModal={showModal} handleModal={handleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Button
              disabled={!request}
              title='Login'
              onPress={() => {
                promptAsync()
                handleModal()
              }}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => handleModal()}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
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
    backgroundColor: '#2196F3',
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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

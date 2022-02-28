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
import { useLazyQuery } from '@apollo/client'
import { useTheme } from '@react-navigation/native'
import GoogleIcon from 'react-native-vector-icons/AntDesign'

import AllPost from '../components/Post/AllPost'
import NameUser from '../components/NameUser'
import ModalSignIn from '../components/ModalSignIn'
import { useToggle } from '../hooks/useToggle'
import { FIND_USER } from '../user/graphql-queries'
import { useAuth } from '../hooks/useAuth'
import { auth } from '../lib/auth'

const HomeScreen = () => {
  const { googleAuth } = useAuth()
  const { colors } = useTheme()
  const { handleModalVisible, darkTheme } = useToggle()

  const { status, email, token } = googleAuth
  const [getProfile, { data }] = useLazyQuery(FIND_USER)
  const { promptAsync, request, signOut } = auth()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (token !== '') getProfile({ variables: { email: email } })
    }

    return () => (cleanup = false)
  }, [token])

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <AllPost />
      <ModalSignIn>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: colors.primary, shadowColor: colors.colorThirdBlue },
            ]}
          >
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
                    <Text style={[styles.modalUserText, { color: colors.textGray }]}>
                      @{data?.findUser.me.username}
                    </Text>
                  </View>
                </View>
              ) : (
                <ActivityIndicator color={colors.colorThirdBlue} size='large' />
              )
            ) : (
              <Text style={[styles.text, { color: colors.text }]}>Sign In</Text>
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
                    backgroundColor: `${colors.colorThirdBlue}a3`,
                  },
                ]}
                onPress={() => {
                  signOut()
                  handleModalVisible()
                }}
                activeOpacity={0.7}
              >
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                  Sign Out
                </Text>
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
                    backgroundColor: colors.colorThirdBlue,
                  },
                ]}
                disabled={!request}
                onPress={() => {
                  promptAsync({ useProxy: true, showInRecents: true })
                  handleModalVisible()
                }}
                activeOpacity={0.7}
              >
                <GoogleIcon
                  name='google'
                  color={colors.white}
                  onPress={() => console.log('xd')}
                  size={24}
                />
                <Text style={[styles.textButton, { color: colors.white, marginLeft: 16 }]}>
                  Sign with Google
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.colorFourthRed },
                // { backgroundColor: colors.colorThirdBlue },
              ]}
              onPress={() => handleModalVisible()}
              activeOpacity={0.7}
            >
              <Text style={[styles.textButton, { color: colors.white }]}>Cancel</Text>
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
  },
  text: {
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
    marginTop: 16,
  },
  buttonSignOut: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
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
    borderRadius: 20,
    padding: 35,
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
  modalUserText: { fontSize: 18 },
})

export default HomeScreen

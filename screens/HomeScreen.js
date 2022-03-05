/* eslint-disable react/prop-types */
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import GoogleIcon from 'react-native-vector-icons/AntDesign'

import AllPost from '../components/Post/AllPost'
import ModalSignIn from '../components/ModalSignIn'
import { auth } from '../lib/auth'
import { useToggle } from '../hooks/useToggle'
import { useAuth } from '../hooks/useAuth'

const HomeScreen = () => {
  const { googleAuth } = useAuth()
  const { colors } = useTheme()
  const { handleModalVisible, darkTheme } = useToggle()

  const { status } = googleAuth
  const { promptAsync, request, signOut } = auth()

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
            {status === 'unauthenticated' && (
              <Text style={[styles.text, { color: colors.text, marginBottom: 10 }]}>Sign In</Text>
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
                <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>
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
                  promptAsync({ useProxy: true })
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
              style={[styles.button, { backgroundColor: colors.colorFourthRed }]}
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

export default HomeScreen

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
    backgroundColor: '#0002',
  },
  modalView: {
    width: '80%',
    textAlign: 'center',
    borderRadius: 20,
    padding: 30,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 32,
  },
})

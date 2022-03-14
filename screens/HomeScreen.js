/* eslint-disable react/prop-types */
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native'
import GoogleIcon from 'react-native-vector-icons/AntDesign'

import AllPost from '../components/Post/AllPost'
import ModalSignIn from '../components/ModalSignIn'
import { auth } from '../lib/auth'
import { useToggle } from '../hooks/useToggle'
import { useAuth } from '../hooks/useAuth'
import NameUser from '../components/NameUser'

const HomeScreen = () => {
  const { googleAuth } = useAuth()
  const { status, name } = googleAuth
  const { colors, dark } = useTheme()
  const { handleModalVisible } = useToggle()
  const { promptAsync, request, signOut } = auth()

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'fade'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <AllPost />
      <ModalSignIn>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: colors.primary,
                shadowColor: colors.colorThirdBlue,
                borderColor: colors.border,
              },
            ]}
          >
            {status === 'unauthenticated' ? (
              <Text style={[styles.text, { color: colors.text }]}>Sign In</Text>
            ) : (
              <View style={styles.signed}>
                <NameUser name={name} verified={false} fontSize={20} />
              </View>
            )}
            {googleAuth.status === 'authenticated' ? (
              <Pressable
                android_ripple={{ color: colors.primary }}
                style={({ pressed }) => [
                  styles.buttonSignOut,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: pressed ? `${colors.colorFourthRed}aa` : colors.colorFourthRed,
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
              </Pressable>
            ) : (
              <Pressable
                android_ripple={{ color: colors.primary }}
                style={({ pressed }) => [
                  styles.button,
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: pressed ? `${colors.colorThirdBlue}aa` : colors.colorThirdBlue,
                  },
                ]}
                disabled={!request}
                onPress={() => {
                  promptAsync({ useProxy: false })
                  handleModalVisible()
                }}
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
              </Pressable>
            )}
            <Pressable
              android_ripple={{ color: colors.primary }}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? `${colors.textGray}aa` : colors.textGray },
              ]}
              onPress={() => handleModalVisible()}
            >
              <Text style={[styles.textButton, { color: colors.white }]}>Cancel</Text>
            </Pressable>
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
    paddingHorizontal: 30,
    paddingVertical: 30,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 32,
    borderWidth: 1,
  },
  signed: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
})

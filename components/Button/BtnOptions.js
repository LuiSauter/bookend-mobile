/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLazyQuery } from '@apollo/client'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'

import { FIND_USER } from '../../user/graphql-queries'
import BtnFollow from './BtnFollow'
import { useAuth } from '../../hooks/useAuth'

const BtnOptions = ({ username, user }) => {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const { googleAuth } = useAuth()
  const { status, email } = googleAuth
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      status === 'authenticated' && getUserByEmail({ variables: { email: email } })
    }
    return () => {
      cleanup = false
    }
  }, [status])

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        style={[styles.menu, { backgroundColor: colors.secondary, borderColor: colors.border }]}
        anchor={
          <Icon.Button
            backgroundColor='transparent'
            name='ellipsis-vertical'
            color={colors.textGray}
            iconStyle={{ marginRight: 0 }}
            size={15}
            borderRadius={50}
            onPress={showMenu}
            underlayColor={colors.colorUnderlay}
          />
        }
        onRequestClose={hideMenu}
      >
        <View style={{ margin: 16 }}>
          <MenuItem
            pressColor={colors.colorUnderlay}
            textStyle={{ color: colors.text, fontSize: 18 }}
            onPress={hideMenu}
            style={{ borderRadius: 12 }}
          >
            Reportar un problema
          </MenuItem>
          {dataUser?.findUser.me.user !== user && (
            <MenuItem
              pressColor='transparent'
              textStyle={{ color: colors.text, fontSize: 18, width: '130%' }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.text, fontSize: 18, textAlign: 'center' }}>
                  @{username}
                </Text>
                <BtnFollow username={username} user={user} />
              </View>
            </MenuItem>
          )}
          <MenuDivider color={colors.border} />
          <MenuItem
            textStyle={{ color: colors.colorFourthRed, fontSize: 18 }}
            pressColor={colors.colorUnderlay}
            onPress={hideMenu}
            style={{ borderRadius: 12 }}
          >
            Cancelar
          </MenuItem>
        </View>
      </Menu>
    </View>
  )
}
export default BtnOptions

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    width: '90%',
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
  },
})

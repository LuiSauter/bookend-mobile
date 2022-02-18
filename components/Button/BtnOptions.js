/* eslint-disable react/prop-types */
import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../config/colors'
import { useAuth } from '../../hooks/useAuth'
import { FIND_USER } from '../../user/graphql-queries'
import BtnFollow from './BtnFollow'

const BtnOptions = ({ id, username, user }) => {
  const [visible, setVisible] = useState(false)
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)
  const { googleAuth } = useAuth()
  const { status, email } = googleAuth

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

  const isMatch = dataUser?.findUser.liked.some((postId) => postId === id)

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        style={styles.menu}
        anchor={
          <Icon.Button
            backgroundColor='transparent'
            name='ellipsis-vertical'
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
            textStyle={{ color: colors.textWhite, fontSize: 18 }}
            onPress={hideMenu}
            style={{ borderRadius: 12 }}
          >
            Reportar un problema
          </MenuItem>
          {dataUser?.findUser.me.email !== email && (
            <MenuItem
              pressColor='transparent'
              textStyle={{
                color: colors.textWhite,
                fontSize: 18,
              }}
              style={{
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.textWhite, fontSize: 18 }}>@{username}</Text>
                <BtnFollow username={username} user={user} />
              </View>
            </MenuItem>
          )}
          <MenuDivider color={colors.TextGray} />
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.colorSecondary,
  },
})

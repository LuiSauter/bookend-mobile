import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../config/colors'

const BtnOptions = () => {
  const [visible, setVisible] = useState(false)

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)
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
          <MenuItem
            pressColor={colors.colorUnderlay}
            textStyle={{ color: colors.textWhite, fontSize: 18 }}
            onPress={hideMenu}
            style={{ borderRadius: 12 }}
          >
            Dejar de seguir
          </MenuItem>
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
    height: '100%',
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

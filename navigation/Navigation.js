import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { colors, colorsLight } from '../config/colors'
import { useToggle } from '../hooks/useToggle'
import StackNavigator from './StackNavigator'

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colorsLight.colorPrimary,
    primary: colorsLight.colorPrimary,
    secondary: colorsLight.colorSecondary,
    textGray: colorsLight.TextGray,
    colorThirdBlue: colorsLight.colorThirdBlue,
    colorThirdPurple: colorsLight.colorThirdPurple,
    colorThirdYellow: colorsLight.colorThirdYellow,
    colorUnderlay: colorsLight.colorUnderlay,
    colorFourthRed: colorsLight.colorFourthRed,
    colorLikeRed: colorsLight.colorLikeRed,
    white: '#fff',
    text: colorsLight.text,
    border: colors.border,
  },
}

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.colorPrimary,
    primary: colors.colorPrimary,
    secondary: colors.colorSecondary,
    textGray: colors.TextGray,
    colorThirdBlue: colors.colorThirdBlue,
    colorThirdPurple: colors.colorThirdPurple,
    colorThirdYellow: colors.colorThirdYellow,
    colorFourthRed: colors.colorFourthRed,
    colorUnderlay: colors.colorUnderlay,
    colorLikeRed: colors.colorLikeRed,
    white: '#fff',
    text: colors.textWhite,
    border: colors.border,
  },
}

const Navigation = () => {
  const { darkTheme } = useToggle()
  return (
    <NavigationContainer theme={darkTheme ? dark : light}>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default Navigation

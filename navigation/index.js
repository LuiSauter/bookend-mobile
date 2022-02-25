import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import Navigation from './Navigation'
import { colors, colorsLight } from '../config/colors'
import { useToggle } from '../hooks/useToggle'

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colorsLight.colorPrimary,
    primary: colorsLight.colorPrimary,
    secondary: colorsLight.colorSecondary,
    textGray: colorsLight.TextGray,
    colorThirdBlue: colorsLight.colorThirdBlue,
    colorThirPuple: colorsLight.colorThirPuple,
    colorThirdYellow: colorsLight.colorThirdYellow,
    colorUnderlay: colorsLight.colorUnderlay,
    colorFourthRed: colorsLight.colorFourthRed,
    colorLikeRed: colorsLight.colorLikeRed,
    white: '#fff',
    text: colorsLight.text,
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
    colorThirPuple: colors.colorThirPuple,
    colorThirdYellow: colors.colorThirdYellow,
    colorFourthRed: colors.colorFourthRed,
    colorUnderlay: colors.colorUnderlay,
    colorLikeRed: colors.colorLikeRed,
    white: '#fff',
    text: colors.textWhite,
  },
}

const index = () => {
  const { darkTheme } = useToggle()

  return (
    <NavigationContainer theme={darkTheme ? dark : light}>
      <Navigation />
    </NavigationContainer>
  )
}

export default index

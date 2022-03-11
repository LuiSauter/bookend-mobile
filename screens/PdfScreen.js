/* eslint-disable react/prop-types */
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

const PdfScreen = ({ route }) => {
  const { bookUrl } = route.params
  const bookURI = bookUrl.substring(0, 66)
  const { colors } = useTheme()
  return (
    <WebView
      style={[styles.container, { backgroundColor: colors.primary }]}
      originWhitelist={['*']}
      containerStyle={styles.container}
      source={{
        html: `
        <head><meta name="viewport" content="width=device-width"></head>
        <body><iframe src="${bookURI}preview" width="100%" height="100%" allow="autoplay" style="border:none;border-radius:0.6rem;"></iframe></body>`,
      }}
    />
  )
}

export default PdfScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    borderRadius: 16,
  },
})

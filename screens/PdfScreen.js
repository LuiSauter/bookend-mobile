import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { WebView } from 'react-native-webview'

const PdfScreen = ({ route }) => {
  const { bookUrl } = route.params
  const bookURI = bookUrl.substring(0, 66)
  const { colors, dark } = useTheme()
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'fade'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
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
    </SafeAreaView>
  )
}

export default PdfScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
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

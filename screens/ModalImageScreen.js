/* eslint-disable react/prop-types */
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useToggle } from '../hooks/useToggle'
import { useLazyQuery } from '@apollo/client'
import { GET_DOMINANT_COLOR } from '../post/graphql-queries'
import ImageView from 'react-native-image-viewing'

const ModalImageScreen = ({ route, navigation }) => {
  const { image } = route.params
  const { handleAddImage } = useToggle()
  const [getDominantColor, { data: dataDominantColor }] = useLazyQuery(GET_DOMINANT_COLOR)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      handleAddImage(image)
      getDominantColor({ variables: { image: image } })
    }
    return () => {
      cleanup = false
    }
  }, [image])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle='light-content'
        animated={true}
        showHideTransition={'none'}
        backgroundColor={
          dataDominantColor?.getColors ? `rgb(${dataDominantColor?.getColors})` : '#192734'
        }
        translucent={true}
      />
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false)
          navigation.goBack()
        }}
        animationType='slide'
        backgroundColor={
          dataDominantColor?.getColors ? `rgb(${dataDominantColor?.getColors})` : '#192734'
        }
        presentationStyle='overFullScreen'
        swipeToCloseEnabled={false}
        doubleTapToZoomEnabled={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#192734',
  },
  image: {
    resizeMode: 'cover',
    height: '80%',
    width: '100%',
  },
  backIcon: {
    ...StyleSheet.absoluteFillObject,
    color: '#fff',
    flex: 1,
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    margin: 16,
  },
})

export default ModalImageScreen

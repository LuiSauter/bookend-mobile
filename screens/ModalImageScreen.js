/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getColorImage } from '../lib/getColors'

const ModalImageScreen = ({ route }) => {
  const { image } = route.params
  const [dominantColor, setDominantColor] = useState('')
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      getColorImage(image).then((data) =>
        setDominantColor(data.result.colors.image_colors[0].html_code),
      )
    }
    return () => {
      cleanup = false
    }
  }, [image])

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: dominantColor,
        }}
      >
        {/* <ImageBackground source={{ uri: image }} resizeMode='cover' style={styles.viewContainer}> */}
        <Image style={styles.image} source={{ uri: image }} />
        {/* </ImageBackground> */}
        <View>
          <Text>color:</Text>
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    height: '50%',
    width: '100%',
  },
  // example: {
  //   height: '100%',
  //   resizeMode: 'cover',
  //   width: '100%',
  //   opacity: 0.03,
  //   overlayColor: 'center',
  //   ...StyleSheet.absoluteFill,
  // },
})

export default ModalImageScreen

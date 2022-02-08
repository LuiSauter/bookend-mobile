/* eslint-disable react/prop-types */
import { Image, StyleSheet, ImageBackground, View } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useToggle } from '../hooks/useToggle'
import Icon from 'react-native-vector-icons/AntDesign'

const ModalImageScreen = ({ route, navigation }) => {
  const { image } = route.params
  const { handleAddImage } = useToggle()

  useEffect(() => {
    let cleanup = true
    if (cleanup) handleAddImage(image)

    return () => {
      cleanup = false
    }
  }, [image])

  return (
    <Layout>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={{ uri: image }}
        blurRadius={150}
      >
        <View style={styles.backIcon}>
          <Icon.Button
            backgroundColor='transparent'
            borderRadius={50}
            name='arrowleft'
            onPress={() => navigation.goBack()}
            size={27}
            padding={5}
            iconStyle={{ marginRight: 1 }}
            underlayColor='#0004'
          />
        </View>
        <Image style={styles.image} source={{ uri: image }} />
      </ImageBackground>
    </Layout>
  )
}

const styles = StyleSheet.create({
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
    // flexShrink: 1,
    top: 0,
    left: 0,
    // height: 30,
    // width: 30,
    margin: 10,
  },
})

export default ModalImageScreen

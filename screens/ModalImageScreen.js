/* eslint-disable react/prop-types */
import { Image, StyleSheet, ImageBackground, View, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useToggle } from '../hooks/useToggle'
import Icon from 'react-native-vector-icons/AntDesign'

const ModalImageScreen = ({ route, navigation }) => {
  const { image, imageColor } = route.params
  const { handleAddImage } = useToggle()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      handleAddImage(image)
    }
    return () => {
      cleanup = false
    }
  }, [image])

  console.log(imageColor)

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <StatusBar
        // barStyle='default'
        // animated={true}
        // showHideTransition={'none'}
        backgroundColor={imageColor}
        // translucent={true}
        //not found in android
      />
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
        imageStyle={{ tintColor: imageColor }}
        source={{ uri: image }}
      >
        <View style={styles.backIcon}>
          <Icon.Button
            backgroundColor='transparent'
            borderRadius={50}
            name='arrowleft'
            color={'#aaa'}
            onPress={() => navigation.goBack()}
            size={27}
            padding={5}
            iconStyle={{ marginRight: 1 }}
            underlayColor='#555a'
          />
        </View>
        <Image style={styles.image} source={{ uri: image }} />
      </ImageBackground>
    </SafeAreaView>
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
    top: 0,
    left: 0,
    margin: 16,
  },
})

export default ModalImageScreen

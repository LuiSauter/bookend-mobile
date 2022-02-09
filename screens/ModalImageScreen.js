/* eslint-disable react/prop-types */
import { Image, StyleSheet, ImageBackground, View, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useToggle } from '../hooks/useToggle'
import Icon from 'react-native-vector-icons/AntDesign'

const ModalImageScreen = ({ route, navigation }) => {
  const { image } = route.params
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

  const colors = [
    '#2666CF',
    '#8A39E1',
    '#BB6464',
    '#219F94',
    '#F94892',
    '#035397',
    '#FFC600',
    '#502064',
    '#4A3F35',
    '#BE3144',
    '#21325E',
    '#F76E11',
  ]

  const colorRandom = colors[Math.floor(Math.random() * colors.length)]

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <StatusBar
        barStyle='default'
        animated={true}
        showHideTransition={'none'}
        backgroundColor={colorRandom}
        translucent={true}
        hidden //not found in android
      />
      <ImageBackground
        // onLoad={(e) => {
        // }}
        // imageStyle={{ tintColor: colorRandom }}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
        source={{ uri: image }}
        blurRadius={100}
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

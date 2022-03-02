/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useTheme } from '@react-navigation/native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import NameUser from '../NameUser'

const INITIAL_STATE = {
  localUri: null,
  width: 0,
  height: 0,
}

const NewPost = ({ name, username, verified, photo, email }) => {
  const { colors } = useTheme()
  const [selectedImage, setSelectedImage] = useState(INITIAL_STATE)
  const [first, setfirst] = useState()

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('¡Se requiere permiso para acceder a las images!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.5,
    })
    if (pickerResult.cancelled) return setSelectedImage(INITIAL_STATE)
    setSelectedImage({
      localUri: pickerResult.uri,
      width: pickerResult.width,
      height: pickerResult.height,
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.me}>
        <Image source={{ uri: photo }} style={styles.mePhoto} />
        <View>
          <NameUser name={name} verified={verified} fontSize={17} />
          <Text style={{ color: colors.textGray }}>@{username}</Text>
        </View>
      </View>
      <View>
        <TextInput
          placeholder='Título'
          placeholderTextColor={`${colors.colorThirdBlue}aa`}
          multiline={true}
          style={[styles.title, { color: colors.colorThirdBlue }]}
        />
        <TextInput
          placeholder='Descripción'
          placeholderTextColor={colors.textGray}
          multiline={true}
          style={[styles.text, { color: colors.text }]}
        />
        <TextInput
          placeholder='Autor'
          placeholderTextColor={colors.textGray}
          multiline={true}
          style={[styles.text, { color: colors.text }]}
        />
        <TextInput
          placeholder='Url del libro (google.drive)'
          placeholderTextColor={colors.textGray}
          style={[styles.text, { color: colors.text }]}
        />
        {selectedImage.localUri !== null && (
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.btnChangeImage}
            activeOpacity={0.6}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <EntypoIcon
                name='cross'
                color={colors.textGray}
                size={30}
                iconStyle={{ marginRight: 0 }}
                style={styles.crossIcon}
              />
              <Text>Cambiar imagen</Text>
            </View>
          </TouchableOpacity>
        )}
        {selectedImage.localUri === null ? (
          <TouchableHighlight
            onPress={openImagePickerAsync}
            underlayColor={colors.colorUnderlay}
            style={[styles.squeleton, { backgroundColor: `${colors.textGray}33` }]}
          >
            <EntypoIcon
              name='image'
              backgroundColor='transparent'
              borderRadius={50}
              color={colors.textGray}
              size={35}
              iconStyle={{ marginRight: 0 }}
            />
          </TouchableHighlight>
        ) : (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage.localUri }} style={styles.image} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    height: '100%',
    position: 'relative',
  },
  me: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  mePhoto: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 50,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  btnChangeImage: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '40%',
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 2 / 3,
    borderRadius: 16,
    marginBottom: 16,
  },
  squeleton: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1 / 1,
    borderRadius: 16,
  },
})

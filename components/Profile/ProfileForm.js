/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { UPDATE_PROFILE } from '../../user/graphql-mutation'
import { useMutation } from '@apollo/client'
import { FIND_USER } from '../../user/graphql-queries'

const ProfileForm = ({
  name,
  username,
  photo,
  description,
  location,
  email,
  website,
  gender,
  id,
}) => {
  const { colors } = useTheme()
  const [profile, setProfile] = useState({
    name: name,
    username: username,
    photo: photo,
    description: description,
    location: location,
    email: email,
    website: website,
    gender: gender,
    id: id,
  })
  const navigation = useNavigation()
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: FIND_USER, variables: { email: email } }],
  })

  const handleUpdate = () => {
    const { description, gender, location, name, photo, username, website, id } = profile
    console.log(description, gender, location, name, photo, username, website, id)
    if (
      description !== '' &&
      gender !== '' &&
      location &&
      name !== '' &&
      photo !== '' &&
      username !== '' &&
      website !== ''
    ) {
      updateProfile({
        variables: {
          name: name,
          username: username,
          profile: id,
          description: description,
          gender: gender,
          website: website,
          location: location,
        },
      })
      navigation.navigate('HomeScreen')
    }
  }

  return (
    <Fragment>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} resizeMode='cover' style={styles.image} />
      </View>
      <Text style={styles.text}>
        Name <Text style={{ color: colors.colorThirdBlue }}>*</Text>
      </Text>
      <TextInput
        placeholder='Write your name'
        placeholderTextColor={'#ccc'}
        value={profile.name}
        defaultValue={profile.name}
        onChangeText={(name) => setProfile((prevState) => ({ ...prevState, name: name }))}
        style={[styles.input, { color: 'white', backgroundColor: colors.border }]}
      />
      <Text style={styles.text}>
        Username <Text style={{ color: colors.colorThirdBlue }}>*</Text>
      </Text>
      <TextInput
        placeholder='Write a username'
        placeholderTextColor={'#ccc'}
        value={profile.username}
        defaultValue={profile.username}
        onChangeText={(username) =>
          setProfile((prevState) => ({ ...prevState, username: username }))
        }
        style={[styles.input, { color: 'white', backgroundColor: colors.border }]}
      />
      <Text style={styles.text}>
        Descripción <Text style={{ color: colors.colorThirdBlue }}>*</Text>
      </Text>
      <TextInput
        placeholder='Write a description'
        placeholderTextColor={'#ccc'}
        value={profile.description}
        defaultValue={profile.description}
        multiline={true}
        onChangeText={(description) =>
          setProfile((prevState) => ({ ...prevState, description: description }))
        }
        style={[styles.input, { color: 'white', backgroundColor: colors.border }]}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder={email}
        placeholderTextColor={'#aaa'}
        value={email}
        editable={false}
        style={[styles.input, { color: colors.text, backgroundColor: colors.border }]}
      />
      <Text style={styles.text}>
        Gender <Text style={{ color: colors.colorThirdBlue }}>*</Text>
      </Text>
      <Picker
        selectedValue={profile.gender}
        style={{ color: colors.text, marginBottom: 16 }}
        dropdownIconColor={colors.text}
        onValueChange={(itemValue, itemIndex) =>
          setProfile((prevState) => ({ ...prevState, gender: itemValue }))
        }
      >
        <Picker.Item label='Male' value='male' />
        <Picker.Item label='Female' value='female' />
      </Picker>
      <Text style={styles.text}>
        Website <Text style={{ color: colors.colorThirdBlue }}>*</Text>
      </Text>
      <TextInput
        placeholder={'Website'}
        placeholderTextColor={'#aaa'}
        value={profile.website}
        defaultValue={profile.website}
        onChangeText={(website) => setProfile((prevState) => ({ ...prevState, website: website }))}
        style={[styles.input, { color: 'white', backgroundColor: colors.border }]}
      />
      <Text style={styles.text}>
        Location <Text style={{ color: colors.colorThirdBlue }}>*</Text>
      </Text>
      <TextInput
        placeholder='Tokio, Japón'
        placeholderTextColor='#aaa'
        value={profile.location}
        defaultValue={profile.location}
        onChangeText={(location) =>
          setProfile((prevState) => ({ ...prevState, location: location }))
        }
        style={[styles.input, { color: 'white', backgroundColor: colors.border }]}
      />
      <Text style={{ color: colors.textGray }}>
        <Text style={{ color: colors.colorThirdBlue }}>* </Text>
        Fields required
      </Text>
      <TouchableHighlight
        activeOpacity={0.9}
        onPress={handleUpdate}
        style={{ marginVertical: 16, borderRadius: 10 }}
      >
        <Text
          style={{
            backgroundColor: colors.colorThirdBlue,
            borderRadius: 10,
            padding: 6,
            textAlign: 'center',
            fontSize: 16,
            color: colors.text,
          }}
        >
          Submit
        </Text>
      </TouchableHighlight>
    </Fragment>
  )
}

export default ProfileForm

const styles = StyleSheet.create({
  form: {},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    paddingBottom: 10,
  },
  input: {
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    marginBottom: 16,
  },
})

/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import NameUser from '../NameUser'
import { categorys } from '../../assets/data/category'

const INITIAL_POST_STATE = {
  title: '',
  description: [],
  author: '',
  bookUrl: '',
  image: '',
  tags: [],
}

const NewPost = ({ name, username, verified, photo, email, handleDisabled, addPost }) => {
  const { colors } = useTheme()
  const [postState, setPostState] = useState(INITIAL_POST_STATE)
  const { author, bookUrl, description, image, tags, title } = postState

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (
        title !== '' &&
        description.length !== 0 &&
        author !== '' &&
        bookUrl !== '' &&
        image !== '' &&
        tags.length !== 0
      ) {
        const newData = { ...postState, email: email }
        handleDisabled(false)
        addPost(newData)
      } else {
        handleDisabled(true)
        addPost({})
      }
    }
    return () => {
      cleanup = false
    }
  }, [author, bookUrl, description, image, tags, title])

  return (
    <Fragment>
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
            onChangeText={(title) => setPostState((prevState) => ({ ...prevState, title }))}
            value={title}
            style={[styles.title, { color: colors.colorThirdBlue }]}
          />
          <TextInput
            placeholder='Descripción'
            placeholderTextColor={colors.textGray}
            multiline={true}
            onChangeText={(description) =>
              setPostState((prevState) => ({ ...prevState, description: description.split('\n') }))
            }
            style={[styles.text, { color: colors.text }]}
          />
          <TextInput
            placeholder='Autor'
            placeholderTextColor={colors.textGray}
            multiline={true}
            onChangeText={(author) => setPostState((prevState) => ({ ...prevState, author }))}
            value={author}
            style={[styles.text, { color: colors.text }]}
          />
          <TextInput
            placeholder='Url del libro (google.drive)'
            placeholderTextColor={colors.textGray}
            onChangeText={(bookUrl) => setPostState((prevState) => ({ ...prevState, bookUrl }))}
            value={bookUrl}
            style={[styles.text, { color: colors.colorThirPuple }]}
          />
          {postState.bookUrl !== '' ? (
            <Image source={{ uri: postState.bookUrl }} style={styles.image} />
          ) : (
            <View style={[styles.squeleton, { backgroundColor: `${colors.textGray}33` }]}>
              <EntypoIcon
                name='image'
                backgroundColor='transparent'
                borderRadius={50}
                color={colors.textGray}
                size={35}
                iconStyle={{ marginRight: 0 }}
              />
            </View>
          )}
          <Text style={[styles.text, { color: colors.text, marginTop: 10 }]}>
            Etiqueta tu publicación
          </Text>
          <View style={styles.labels}>
            {categorys.map((tag) => {
              const isMatch = postState.tags.some((item) => item === tag.tag)
              return (
                <Text
                  key={tag.id}
                  onPress={() => {
                    if (!isMatch)
                      setPostState((prevState) => ({
                        ...prevState,
                        tags: [...prevState.tags, tag.tag],
                      }))
                    else
                      setPostState((prevState) => ({
                        ...prevState,
                        tags: postState.tags.filter((tagState) => tagState !== tag.tag),
                      }))
                  }}
                  style={[
                    styles.tag,
                    {
                      color: isMatch ? colors.white : colors.text,
                      backgroundColor: isMatch ? colors.colorThirdBlue : 'transparent',
                    },
                  ]}
                >
                  {tag.tag}
                </Text>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </Fragment>
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
    aspectRatio: 2 / 1,
    borderRadius: 16,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  tag: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
})

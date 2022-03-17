import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FINDONE_POST, GET_DOMINANT_COLOR } from '../post/graphql-queries'
import { useQuery } from '@apollo/client'
import ImageView from 'react-native-image-viewing'
import * as NavigationBar from 'expo-navigation-bar'

import NameUser from '../components/NameUser'
import MultipleButtons from '../components/MultipleButtons'
import BtnOptions from '../components/Button/BtnOptions'
import { useTheme } from '@react-navigation/native'

const DetailScreen = ({ route, navigation }) => {
  const {
    id,
    bookUrl,
    comments,
    likes,
    image,
    title,
    description,
    user,
    author,
    name,
    username,
    verified,
    photo,
    descriptionUser,
    location,
    followers,
    following,
    email,
    website,
    hourAndMinute,
  } = route.params
  const { colors, dark } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const { data: dataDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: image } })
  const { data: userDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: photo } })
  const { data } = useQuery(FINDONE_POST, {
    variables: { id: id },
  })

  const activeModal = () => {
    isVisible ? (
      NavigationBar.setVisibilityAsync('visible')
    ) : (
      NavigationBar.setVisibilityAsync('hidden'),
      NavigationBar.setBehaviorAsync('overlay-swipe')
    )
    setIsVisible(!isVisible)
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      {isVisible ? (
        <StatusBar
          barStyle={'light-content'}
          animated={true}
          showHideTransition={'fade'}
          backgroundColor={
            dataDominantColor?.getColors ? `rgb(${dataDominantColor?.getColors})` : colors.primary
          }
        />
      ) : (
        <StatusBar
          barStyle={dark ? 'light-content' : 'dark-content'}
          animated={true}
          showHideTransition={'none'}
          backgroundColor={colors.primary}
        />
      )}
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={activeModal}
        animationType='fade'
        backgroundColor={
          dataDominantColor?.getColors
            ? `rgb(${dataDominantColor?.getColors}), 0.9`
            : colors.primary
        }
        swipeToCloseEnabled={false}
        doubleTapToZoomEnabled={true}
      />
      <ScrollView style={styles.postContainer}>
        <View style={styles.userTextContainer}>
          <View style={styles.userImgContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserScreen', {
                  name: name,
                  username: username,
                  verified: verified,
                  photo: photo,
                  dominantColor: userDominantColor?.getColors,
                  description: descriptionUser,
                  user: user,
                  location: location,
                  followers: followers,
                  following: following,
                  email: email,
                  website: website,
                })
              }
              activeOpacity={0.6}
            >
              <Image style={styles.userImg} source={{ uri: photo }} />
            </TouchableOpacity>
          </View>
          <View style={styles.userTextItem}>
            <NameUser name={name} verified={verified} fontSize={16} />
            <Text style={[styles.userTextUsername, { color: colors.text }]}>@{username}</Text>
          </View>
          <BtnOptions username={username} user={user} />
        </View>
        <View style={styles.postItemDescription}>
          <Text style={[styles.postItemTitle, { color: colors.colorThirdBlue }]}>
            {title} - {author}
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>{description.join('\n')}</Text>
        </View>
        <TouchableOpacity
          onPress={activeModal}
          activeOpacity={0.6}
          style={[styles.postImgContainer, { borderColor: colors.border }]}
        >
          <Image style={styles.postImg} source={{ uri: image }} />
        </TouchableOpacity>
        <Text
          style={[[styles.userTextUsername, { color: colors.textGray }], { marginVertical: 10 }]}
        >
          {hourAndMinute}
        </Text>
        {(likes.length > 0 || comments.length > 0) && (
          <View style={styles.likesAndComments}>
            <Text
              style={[[styles.userTextUsername, { color: colors.textGray }], { marginRight: 16 }]}
            >
              <Text style={{ color: colors.text, fontWeight: '700' }}>
                {data?.findPost ? data?.findPost.comments.length : comments.length}
              </Text>{' '}
              Comentarios
            </Text>
            <Text style={[styles.userTextUsername, { color: colors.textGray }]}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>
                {data?.findPost ? data?.findPost.likes.length : likes.length}
              </Text>{' '}
              Me gusta
            </Text>
          </View>
        )}
        <View style={{ paddingVertical: 10, marginBottom: 10 }}>
          <MultipleButtons title={title} bookUrl={bookUrl} id={id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  postContainer: {
    flex: 1,
    paddingHorizontal: 14,
    flexDirection: 'column',
    height: '100%',
  },
  userImgContainer: {
    marginVertical: 16,
    marginRight: 12,
    width: 47,
  },
  userImg: {
    height: 47,
    width: 47,
    borderRadius: 50,
  },
  userTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  userTextItem: {
    flex: 1,
    flexDirection: 'column',
  },
  userTextUsername: {
    fontSize: 15,
  },
  postItem: {
    flex: 1,
    marginTop: 15.5,
  },
  postItemDescription: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  postItemTitle: {
    fontSize: 20,
    marginBottom: 7,
  },
  text: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    lineHeight: 27,
  },
  postImgContainer: {
    minHeight: 500,
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
  },
  postImg: {
    height: '100%',
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  likesAndComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
})

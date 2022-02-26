/* eslint-disable react/prop-types */
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

import NameUser from '../components/NameUser'
import MultipleButtons from '../components/MultipleButtons'
import BtnOptions from '../components/Button/BtnOptions'
import { useToggle } from '../hooks/useToggle'
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
    hourAndMinute,
  } = route.params
  const { darkTheme } = useToggle()
  const { colors } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const { data: dataDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: image } })
  const { data } = useQuery(FINDONE_POST, {
    variables: { id: id },
  })

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      {isVisible && (
        <StatusBar
          barStyle={darkTheme ? 'light-content' : 'dark-content'}
          animated={true}
          showHideTransition={'none'}
          backgroundColor={
            dataDominantColor?.getColors ? `rgb(${dataDominantColor?.getColors})` : colors.primary
          }
        />
      )}
      <ImageView
        images={[{ uri: image ? image : data?.findPost.image }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false)
        }}
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
            {title ? title : data?.findPost.title} - {author ? author : data?.findPost.author}
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {description ? description : data?.findPost.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          activeOpacity={0.6}
          style={styles.postImgContainer}
        >
          <Image style={styles.postImg} source={{ uri: image ? image : data?.findPost.image }} />
        </TouchableOpacity>
        <Text
          style={[[styles.userTextUsername, { color: colors.textGray }], { marginVertical: 10 }]}
        >
          {hourAndMinute}
        </Text>
        {(likes.length > 0 || comments.length > 0) && (
          <View style={[styles.likesAndComments, { borderColor: colors.border }]}>
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
        {data?.findPost && (
          <MultipleButtons
            comments={comments.length ? comments.length : data?.findPost.comments.length}
            likes={data?.findPost.likes}
            id={id}
            bookDownload={bookUrl ? bookUrl : data?.findPost.bookUrl}
          />
        )}
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
    maxHeight: 500,
    borderRadius: 12,
  },
  postImg: {
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  likesAndComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})

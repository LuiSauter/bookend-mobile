/* eslint-disable react/prop-types */
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { FINDONE_POST, GET_DOMINANT_COLOR } from '../post/graphql-queries'
import { FIND_USER_BY_USER } from '../user/graphql-queries'
import { useQuery } from '@apollo/client'
import ImageView from 'react-native-image-viewing'

import NameUser from '../components/NameUser'
import userDefault from '../assets/img/default-user.png'
import MultipleButtons from '../components/MultipleButtons'
import { colors } from '../config/colors'
import BtnOptions from '../components/Button/BtnOptions'

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
  const [isVisible, setIsVisible] = useState(false)
  const { data: dataDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: image } })
  const { data, loading } = useQuery(FINDONE_POST, {
    variables: { id: id },
  })
  const { data: dataUser } = useQuery(FIND_USER_BY_USER, { variables: { user: user } })

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {isVisible && (
        <StatusBar
          barStyle='light-content'
          animated={true}
          showHideTransition={'none'}
          backgroundColor={
            dataDominantColor?.getColors
              ? `rgb(${dataDominantColor?.getColors})`
              : colors.colorPrimary
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
            : colors.colorPrimary
        }
        swipeToCloseEnabled={false}
        doubleTapToZoomEnabled={true}
      />
      <ScrollView style={styles.postContainer}>
        <View style={styles.userTextContainer}>
          <View style={styles.userImgContainer}>
            {dataUser?.findUserById ? (
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
                <Image
                  style={styles.userImg}
                  source={{ uri: photo ? photo : dataUser?.findUserById.me.photo }}
                />
              </TouchableOpacity>
            ) : (
              <Image style={styles.userImg} source={userDefault} />
            )}
          </View>
          <View style={styles.userTextItem}>
            <NameUser
              name={name ? name : dataUser?.findUserById.me.name}
              verified={verified ? verified : dataUser?.findUserById.me.verified}
              fontSize={16}
            />
            <Text style={styles.userTextUsername}>
              @{username ? username : dataUser?.findUserById.me.username}
            </Text>
          </View>
          <BtnOptions id={id} />
        </View>
        {loading ? (
          <ActivityIndicator
            color={colors.colorThirdBlue}
            size='large'
            style={{ display: 'flex', margin: 16 }}
          />
        ) : (
          <>
            <View style={styles.postItemDescription}>
              <Text style={styles.postItemTitle}>
                {title ? title : data?.findPost.title} - {author ? author : data?.findPost.author}
              </Text>
              <Text style={styles.text}>
                {description ? description : data?.findPost.description}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              activeOpacity={0.6}
              style={styles.postImgContainer}
            >
              <Image
                style={styles.postImg}
                source={{ uri: image ? image : data?.findPost.image }}
              />
            </TouchableOpacity>
            <Text style={[styles.userTextUsername, { marginVertical: 10 }]}>{hourAndMinute}</Text>
            {(likes.length > 0 || comments.length > 0) && (
              <View style={styles.likesAndComments}>
                <Text style={[styles.userTextUsername, { marginRight: 16 }]}>
                  <Text style={{ color: colors.textWhite, fontWeight: '700' }}>
                    {data?.findPost ? data?.findPost.comments.length : comments.length}
                  </Text>{' '}
                  Comentarios
                </Text>
                <Text style={styles.userTextUsername}>
                  <Text style={{ color: colors.textWhite, fontWeight: '700' }}>
                    {data?.findPost ? data?.findPost.likes.length : likes.length}
                  </Text>{' '}
                  Me gusta
                </Text>
              </View>
            )}
            {data?.findPost && (
              <MultipleButtons
                comments={comments.length ? comments.length : data?.findPost.comments.length}
                likes={likes ? likes : data?.findPost.likes}
                id={id}
                bookDownload={bookUrl ? bookUrl : data?.findPost.bookUrl}
              />
            )}
          </>
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
    backgroundColor: colors.colorPrimary,
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
    color: colors.textWhite,
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
    color: colors.colorThirdBlue,
    fontSize: 20,
    marginBottom: 7,
  },
  text: {
    color: colors.textWhite,
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
  button: {
    backgroundColor: colors.textWhite,
    width: 20,
    height: 30,
  },
  likesAndComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.TextGray,
  },
  comment: {
    color: colors.textWhite,
  },
})

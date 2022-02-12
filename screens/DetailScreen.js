/* eslint-disable react/prop-types */
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
import React, { useState } from 'react'
import { FINDONE_POST, GET_DOMINANT_COLOR } from '../post/graphql-queries'
import { useQuery } from '@apollo/client'
import ImageView from 'react-native-image-viewing'
import Icon from 'react-native-vector-icons/Ionicons'

import NameUser from '../components/NameUser'
import userDefault from '../assets/img/default-user.png'
import MultipleButtons from '../components/MultipleButtons'

const DetailScreen = ({ route, navigation }) => {
  const {
    id,
    // randomColor,
    // createdAt,
    bookUrl,
    comments,
    likes,
    image,
    title,
    description,
    // user,
    author,
    name,
    username,
    verified,
    photo,
    hourAndMinute,
  } = route.params
  const [isVisible, setIsVisible] = useState(false)
  const { data: dataDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: image } })
  const { data } = useQuery(FINDONE_POST, {
    variables: { id: id },
  })

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {isVisible && (
        <StatusBar
          barStyle='light-content'
          animated={true}
          showHideTransition={'none'}
          backgroundColor={
            dataDominantColor?.getColors ? `rgb(${dataDominantColor?.getColors})` : '#192734'
          }
        />
      )}
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false)
        }}
        animationType='fade'
        backgroundColor={
          dataDominantColor?.getColors ? `rgb(${dataDominantColor?.getColors}), 0.9` : '#192734'
        }
        swipeToCloseEnabled={false}
        doubleTapToZoomEnabled={true}
      />
      <ScrollView style={styles.postContainer}>
        <View style={styles.userTextContainer}>
          <View style={styles.userImgContainer}>
            {photo ? (
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
            ) : (
              <Image style={styles.userImg} source={userDefault} />
            )}
          </View>
          <View style={styles.userTextItem}>
            <NameUser name={name} verified={verified} fontSize={16} />
            <Text style={styles.userTextUsername}>@{username}</Text>
          </View>
          <Icon.Button
            backgroundColor='transparent'
            name='ellipsis-vertical'
            iconStyle={{ marginRight: 0 }}
            size={15}
            borderRadius={50}
            onPress={() => console.log('ONPRESS')}
            underlayColor='#0003'
          />
        </View>
        <View style={styles.postItemDescription}>
          <Text style={styles.postItemTitle}>
            {title} - {author}
          </Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          activeOpacity={0.6}
          style={styles.postImgContainer}
        >
          <Image style={styles.postImg} source={{ uri: image }} />
        </TouchableOpacity>
        <Text style={[styles.userTextUsername, { marginVertical: 10 }]}>{hourAndMinute}</Text>
        {(likes.length > 0 || comments.length > 0) && (
          <View style={styles.likesAndComments}>
            <Text style={[styles.userTextUsername, { marginRight: 16 }]}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>
                {data?.findPost ? data?.findPost.comments.length : comments.length}
              </Text>{' '}
              Comentarios
            </Text>
            <Text style={styles.userTextUsername}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>
                {data?.findPost ? data?.findPost.likes.length : likes.length}
              </Text>{' '}
              Me gusta
            </Text>
          </View>
        )}
        <MultipleButtons
          comments={comments.length}
          likes={data?.findPost ? data?.findPost.likes.length : likes.length}
          id={id}
          bookDownload={bookUrl}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#192734',
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
    color: '#ccc',
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
    color: '#0099ff',
    fontSize: 20,
    marginBottom: 7,
  },
  text: {
    color: '#fff',
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
    backgroundColor: '#ccc',
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
    borderColor: '#38444d',
  },
  comment: {
    color: '#fff',
  },
})

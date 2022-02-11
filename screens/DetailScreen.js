/* eslint-disable react/prop-types */
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { FINDONE_POST } from '../post/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import NameUser from '../components/NameUser'
import Icon from 'react-native-vector-icons/Ionicons'
import userDefault from '../assets/img/default-user.png'

const DetailScreen = ({ route, navigation }) => {
  const {
    id: id,
    timeago: timeago,
    ramdonColor: randomColor,
    createdAt,
    image,
    title,
    description,
    user,
    author,
    name,
    username,
    verified,
    photo,
  } = route.params
  const [getOnePost, { data, loading }] = useLazyQuery(FINDONE_POST)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      id && getOnePost({ variables: { id: id } })
    }
    return () => {
      cleanup = false
    }
  }, [id])

  // console.log(data?.findPost)

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.postContainer}>
        <View style={styles.userImgContainer}>
          {data?.findUserById ? (
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
        <View style={styles.postItem}>
          <View style={styles.userTextContainer}>
            <View style={styles.userTextItem}>
              <NameUser name={name} verified={verified} fontSize={16} />
              <Text style={styles.userTextUsername}>
                @{username} · {timeago}
              </Text>
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
            onPress={() => {
              navigation.navigate('ModalImageScreen', {
                image: image,
              })
            }}
            activeOpacity={0.6}
            style={styles.postImgContainer}
          >
            {loading ? (
              <View
                style={{
                  height: 400,
                  width: '100%',
                  backgroundColor: randomColor,
                  borderRadius: 12,
                }}
              />
            ) : (
              <Image style={styles.postImg} source={{ uri: image }} />
            )}
          </TouchableOpacity>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#192734',
  },
  postContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userTextItem: {
    flex: 1,
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'column',
  },
  postItemTitle: {
    color: '#0099ff',
    fontSize: 15.5,
    marginBottom: 7,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  postImgContainer: {
    paddingVertical: 13,
    maxHeight: 400,
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
})

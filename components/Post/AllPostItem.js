import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER_BY_USER } from '../../user/graphql-queries'
import userDefault from '../../assets/img/default-user.png'
import useTimeAgo from '../../hooks/useTimeAgo'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import NameUser from '../NameUser'

const AllPostItem = ({ createdAt, image, title, description, user, author, id }) => {
  const date = Number(createdAt)
  const timeago = useTimeAgo(date)
  const navigation = useNavigation()

  const [getUserById, { data, loading }] = useLazyQuery(FIND_USER_BY_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      user && getUserById({ variables: { user: user } })
    }
    return () => {
      cleanup = false
    }
  }, [user])

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

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <TouchableHighlight
      underlayColor='#0003'
      onPress={() =>
        navigation.navigate('DetailScreen', {
          id: id,
          timeago: timeago,
          ramdonColor: randomColor,
          createdAt,
          image,
          title,
          description,
          user,
          author,
          name: data?.findUserById.me.name,
          username: data?.findUserById.me.username,
          verified: data?.findUserById.me.verified,
          photo: data?.findUserById.me.photo,
        })
      }
    >
      <View style={styles.postContainer}>
        <View style={styles.userImgContainer}>
          {data?.findUserById ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserScreen', {
                  name: data?.findUserById.me.name,
                  username: data?.findUserById.me.username,
                  verified: data?.findUserById.me.verified,
                })
              }
              activeOpacity={0.6}
            >
              <Image style={styles.userImg} source={{ uri: data?.findUserById.me.photo }} />
            </TouchableOpacity>
          ) : (
            <Image style={styles.userImg} source={userDefault} />
          )}
        </View>
        <View style={styles.postItem}>
          <View style={styles.userTextContainer}>
            <View style={styles.userTextItem}>
              <NameUser
                name={data?.findUserById.me.name}
                verified={data?.findUserById.me.verified}
                fontSize={16}
              />
              <Text style={styles.userTextUsername}>
                @{data?.findUserById.me.username} · {timeago}
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
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
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

export default AllPostItem

AllPostItem.propTypes = {
  bookUrl: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  comments: PropTypes.array,
  description: PropTypes.array.isRequired,
  id: PropTypes.string,
  likes: PropTypes.array,
  tags: PropTypes.array,
  user: PropTypes.string.isRequired,
  author: PropTypes.string,
}

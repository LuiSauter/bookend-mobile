import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER_BY_USER } from '../../user/graphql-queries'
import bookendLogo from '../../assets/img/default-user.png'
import useTimeAgo from '../../hooks/useTimeAgo'

const AllPostItem = ({
  bookUrl,
  createdAt,
  image,
  title,
  comments,
  description,
  id,
  likes,
  tags,
  user,
  author,
}) => {
  const [getUserById, { data }] = useLazyQuery(FIND_USER_BY_USER)
  const date = Number(createdAt)
  const timeago = useTimeAgo(date)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      user && getUserById({ variables: { user: user } })
    }
    return () => {
      cleanup = false
    }
  }, [user])

  return (
    <TouchableHighlight underlayColor='#0003' onPress={() => console.log('press')}>
      <View style={styles.postContainer}>
        <View style={styles.userImgContainer}>
          {data?.findUserById ? (
            <Image style={styles.userImg} source={{ uri: data?.findUserById.me.photo }} />
          ) : (
            <Image style={styles.userImg} source={bookendLogo} />
          )}
        </View>
        <View style={styles.postItem}>
          <View style={styles.userTextContainer}>
            <View style={styles.userTextItem}>
              <Text style={styles.userTextName}>{data?.findUserById.me.name}</Text>
              <Text style={styles.userTextUsername}>
                @{data?.findUserById.me.username} · {timeago}
              </Text>
            </View>
            <TouchableOpacity onPress={() => console.log('options')} style={styles.button}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postItemDescription}>
            <Text style={styles.postItemTitle}>
              {title} - {author}
            </Text>
            <Text style={styles.text}>{description}</Text>
          </View>
          <View style={styles.postImgContainer}>
            <Image style={styles.postImg} source={{ uri: image }} />
          </View>
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
  userTextName: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
  userTextUsername: {
    color: '#ccc',
    fontSize: 15,
  },
  postItem: {
    flex: 1,
    marginTop: 16,
  },
  postItemDescription: {
    flex: 1,
    flexDirection: 'column',
  },
  postItemTitle: {
    color: '#0099ff',
    fontSize: 16,
    marginBottom: 7,
  },
  text: {
    color: '#fff',
    fontSize: 15,
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

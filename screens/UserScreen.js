/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View, VirtualizedList } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useLazyQuery } from '@apollo/client'
import { FIND_PROFILE } from '../user/graphql-queries'
import NameUser from '../components/NameUser'
import { ALL_POST_BY_USER } from '../post/graphql-queries'
import AllPostItem from '../components/Post/AllPostItem'

const UserScreen = ({ route }) => {
  const { username, name, verified } = route.params
  const [getProfile, { data }] = useLazyQuery(FIND_PROFILE)
  const [getAllPost, { dataAllPosts }] = useLazyQuery(ALL_POST_BY_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (username) {
        getProfile({ variables: { username: username } })
        getAllPost({
          variables: { pageSize: 100, skipValue: 0, username: username },
        })
      }
    }

    return () => {
      cleanup = false
    }
  }, [username])

  const getItemCount = (data) => {
    return data.length
  }

  const getItem = (data, index) => {
    return {
      bookUrl: data[index].bookUrl,
      createdAt: data[index].createdAt,
      image: data[index].image,
      title: data[index].title,
      comments: data[index].comments,
      description: data[index].description,
      id: data[index].id,
      likes: data[index].likes,
      tags: data[index].tags,
      user: data[index].user,
      author: data[index].author,
    }
  }

  return (
    <Layout>
      <View style={{ height: '100%' }}>
        <View style={styles.profilePresentation}>
          <Image
            blurRadius={100}
            style={styles.imageBackground}
            source={{ uri: data?.findProfile.me.photo }}
          />
          <Image style={styles.profileImage} source={{ uri: data?.findProfile.me.photo }} />
        </View>
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <NameUser
            name={data?.findProfile.me.name}
            verified={data?.findProfile.me.verified}
            fontSize={20}
          />
          <Text>@{data?.findProfile.me.username}</Text>
          <Text>{data?.findProfile.description}</Text>
          <View style={styles.textPresentation}>
            <Text>{data?.findProfile.location}</Text>
            <Text>{data?.findProfile.website}</Text>
          </View>
          <View style={styles.textPresentation}>
            <Text>{data?.findProfile.followers.length} Following</Text>
            <Text>{data?.findProfile.following.length} Followers</Text>
          </View>
        </View>
        <View style={{ height: '100%', flex: 1, backgroundColor: '#09f', width: '100%' }}>
          {dataAllPosts?.allPostsByUsername && (
            <VirtualizedList
              data={dataAllPosts?.allPostsByUsername}
              initialNumToRender={6}
              renderItem={({ item }) => (
                <AllPostItem
                  bookUrl={item.bookUrl}
                  createdAt={item.createdAt}
                  image={item.image}
                  title={item.title}
                  comments={item.comments}
                  description={item.description}
                  id={item.id}
                  likes={item.likes}
                  tags={item.tags}
                  user={item.user}
                  author={item.author}
                />
              )}
              keyExtractor={(item) => item.id}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          )}
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  profilePresentation: {
    alignItems: 'center',
  },
  imageBackground: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: 100,
    // opacity: 0.4,
  },
  profileImage: {
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: '#192734',
    marginTop: 50,
    height: 90,
    width: 90,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    borderRadius: 50,
    zIndex: 1,
    position: 'relative',
  },
  textPresentation: { flex: 1, flexDirection: 'row' },
})

export default UserScreen

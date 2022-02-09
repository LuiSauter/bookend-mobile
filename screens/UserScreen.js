/* eslint-disable react/prop-types */
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useLazyQuery } from '@apollo/client'
import { FIND_PROFILE } from '../user/graphql-queries'
import NameUser from '../components/NameUser'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT } from '../post/graphql-queries'
import AllPostItem from '../components/Post/AllPostItem'

const INITIAL_PAGE = 2

const UserScreen = ({ route }) => {
  const { username } = route.params
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [getProfile, { data }] = useLazyQuery(FIND_PROFILE)
  const [isLoading, setIsLoading] = useState(true)
  const [getAllPost, { data: dataAllPosts, refetch, loading }] = useLazyQuery(ALL_POST_BY_USER)
  const [getCountAllPost, { data: CountAllPosts }] = useLazyQuery(ALL_POST_BY_USER_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (username) {
        getProfile({ variables: { username: username } })
        getAllPost({
          variables: { pageSize: INITIAL_PAGE, skipValue: 0, username: username },
        })
        getCountAllPost({ variables: { username: username } })
      }
    }

    return () => {
      cleanup = false
    }
  }, [username])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      refetch({ pageSize: currentPage, skipValue: 0, username: username })
    }

    return () => {
      cleanup = false
    }
  }, [currentPage])

  const renderLoader = () => {
    return isLoading ? (
      <View style={{ marginBottom: 10 }}>
        <ActivityIndicator size='large' color='#09f' />
      </View>
    ) : null
  }

  const renderItem = ({ item }) => {
    return (
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
    )
  }

  const loadMoreItem = () => {
    if (
      CountAllPosts &&
      dataAllPosts?.allPostsByUsername.length === CountAllPosts?.allPostUserCount
    ) {
      return setIsLoading(false)
    }
    setCurrentPage(currentPage + INITIAL_PAGE)
  }

  return (
    <Layout>
      {loading && (
        <View>
          <ActivityIndicator size='large' color='#09f' />
        </View>
      )}
      {dataAllPosts?.allPostsByUsername && (
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={styles.profilePresentation}>
                <Image
                  blurRadius={100}
                  style={styles.imageBackground}
                  source={{ uri: data?.findProfile.me.photo }}
                />
                <Image style={styles.profileImage} source={{ uri: data?.findProfile.me.photo }} />
              </View>
              <View style={{}}>
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
            </>
          )}
          data={dataAllPosts?.allPostsByUsername}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      )}
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

/* eslint-disable react/prop-types */
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_PROFILE } from '../user/graphql-queries'
import NameUser from '../components/NameUser'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT } from '../post/graphql-queries'
import AllPostItem from '../components/Post/AllPostItem'
import BtnFollow from '../components/Button/BtnFollow'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '@react-navigation/native'
import { useToggle } from '../hooks/useToggle'

const INITIAL_PAGE = 6

const UserScreen = ({ route }) => {
  const { username } = route.params
  const { googleAuth } = useAuth()
  const { colors } = useTheme()
  const { darkTheme } = useToggle()
  const { email } = googleAuth
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  const [getProfile, { data }] = useLazyQuery(FIND_PROFILE)
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
        <ActivityIndicator size='large' color={colors.colorThirdBlue} />
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
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      {loading && (
        <ActivityIndicator
          style={{ marginVertical: 16 }}
          size='large'
          color={colors.colorThirdBlue}
        />
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
                <Image
                  style={[styles.profileImage, { borderColor: colors.primary }]}
                  source={{ uri: data?.findProfile.me.photo }}
                />
              </View>
              <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <NameUser
                    name={data?.findProfile.me.name}
                    verified={data?.findProfile.me.verified}
                    fontSize={20}
                  />
                  {data?.findProfile.me.email !== email && (
                    <BtnFollow username={username} user={data?.findProfile.me.user} />
                  )}
                </View>
                <Text style={[styles.textOpacity, { color: colors.textGray }]}>
                  @{data?.findProfile.me.username}
                </Text>
                <Text style={[styles.text, { color: colors.text }]}>
                  {data?.findProfile.description}
                </Text>
                <View style={styles.textPresentation}>
                  <Text style={[styles.textOpacity, { color: colors.textGray }]}>
                    {data?.findProfile.location}
                  </Text>
                  <Text style={{ fontSize: 15, color: colors.colorThirdBlue, marginLeft: 16 }}>
                    {data?.findProfile.website}
                  </Text>
                </View>
                <View style={styles.textPresentation}>
                  <Text style={[styles.text, { marginRight: 16, color: colors.text }]}>
                    {data?.findProfile.followers.length}
                    <Text style={{ color: colors.textGray }}> Following</Text>
                  </Text>
                  <Text style={[styles.text, { color: colors.text }]}>
                    {data?.findProfile.following.length}
                    <Text style={{ color: colors.textGray }}> Followers</Text>
                  </Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginTop: 12,
  },
  textOpacity: {
    fontSize: 15,
  },
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

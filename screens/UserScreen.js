/* eslint-disable react/prop-types */
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT } from '../post/graphql-queries'
import AllPostItem from '../components/Post/AllPostItem'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '@react-navigation/native'
import { useToggle } from '../hooks/useToggle'
import HeaderProfile from '../components/Profile/HeaderProfile'

const INITIAL_PAGE = 6

const UserScreen = ({ route }) => {
  const {
    username,
    name,
    verified,
    photo,
    description,
    user,
    location,
    followers,
    following,
    email: userEmail,
    website,
  } = route.params
  const { googleAuth } = useAuth()
  const { email } = googleAuth
  const { colors } = useTheme()
  const { darkTheme } = useToggle()

  const [refreshing, setRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [isLoading, setIsLoading] = useState(true)

  const [getAllPost, { data: dataAllPosts, refetch }] = useLazyQuery(ALL_POST_BY_USER)
  const [getCountAllPost, { data: CountAllPosts }] = useLazyQuery(ALL_POST_BY_USER_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (username) {
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
      <View style={{ marginVertical: 16 }}>
        <ActivityIndicator size='small' color={colors.colorThirdBlue} />
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch({ pageSize: INITIAL_PAGE, skipValue: 0 })
    setCurrentPage(INITIAL_PAGE)
    setIsLoading(true)
    setRefreshing(false)
  }, [])

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
      <FlatList
        ListHeaderComponent={() => (
          <HeaderProfile
            photo={photo}
            verified={verified}
            username={username}
            name={name}
            email={email}
            user={user}
            description={description}
            website={website}
            followers={followers}
            userEmail={userEmail}
            following={following}
            location={location}
          />
        )}
        data={dataAllPosts?.allPostsByUsername}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={colors.primary}
            refreshing={refreshing}
            colors={[colors.colorThirdBlue]}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

export default UserScreen

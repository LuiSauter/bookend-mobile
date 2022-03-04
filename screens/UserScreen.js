/* eslint-disable react/prop-types */
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import NameUser from '../components/NameUser'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT } from '../post/graphql-queries'
import AllPostItem from '../components/Post/AllPostItem'
import BtnFollow from '../components/Button/BtnFollow'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '@react-navigation/native'
import { useToggle } from '../hooks/useToggle'

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
          <>
            <View style={styles.profilePresentation}>
              <Image blurRadius={100} style={styles.imageBackground} source={{ uri: photo }} />
              <Image
                style={[styles.profileImage, { borderColor: colors.primary }]}
                source={{ uri: photo }}
              />
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <NameUser name={name} verified={verified} fontSize={20} />
                {userEmail !== email && <BtnFollow username={username} user={user} />}
              </View>
              <Text style={[styles.textOpacity, { color: colors.textGray }]}>@{username}</Text>
              <Text style={[styles.text, { color: colors.text }]}>{description}</Text>
              <View style={styles.textPresentation}>
                <Text style={[styles.textOpacity, { color: colors.textGray }]}>{location}</Text>
                <Text style={{ fontSize: 15, color: colors.colorThirdBlue, marginLeft: 16 }}>
                  {website}
                </Text>
              </View>
              <View style={styles.textPresentation}>
                <Text style={[styles.text, { marginRight: 16, color: colors.text }]}>
                  {followers.length}
                  <Text style={{ color: colors.textGray }}> Following</Text>
                </Text>
                <Text style={[styles.text, { color: colors.text }]}>
                  {following.length}
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

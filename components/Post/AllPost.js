/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_POSTS, ALL_POSTS_COUNT } from '../../post/graphql-queries'
import AllPostItem from './AllPostItem'
// import { useAuth } from '../../hooks/useAuth'
import { colors } from '../../config/colors'

const INITIAL_PAGE = 10
const ITEM_HEIGHT = 700

const renderItem = ({ item }) => (
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

const getItemLayout = (data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
})

const keyExtractor = (item) => item.id.toString()

const AllPost = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [refreshing, setRefreshing] = useState(false)
  const [getAllPost, { data, loading, refetch }] = useLazyQuery(ALL_POSTS)
  const { data: allPostsCount } = useQuery(ALL_POSTS_COUNT)
  // const { googleAuth } = useAuth()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      setCurrentPage(INITIAL_PAGE)
      getAllPost({ variables: { pageSize: INITIAL_PAGE, skipValue: 0 } })
    }
    return () => (cleanup = false)
  }, [])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (currentPage === INITIAL_PAGE) return
      refetch({ pageSize: currentPage, skipValue: 0 })
    }
    return () => (cleanup = false)
  }, [currentPage])

  // useEffect(() => {
  //   let cleanup = true
  //   if (cleanup) googleAuth.status === 'unauthenticated' && refetch({ pageSize: INITIAL_PAGE, skipValue: 0 })
  //   return () => (cleanup = false)
  // }, [googleAuth.status])

  const renderLoader = () => {
    return (
      isLoading && (
        <ActivityIndicator
          style={{ marginBottom: 16 }}
          color={colors.colorThirdBlue}
          size='small'
        />
      )
    )
  }

  const loadMoreItem = () => {
    if (allPostsCount && allPostsCount?.postCount === data?.allPosts.length) {
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
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          style={{ flex: 1, marginVertical: 16 }}
          color={colors.colorThirdBlue}
          size='large'
        />
      )}
      {data?.allPosts && (
        <FlatList
          data={data?.allPosts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          getItemLayout={getItemLayout}
          initialNumToRender={INITIAL_PAGE}
          onEndReachedThreshold={0}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={colors.colorPrimary}
              refreshing={refreshing}
              colors={[colors.colorThirdBlue]}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default AllPost

/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_POSTS, ALL_POSTS_COUNT } from '../../post/graphql-queries'
import AllPostItem from './AllPostItem'
import { useTheme } from '@react-navigation/native'

const INITIAL_PAGE = 20
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
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [refreshing, setRefreshing] = useState(false)
  const [getAllPost, { data, refetch }] = useLazyQuery(ALL_POSTS)
  const { data: allPostsCount } = useQuery(ALL_POSTS_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      // setCurrentPage(INITIAL_PAGE)
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

  const renderLoader = useCallback(() => {
    return (
      isLoading && (
        <ActivityIndicator
          style={{ marginBottom: 16 }}
          color={colors.colorThirdBlue}
          size='small'
        />
      )
    )
  }, [])

  const loadMoreItem = useCallback(() => {
    if (allPostsCount && allPostsCount?.postCount === data?.allPosts.length) {
      return setIsLoading(false)
    }
    setCurrentPage(currentPage + INITIAL_PAGE)
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch({ pageSize: INITIAL_PAGE, skipValue: 0 })
    setCurrentPage(INITIAL_PAGE)
    setIsLoading(true)
    setRefreshing(false)
  }, [])

  return data?.allPosts ? (
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
          progressBackgroundColor={colors.primary}
          refreshing={refreshing}
          colors={[colors.colorThirdBlue]}
          onRefresh={onRefresh}
        />
      }
    />
  ) : (
    <ActivityIndicator
      style={{ flex: 1, paddingTop: 24, paddingBottom: 16 }}
      color={colors.colorThirdBlue}
      size='large'
    />
  )
}

export default AllPost

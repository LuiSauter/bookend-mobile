import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_POSTS, ALL_POSTS_COUNT } from '../../post/graphql-queries'
import AllPostItem from './AllPostItem'
import { useToggle } from '../../hooks/useToggle'

const INITIAL_PAGE = 10

const AllPost = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [refreshing, setRefreshing] = useState(false)
  const [getAllPost, { data, loading, refetch }] = useLazyQuery(ALL_POSTS)
  const { data: allPostsCount } = useQuery(ALL_POSTS_COUNT)
  const { handleRefToTop } = useToggle()
  const ref = useRef(null)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      setCurrentPage(INITIAL_PAGE)
      getAllPost({ variables: { pageSize: INITIAL_PAGE, skipValue: 0 } })
      handleRefToTop(ref)
    }
    return () => {
      cleanup = false
    }
  }, [])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      refetch({ pageSize: currentPage, skipValue: 0 })
    }
    return () => {
      cleanup = false
    }
  }, [currentPage])

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

  const renderLoader = () => {
    return isLoading && <ActivityIndicator style={{ marginBottom: 16 }} color='#09f' size='large' />
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
    setRefreshing(false)
  }, [])

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator style={{ flex: 1, marginVertical: 16 }} color='#09f' size='large' />
      )}
      {data?.allPosts && (
        <FlatList
          ref={ref}
          data={data?.allPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={'#192734'}
              refreshing={refreshing}
              colors={['#09f']}
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

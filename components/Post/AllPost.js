import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_POSTS, ALL_POSTS_COUNT } from '../../post/graphql-queries'
import AllPostItem from './AllPostItem'

const INITIAL_PAGE = 10

const AllPost = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [getAllPost, { data, loading, refetch }] = useLazyQuery(ALL_POSTS)
  const { data: allPostsCount } = useQuery(ALL_POSTS_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      setCurrentPage(INITIAL_PAGE)
      getAllPost({ variables: { pageSize: INITIAL_PAGE, skipValue: 0 } })
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

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={{ flex: 1 }} color='#09f' size='large' />}
      {data?.allPosts && (
        <FlatList
          data={data?.allPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
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

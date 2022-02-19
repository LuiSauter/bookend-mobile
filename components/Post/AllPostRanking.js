import { RefreshControl, StyleSheet, View, ActivityIndicator, VirtualizedList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ALL_POSTS_COUNT, ALL_POST_RANKING } from '../../post/graphql-queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import AllPostRankItem from './AllPostRankItem'
import { colors } from '../../config/colors'
import { useAuth } from '../../hooks/useAuth'

const INITIAL_PAGE = 10

const AllPostRanking = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [refreshing, setRefreshing] = useState(false)
  const { googleAuth } = useAuth()
  const { status } = googleAuth
  const [getAllPostRank, { data, loading, refetch }] = useLazyQuery(ALL_POST_RANKING)
  const { data: allPostsCount } = useQuery(ALL_POSTS_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) getAllPostRank({ variables: { pageSize: INITIAL_PAGE, skipValue: 0 } })
    return () => (cleanup = false)
  }, [])

  useEffect(() => {
    let cleanup = true
    if (cleanup) refetch({ pageSize: currentPage, skipValue: 0 })
    return () => (cleanup = false)
  }, [currentPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      status === 'unauthenticated' && refetch({ pageSize: INITIAL_PAGE, skipValue: 0 })
    }
    return () => (cleanup = false)
  }, [status])

  const renderItem = ({ item }) => {
    return (
      <AllPostRankItem
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
  const getItemCount = (data) => data.length
  const getItem = (data, index) => ({
    bookUrl: data[index].bookUrl,
    comments: data[index].comments,
    description: data[index].description,
    id: data[index].id,
    image: data[index].image,
    tags: data[index].tags,
    title: data[index].title,
    user: data[index].user,
    likes: data[index].likes,
    createdAt: data[index].createdAt,
    author: data[index].author,
  })
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
    if (allPostsCount && allPostsCount?.postCount === data?.allPostRanking.length) {
      return setIsLoading(false)
    }
    setCurrentPage(currentPage + INITIAL_PAGE)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setCurrentPage(INITIAL_PAGE)
    await refetch({ pageSize: INITIAL_PAGE, skipValue: 0 })
    setRefreshing(false)
  }, [])

  return (
    <View style={{ height: '100%' }}>
      {loading && (
        <ActivityIndicator
          style={{ flex: 1, marginVertical: 16 }}
          color={colors.colorThirdBlue}
          size='large'
        />
      )}
      {/* {data?.allPostRanking && (
        <FlatList
          data={data?.allPostRanking}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          numColumns={2}
          columnWrapperStyle={styles.column}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={colors.colorPrimary}
              refreshing={refreshing}
              colors={[colors.colorThirdBlue]}
              onRefresh={onRefresh}
            />
          }
        />
      )} */}
      {data?.allPostRanking && (
        <VirtualizedList
          data={data?.allPostRanking}
          initialNumToRender={INITIAL_PAGE}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          getItemCount={getItemCount}
          getItem={getItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl
              progressBackgroundColor='#09f'
              refreshing={refreshing}
              colors={['#000']}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  )
}

export default AllPostRanking

// const styles = StyleSheet.create({
//   column: {
//     flexShrink: 1,
//     justifyContent: 'space-around',
//     marginHorizontal: 5,
//     // padding: 10,
//   },
// })

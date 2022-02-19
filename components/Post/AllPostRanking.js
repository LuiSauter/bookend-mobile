import { RefreshControl, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ALL_POSTS_COUNT, ALL_POST_RANKING } from '../../post/graphql-queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import AllPostRankItem from './AllPostRankItem'
import { colors } from '../../config/colors'
import { ActivityIndicator } from 'react-native-paper'
import { useAuth } from '../../hooks/useAuth'

const INITIAL_PAGE = 10

const AllPostRanking = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [refreshing, setRefreshing] = useState(false)
  const { googleAuth } = useAuth()
  const { status } = googleAuth
  const [getAllPostRank, { data, refetch }] = useLazyQuery(ALL_POST_RANKING)
  const { data: allPostsCount } = useQuery(ALL_POSTS_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      getAllPostRank({ variables: { pageSize: INITIAL_PAGE, skipValue: 0 } })
    }
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
    await refetch({ pageSize: INITIAL_PAGE, skipValue: 0 })
    setRefreshing(false)
  }, [])

  return (
    <View style={{ height: '100%' }}>
      {data?.allPostRanking && (
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
      )}
    </View>
  )
}

export default AllPostRanking

const styles = StyleSheet.create({
  column: {
    flexShrink: 1,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    // padding: 10,
  },
})

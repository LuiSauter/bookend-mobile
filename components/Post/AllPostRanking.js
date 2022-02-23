/* eslint-disable react/prop-types */
import { RefreshControl, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ALL_POSTS_COUNT, ALL_POST_RANKING } from '../../post/graphql-queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import AllPostRankItem from './AllPostRankItem'
import { colors } from '../../config/colors'

const INITIAL_PAGE = 10
const ITEM_HEIGHT = 270

const renderItem = ({ item }) => (
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

const keyExtractor = (item) => item.id.toString()

const getItemLayout = (data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
})

const AllPostRanking = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [refreshing, setRefreshing] = useState(false)
  const [getAllPostRank, { data, loading, refetch }] = useLazyQuery(ALL_POST_RANKING)
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
    if (cleanup) {
      if (currentPage === INITIAL_PAGE) return
      refetch({ pageSize: currentPage, skipValue: 0 })
    }
    return () => (cleanup = false)
  }, [currentPage])

  const renderLoader = () => {
    return (
      isLoading && (
        <ActivityIndicator
          style={{ flex: 1, marginVertical: 16, width: '100%' }}
          color={colors.colorThirdBlue}
          size='large'
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
    setCurrentPage(INITIAL_PAGE)
    setIsLoading(true)
    setRefreshing(false)
  }, [])

  return (
    <View style={{ height: '100%' }}>
      {loading && (
        <ActivityIndicator
          style={{ flex: 1, width: '100%', height: '100%' }}
          color={colors.colorThirdBlue}
          size='large'
        />
      )}
      {data?.allPostRanking && (
        <FlatList
          data={data?.allPostRanking}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          getItemLayout={getItemLayout}
          initialNumToRender={INITIAL_PAGE}
          onEndReachedThreshold={0}
          removeClippedSubviews={true}
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
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
  },
})

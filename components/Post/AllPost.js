import { StyleSheet, View, VirtualizedList } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_POSTS } from '../../post/graphql-queries'
import AllPostItem from './AllPostItem'

const AllPost = () => {
  const { data } = useQuery(ALL_POSTS, {
    variables: {
      pageSize: 50,
      skipValue: 0,
    },
  })

  const getItemCount = (data) => {
    return data.length
  }

  const getItem = (data, index) => {
    return {
      bookUrl: data[index].bookUrl,
      createdAt: data[index].createdAt,
      image: data[index].image,
      title: data[index].title,
      comments: data[index].comments,
      description: data[index].description,
      id: data[index].id,
      likes: data[index].likes,
      tags: data[index].tags,
      user: data[index].user,
      author: data[index].author,
    }
  }

  return (
    <View style={styles.container}>
      {data?.allPosts && (
        <VirtualizedList
          data={data?.allPosts}
          initialNumToRender={6}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
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

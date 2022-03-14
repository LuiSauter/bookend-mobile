/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useToggle } from '../hooks/useToggle'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_POST_AUTHOR_USER } from '../post/graphql-queries'
import ResultPost from '../components/Search/ResultPost'
import ResultUser from '../components/Search/ResultUser'
import AllUsers from '../components/AllUsers'

const renderItem = ({ item }) => (
  <ResultPost
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

const renderItemUser = ({ item }) => (
  <ResultUser
    name={item.name}
    username={item.username}
    user={item.user}
    email={item.email}
    photo={item.photo}
    verified={item.verified}
  />
)

const keyExtractor = (item) => item.id.toString()
const keyExtractorUser = (item) => item.user.toString()

const NOT_FOUND_STATE = 'No se encontraron resultados.'

const TextNotFound = ({ color }) => (
  <Text style={[styles.textNotFound, { color: color }]}>
    {NOT_FOUND_STATE} <Text style={{ fontSize: 20 }}>🦉</Text>
  </Text>
)

const SearchScreen = () => {
  const { colors, dark } = useTheme()
  const { word } = useToggle()
  const [filter, setFilter] = useState({ book: true, author: false, user: false })
  const { book, author, user } = filter
  const [getResults, { data, loading }] = useLazyQuery(SEARCH_POST_AUTHOR_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (word !== '') {
        getResults({ variables: { words: word } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [word])

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.colorPrimary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <View style={[styles.btnFilter, { borderColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => setFilter({ book: true, author: false, user: false })}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.text,
              {
                backgroundColor: filter.book ? colors.colorThirdBlue : 'transparent',
                color: filter.book ? colors.white : colors.text,
              },
            ]}
          >
            Book
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter({ book: false, author: true, user: false })}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.text,
              {
                backgroundColor: filter.author ? colors.colorThirdBlue : 'transparent',
                color: filter.author ? colors.white : colors.text,
              },
            ]}
          >
            Author
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter({ book: false, author: false, user: true })}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.text,
              {
                backgroundColor: filter.user ? colors.colorThirdBlue : 'transparent',
                color: filter.user ? colors.white : colors.text,
              },
            ]}
          >
            User
          </Text>
        </TouchableOpacity>
      </View>
      {book
        ? data?.searchBooks.length === 0 && <TextNotFound color={colors.textGray} />
        : author
        ? data?.searchBooksAuthor.length === 0 && <TextNotFound color={colors.textGray} />
        : user
        ? data?.searchUsers.length === 0 && <TextNotFound color={colors.textGray} />
        : null}
      {word.length !== 0 ? (
        <FlatList
          ListHeaderComponent={() =>
            loading && (
              <ActivityIndicator
                style={{ marginVertical: 16 }}
                color={colors.colorThirdBlue}
                size='small'
              />
            )
          }
          data={
            book
              ? data?.searchBooks.length > 0 && data?.searchBooks
              : author
              ? data?.searchBooksAuthor.length > 0 && data?.searchBooksAuthor
              : user
              ? data?.searchUsers.length > 0 && data?.searchUsers
              : []
          }
          renderItem={filter.user ? renderItemUser : renderItem}
          keyExtractor={filter.user ? keyExtractorUser : keyExtractor}
        />
      ) : (
        <AllUsers />
      )}
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  btnFilter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  text: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 2,
    fontSize: 16,
  },
  textNotFound: { textAlign: 'center', textAlignVertical: 'center', height: '100%', fontSize: 15 },
})

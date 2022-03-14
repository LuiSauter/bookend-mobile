import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_USERS } from '../user/graphql-queries'
import ResultUser from '../components/Search/ResultUser'
import { useTheme } from '@react-navigation/native'

const renderItem = ({ item }) => (
  <ResultUser
    name={item.name}
    username={item.username}
    user={item.user}
    email={item.email}
    photo={item.photo}
    verified={item.verified}
  />
)

const keyExtractor = (item) => item.user.toString()

const AllUsers = () => {
  const { data, loading } = useQuery(ALL_USERS)
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color={colors.colorThirdBlue} size='large' />
      ) : (
        <FlatList data={data?.allUsers} renderItem={renderItem} keyExtractor={keyExtractor} />
      )}
    </View>
  )
}

export default AllUsers

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

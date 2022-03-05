/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import MultipleButtons from '../MultipleButtons'
import { useNavigation, useTheme } from '@react-navigation/native'
import useTimeAgo from '../../hooks/useTimeAgo'
import { FIND_USER_BY_USER } from '../../user/graphql-queries'
import { useQuery } from '@apollo/client'

const ResultPost = ({
  bookUrl,
  comments,
  likes,
  createdAt,
  image,
  title,
  description,
  id,
  user,
  author,
}) => {
  const date = Number(createdAt)
  const { hourAndMinute } = useTimeAgo(date)
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { data } = useQuery(FIND_USER_BY_USER, { variables: { user: user } })
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('DetailScreen', {
          id: id,
          createdAt,
          image,
          title,
          description,
          user,
          author,
          name: data?.findUserById.me.name,
          username: data?.findUserById.me.username,
          verified: data?.findUserById.me.verified,
          photo: data?.findUserById.me.photo,
          hourAndMinute,
          bookUrl,
          comments,
          likes,
        })
      }
      underlayColor={colors.colorUnderlay}
    >
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textItem}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[{ color: colors.colorThirdBlue }]}>
            <Text style={{ color: colors.text }}>Author:</Text> {author}
          </Text>
          <Text style={[styles.description, { color: colors.textGray }]}>
            {description.join(' ').length < 120
              ? description
              : `${description.join(' ').toString().substring(0, 120)}...`}
          </Text>
          <MultipleButtons comments={comments} likes={likes} id={id} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default ResultPost

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    aspectRatio: 9 / 13,
    height: 'auto',
    marginRight: 10,
    borderRadius: 16,
  },
  textItem: {
    flex: 2,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  description: {
    paddingVertical: 8,
    fontSize: 15,
  },
})

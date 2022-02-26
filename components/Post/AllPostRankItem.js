/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { colorsRandom } from '../../config/colors'
import BtnLike from '../Button/BtnLike'
import { useNavigation, useTheme } from '@react-navigation/native'
import useTimeAgo from '../../hooks/useTimeAgo'
import { FIND_USER_BY_USER } from '../../user/graphql-queries'
import { useQuery } from '@apollo/client'

const AllPostRankItem = ({
  bookUrl,
  createdAt,
  image,
  title,
  comments,
  description,
  id,
  likes,
  user,
  author,
}) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const date = Number(createdAt)
  const { hourAndMinute } = useTimeAgo(date)
  const { data } = useQuery(FIND_USER_BY_USER, { variables: { user: user } })
  return (
    <TouchableHighlight
      onPress={() =>
        data?.findUserById &&
        navigation.navigate('DetailScreen', {
          id: id,
          randomColor: colorsRandom[Math.floor(Math.random() * colorsRandom.length)],
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
        <View>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.TextAndLikes}>
          <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
          <BtnLike id={id} likes={likes.length} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default AllPostRankItem

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: 195,
    padding: 10,
  },
  image: {
    borderRadius: 10,
    height: 'auto',
    aspectRatio: 9 / 13,
    resizeMode: 'cover',
    width: '100%',
  },
  text: {
    fontSize: 15,
    width: '75%',
    textAlign: 'center',
  },
  TextAndLikes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
})

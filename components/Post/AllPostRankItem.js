/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { colors, colorsRandom } from '../../config/colors'
import BtnLike from '../Button/BtnLike'
import { useNavigation } from '@react-navigation/native'
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
  tags,
  user,
  author,
}) => {
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
          <View style={styles.titleAndBtn}>
            <BtnLike id={id} likes={likes.length} />
          </View>
        </View>
        <View style={styles.TextAndLikes}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default AllPostRankItem

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // display: 'flex',
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: 195,
    padding: 10,
    // maxHeight: 270,
    // height: 'auto',
    // backgroundColor: '#0f9a',
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
    color: colors.textWhite,
    width: '100%',
    textAlign: 'center',
  },
  TextAndLikes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  titleAndBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0003',
    borderRadius: 16,
    paddingRight: 10,
  },
})

/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../config/colors'

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
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.TextAndLikes}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, { marginLeft: 10 }]}>{likes.length}</Text>
      </View>
    </View>
  )
}

export default AllPostRankItem

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    flex: 1,
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    borderRadius: 16,
    height: 261,
    aspectRatio: 9 / 13,
    resizeMode: 'cover',
    width: '100%',
  },
  text: {
    fontSize: 16,
    paddingTop: 6,
    color: colors.textWhite,
  },
  TextAndLikes: {
    display: 'flex',
    flexDirection: 'row',
  },
})

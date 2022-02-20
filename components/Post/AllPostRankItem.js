/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../config/colors'
import BtnLike from '../Button/BtnLike'

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
    fontSize: 17,
    color: colors.textWhite,
  },
  TextAndLikes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
} from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import ImageView from 'react-native-image-viewing'
import PropTypes from 'prop-types'

import { FIND_USER_BY_USER } from '../../user/graphql-queries'
import userDefault from '../../assets/img/default-user.png'
import useTimeAgo from '../../hooks/useTimeAgo'
import NameUser from '../NameUser'
import { GET_DOMINANT_COLOR } from '../../post/graphql-queries'
import MultipleButtons from '../MultipleButtons'
import BtnOptions from '../Button/BtnOptions'
import { colors } from '../../config/colors'

const AllPostItem = ({
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
  const { timeago, hourAndMinute } = useTimeAgo(date)
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()

  const { data, loading } = useQuery(FIND_USER_BY_USER, { variables: { user: user } })
  const { data: dataDominantColor } = useQuery(GET_DOMINANT_COLOR, { variables: { image: image } })

  const colorsRandom = [
    '#2666CF',
    '#8A39E1',
    '#BB6464',
    '#219F94',
    '#F94892',
    '#035397',
    '#FFC600',
    '#502064',
    '#4A3F35',
    '#BE3144',
    '#21325E',
    '#F76E11',
  ]

  return (
    <>
      {isVisible && (
        <StatusBar
          barStyle='light-content'
          animated={true}
          showHideTransition={'none'}
          backgroundColor={
            dataDominantColor?.getColors
              ? `rgb(${dataDominantColor?.getColors})`
              : colors.colorPrimary
          }
        />
      )}
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        animationType='fade'
        backgroundColor={
          dataDominantColor?.getColors
            ? `rgb(${dataDominantColor?.getColors}), 0.9`
            : colors.colorPrimary
        }
        swipeToCloseEnabled={false}
        doubleTapToZoomEnabled={true}
      />
      <TouchableHighlight
        underlayColor={colors.colorUnderlay}
        onPress={() =>
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
      >
        <View style={styles.postContainer}>
          <View style={styles.userImgContainer}>
            {data?.findUserById ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserScreen', {
                    name: data?.findUserById.me.name,
                    username: data?.findUserById.me.username,
                    verified: data?.findUserById.me.verified,
                  })
                }
                activeOpacity={0.6}
              >
                <Image style={styles.userImg} source={{ uri: data?.findUserById.me.photo }} />
              </TouchableOpacity>
            ) : (
              <Image style={styles.userImg} source={userDefault} />
            )}
          </View>
          <View style={styles.postItem}>
            <View style={styles.userTextContainer}>
              <View style={styles.userTextItem}>
                <NameUser
                  name={data?.findUserById.me.name}
                  verified={data?.findUserById.me.verified}
                  fontSize={16}
                />
                <Text style={styles.userTextUsername}>
                  @{data?.findUserById.me.username} · {timeago}
                </Text>
              </View>
              <BtnOptions username={data?.findUserById.me.username} user={user} />
            </View>
            <View style={styles.postItemDescription}>
              <Text style={styles.postItemTitle}>
                {title} - {author}
              </Text>
              <Text style={styles.text}>{description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true)
              }}
              activeOpacity={0.6}
              style={styles.postImgContainer}
            >
              {loading ? (
                <View
                  style={{
                    height: 400,
                    width: '100%',
                    backgroundColor: colorsRandom[Math.floor(Math.random() * colorsRandom.length)],
                    borderRadius: 12,
                  }}
                />
              ) : (
                <Image style={styles.postImg} source={{ uri: image }} />
              )}
            </TouchableOpacity>
            <MultipleButtons
              comments={comments}
              likes={likes}
              id={id}
              bookDownload={bookUrl}
              user={user}
              hourAndMinute={hourAndMinute}
            />
          </View>
        </View>
      </TouchableHighlight>
    </>
  )
}
export default AllPostItem

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    height: '100%',
  },
  userImgContainer: {
    marginVertical: 16,
    marginRight: 12,
    width: 47,
  },
  userImg: {
    height: 47,
    width: 47,
    borderRadius: 50,
  },
  userTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userTextItem: {
    flex: 1,
    flexDirection: 'row',
  },
  userTextUsername: {
    color: colors.textWhite,
    fontSize: 14.5,
    overflow: 'hidden',
  },
  postItem: {
    flex: 1,
    marginTop: 15.5,
  },
  postItemDescription: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 12,
  },
  postItemTitle: {
    color: colors.colorThirdBlue,
    fontSize: 15.5,
    marginBottom: 7,
  },
  text: {
    color: colors.textWhite,
    fontSize: 16,
    lineHeight: 24,
  },
  postImgContainer: {
    maxHeight: 400,
  },
  postImg: {
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: colors.textWhite,
    width: 20,
    height: 30,
  },
})

AllPostItem.propTypes = {
  bookUrl: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  comments: PropTypes.array,
  description: PropTypes.array.isRequired,
  id: PropTypes.string,
  likes: PropTypes.array,
  tags: PropTypes.array,
  user: PropTypes.string.isRequired,
  author: PropTypes.string,
}

/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { DISLIKE_POST, LIKE_POST } from '../../post/graphql-mutations'
import { FINDONE_POST } from '../../post/graphql-queries'
import { FIND_USER } from '../../user/graphql-queries'
import { useAuth } from '../../hooks/useAuth'
import { useToggle } from '../../hooks/useToggle'
import { useTheme } from '@react-navigation/native'

const BtnLike = ({ id }) => {
  const { googleAuth } = useAuth()
  const { email, status } = googleAuth
  const { colors } = useTheme()
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(null)
  const { handleModalVisible } = useToggle()
  const { data } = useQuery(FINDONE_POST, {
    variables: { id: id },
  })
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)
  const [getLike] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: FINDONE_POST, variables: { id } }],
  })
  const [getDisLike] = useMutation(DISLIKE_POST, {
    refetchQueries: [{ query: FINDONE_POST, variables: { id } }],
  })

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      status === 'authenticated' && getUserByEmail({ variables: { email: email } })
    }
    return () => {
      cleanup = false
    }
  }, [status])

  const isMatch = data?.findPost.likes.some((postId) => postId === dataUser?.findUser.me.user)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'unauthenticated') {
        return setLike(false)
      }
      isMatch ? setLike(true) : setLike(false)
    }

    return () => {
      cleanup = false
    }
  }, [isMatch, status])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      setLikeCount(data?.findPost.likes.length)
    }

    return () => {
      cleanup = false
    }
  }, [data?.findPost])

  const handleLike = (id) => {
    if (status === 'unauthenticated') handleModalVisible()
    if (status === 'authenticated') {
      getLike({ variables: { id: id, email: email } })
      setLike(!like)
      setLikeCount((prev) => prev + 1)
    }
  }

  const handleDisLike = (id) => {
    if (status === 'unauthenticated') handleModalVisible()
    if (status === 'authenticated') {
      getDisLike({ variables: { id: id, email: email } })
      setLike(!like)
      setLikeCount((prev) => prev - 1)
    }
  }

  return (
    <View style={styles.btn}>
      {like ? (
        <Icon.Button
          name='heart'
          backgroundColor='transparent'
          borderRadius={50}
          color={colors.colorLikeRed}
          onPress={() => handleDisLike(id)}
          size={22}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      ) : (
        <Icon.Button
          name='heart-outline'
          backgroundColor='transparent'
          borderRadius={50}
          color={colors.text}
          onPress={() => handleLike(id)}
          size={22}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      )}
      <Text style={{ fontSize: 17, color: like ? colors.colorLikeRed : colors.text }}>
        {likeCount}
      </Text>
    </View>
  )
}

export default BtnLike

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
})

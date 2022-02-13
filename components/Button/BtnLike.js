/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useLazyQuery, useMutation } from '@apollo/client'
import { DISLIKE_POST, LIKE_POST } from '../../post/graphql-mutations'
import { FINDONE_POST } from '../../post/graphql-queries'
import { FIND_USER } from '../../user/graphql-queries'
import { useAuth } from '../../hooks/useAuth'
import { useToggle } from '../../hooks/useToggle'

const BtnLike = ({ id, likes }) => {
  const { googleAuth } = useAuth()
  const { email, status } = googleAuth
  const [like, setLike] = useState(false)
  const { handleModalVisible } = useToggle()
  const [getLike] = useMutation(LIKE_POST, {
    refetchQueries: [
      { query: FINDONE_POST, variables: { id } },
      { query: FIND_USER, variables: { email: email } },
      // { query: ALL_POSTS, variables: { pageSize: 6, skipValue: 0 } },
      // { query: ALL_POST_RANKING, variables: { pageSize: 6, skipValue: 0 } },
    ],
  })
  const [getDisLike] = useMutation(DISLIKE_POST, {
    refetchQueries: [
      { query: FINDONE_POST, variables: { id } },
      { query: FIND_USER, variables: { email: email } },
      // { query: ALL_POSTS, variables: { pageSize: 6, skipValue: 0 } },
      // { query: ALL_POST_RANKING, variables: { pageSize: 6, skipValue: 0 } },
    ],
  })
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      status === 'authenticated' && getUserByEmail({ variables: { email: email } })
    }
    return () => {
      cleanup = false
    }
  }, [status])

  const isMatch = dataUser?.findUser.liked.some((postId) => postId === id)

  useEffect(() => {
    let cleanup = true
    if (cleanup && isMatch) {
      if (status === 'unauthenticated') {
        return setLike(false)
      }
      isMatch ? setLike(true) : setLike(false)
    }

    return () => {
      cleanup = false
    }
  }, [isMatch, status])

  const handleLike = (id) => {
    if (status === 'unauthenticated') handleModalVisible()
    if (status === 'authenticated') {
      setLike(true)
      getLike({ variables: { id: id, email: email } })
    }
  }

  const handleDisLike = (id) => {
    if (status === 'unauthenticated') handleModalVisible()
    if (status === 'authenticated') {
      setLike(false)
      getDisLike({ variables: { id: id, email: email } })
    }
  }

  return (
    <View style={styles.btn}>
      {like ? (
        <Icon.Button
          name='heart'
          backgroundColor='transparent'
          borderRadius={50}
          color={'#ff1c85'}
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
          color={'#fff'}
          onPress={() => handleLike(id)}
          size={22}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      )}
      <Text style={{ fontSize: 17, color: like ? '#ff1c85' : '#fff' }}>{likes}</Text>
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

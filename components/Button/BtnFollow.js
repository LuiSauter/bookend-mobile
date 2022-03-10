/* eslint-disable react/prop-types */
import { useLazyQuery, useMutation } from '@apollo/client'
import { useTheme } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { useToggle } from '../../hooks/useToggle'
import { FOLLOW_USER, UNFOLLOW_USER } from '../../user/graphql-mutation'
import { FIND_USER } from '../../user/graphql-queries'

const BtnFollow = ({ user }) => {
  const { handleModalVisible } = useToggle()
  const { googleAuth } = useAuth()
  const { colors } = useTheme()
  const { status, email } = googleAuth
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)
  const [getFollow] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: FIND_USER, variables: { email: email } }],
  })

  const [getUnFollow] = useMutation(UNFOLLOW_USER, {
    refetchQueries: [{ query: FIND_USER, variables: { email: email } }],
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

  const handleClickButtonFollow = (data) => {
    if (status === 'unauthenticated') return handleModalVisible()
    getFollow({ variables: { user: data, email: email } })
  }

  const handleClickButtonUnFollow = (data) => {
    getUnFollow({ variables: { user: data, email: email } })
  }

  const isMath =
    status === 'authenticated' && dataUser?.findUser.following.some((userId) => userId === user)

  return isMath ? (
    <TouchableHighlight
      style={{ marginLeft: 16 }}
      underlayColor={colors.colorUnderlay}
      onPress={() => handleClickButtonUnFollow(user)}
    >
      <Text
        style={{
          color: colors.text,
          borderWidth: 1,
          borderRadius: 16,
          borderColor: colors.text,
          paddingHorizontal: 10,
          paddingBottom: 3,
          paddingTop: 3,
          fontSize: 16,
        }}
      >
        Dejar de seguir
      </Text>
    </TouchableHighlight>
  ) : (
    <TouchableHighlight
      style={{ marginLeft: 16 }}
      underlayColor={colors.colorUnderlay}
      onPress={() => handleClickButtonFollow(user)}
    >
      <Text
        style={{
          color: colors.white,
          backgroundColor: colors.colorThirdBlue,
          borderRadius: 16,
          paddingHorizontal: 10,
          paddingBottom: 4,
          paddingTop: 2,
          fontSize: 16,
        }}
      >
        Seguir
      </Text>
    </TouchableHighlight>
  )
}
export default BtnFollow

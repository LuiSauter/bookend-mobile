/* eslint-disable react/prop-types */
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import NewPost from '../components/Post/NewPost'
import { useTheme } from '@react-navigation/native'

const AddPostScreen = ({ route, handleDisabled, addPost }) => {
  const { name, username, verified, photo, email } = route.params
  const { colors, dark } = useTheme()
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      <NewPost
        name={name}
        username={username}
        verified={verified}
        photo={photo}
        email={email}
        handleDisabled={handleDisabled}
        addPost={addPost}
      />
    </SafeAreaView>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
  },
})

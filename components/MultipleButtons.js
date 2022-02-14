/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BtnLike from './Button/BtnLike'
import Comment from 'react-native-vector-icons/EvilIcons' //comment
import Download from 'react-native-vector-icons/Feather' //share
import Share from 'react-native-vector-icons/AntDesign' //sharealt
import { useNavigation } from '@react-navigation/native'

const MultipleButtons = ({ comments, likes, id, bookDownload, user, hourAndMinute }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.btnContainer}>
      <View style={styles.btn}>
        <Share.Button
          name='sharealt'
          backgroundColor='transparent'
          borderRadius={50}
          color={'#fff'}
          onPress={() => console.log('xd')}
          size={19}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      </View>
      <View style={styles.btn}>
        <Comment.Button
          name='comment'
          backgroundColor='transparent'
          borderRadius={50}
          color={'#fff'}
          onPress={() =>
            navigation.navigate('DetailScreen', { id, user, hourAndMinute, likes, comments })
          }
          size={26}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
        <Text style={styles.text}>{comments.length}</Text>
      </View>
      <BtnLike id={id} likes={likes.length} />
      <View style={styles.btn}>
        <Download.Button
          name='download'
          backgroundColor='transparent'
          borderRadius={50}
          color={'#fff'}
          onPress={() => console.log('xd')}
          size={20}
          iconStyle={{ marginRight: 0 }}
          underlayColor='transparent'
        />
      </View>
    </View>
  )
}

export default MultipleButtons

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 17,
  },
})

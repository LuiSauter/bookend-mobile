import React, { useState } from 'react'
import { Image, StyleSheet, TouchableHighlight } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache'
import HomeScreen from './screens/HomeScreen'
import BookScreen from './screens/BookScreen'
import bookendLogo from './assets/img/default-user.png'

const Stack = createNativeStackNavigator()

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://bookendd.vercel.app/api/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const App = () => {
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => setShowModal(!showModal)

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='HomeScreen'
            options={() => ({
              title: 'Inicio',
              headerStyle: {
                backgroundColor: '#192734',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerLeft: () => (
                <TouchableHighlight style={style.logoContainer} onPress={() => handleModal()}>
                  <Image style={style.bookendLogo} source={bookendLogo} />
                </TouchableHighlight>
              ),
            })}
          >
            {(props) => <HomeScreen {...props} showModal={showModal} handleModal={handleModal} />}
          </Stack.Screen>
          <Stack.Screen name='BookScreen' component={BookScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

const style = StyleSheet.create({
  bookendLogo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  logoContainer: {
    borderRadius: 50,
    marginRight: 14,
  },
})

export default App

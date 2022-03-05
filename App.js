/* eslint-disable react/prop-types */
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache'

import { ToggleStateProvider } from './context/toggleContext'
import Navigator from './navigation'
import { AuthStateProvider } from './context/authContext'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://bookendd.vercel.app/api/graphql',
  cache,
  // defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AuthStateProvider>
          <ToggleStateProvider>
            <Navigator />
          </ToggleStateProvider>
        </AuthStateProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

export default App

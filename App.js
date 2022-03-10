/* eslint-disable react/prop-types */
import React from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache'
import { URL_QL } from '@env'

import { ToggleStateProvider } from './context/toggleContext'
import Navigator from './navigation'
import { AuthStateProvider } from './context/authContext'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

const cache = new InMemoryCache({
  typePolicies: {
    Profile: {
      fields: {
        me: {
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming)
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: URL_QL,
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

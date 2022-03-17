import React from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { URL_QL } from '@env'
import { ToggleStateProvider } from './context/toggleContext'
import { AuthStateProvider } from './context/authContext'
import Navigation from './navigation/Navigation'

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
  uri: `${URL_QL}/api/graphql`,
  cache,
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AuthStateProvider>
          <ToggleStateProvider>
            <Navigation />
          </ToggleStateProvider>
        </AuthStateProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

export default App

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache'
import { ToggleStateProvider } from './context/toggleContext'
import Navigation from './Navigation'
import { AuthStateProvider } from './context/authContext'

// LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
// LogBox.ignoreAllLogs() //Ignore all log notifications

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://bookendd.vercel.app/api/graphql',
  cache,
  // defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthStateProvider>
        <ToggleStateProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </ToggleStateProvider>
      </AuthStateProvider>
    </ApolloProvider>
  )
}

export default App

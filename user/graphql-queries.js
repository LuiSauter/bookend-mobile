import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query {
    allUsers {
      name
      username
      user
      email
      photo
      verified
    }
  }
`

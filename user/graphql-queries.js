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
export const FIND_USER = gql`
  query findUserByProfileId($email: String!) {
    findUser(email: $email) {
      followers
      following
      verified
      id
      description
      location
      website
      post
      liked
      me {
        name
        photo
        user
        username
        email
      }
    }
  }
`

export const FIND_USER_BY_USER = gql`
  query findUserByUserID($user: String!) {
    findUserById(user: $user) {
      following
      me {
        email
        name
        photo
        user
        username
        verified
      }
    }
  }
`

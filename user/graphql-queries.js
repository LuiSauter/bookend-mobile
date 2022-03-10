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
        verified
      }
    }
  }
`
export const FIND_USER_BY_USER = gql`
  query findUserByUserId($user: String!) {
    findUserById(user: $user) {
      followers
      following
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
        verified
      }
    }
  }
`

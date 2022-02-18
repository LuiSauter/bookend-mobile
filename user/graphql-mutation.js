import { gql } from '@apollo/client'

export const FOLLOW_USER = gql`
  mutation ($user: String!, $email: String!) {
    follow(user: $user, email: $email)
  }
`

export const UNFOLLOW_USER = gql`
  mutation ($user: String!, $email: String!) {
    unFollow(user: $user, email: $email)
  }
`

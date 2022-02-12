import { gql } from '@apollo/client'

export const LIKE_POST = gql`
  mutation likePost($id: String!, $email: String!) {
    likePost(id: $id, email: $email)
  }
`

export const DISLIKE_POST = gql`
  mutation disLikePost($id: String!, $email: String!) {
    disLikePost(id: $id, email: $email)
  }
`

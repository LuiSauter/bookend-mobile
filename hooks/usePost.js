import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_POST } from '../post/graphql-mutations'
import { ALL_POSTS, ALL_POSTS_COUNT, ALL_POST_RANKING } from '../post/graphql-queries'

export const usePost = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [setNewPost] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: ALL_POSTS, variables: { pageSize: 10, skipValue: 0 } },
      { query: ALL_POSTS_COUNT },
      { query: ALL_POST_RANKING, variables: { pageSize: 10, skipValue: 0 } },
    ],
  })

  const addNewPost = ({ title, description, author, bookUrl, image, tags, email }) => {
    setNewPost({
      variables: {
        title: title,
        description: description,
        email: email,
        bookUrl: bookUrl,
        image: image,
        tags: tags,
        author: author,
      },
    })
  }

  const handleDisabled = (value) => setIsDisabled(value)

  return { isDisabled, handleDisabled, addNewPost }
}

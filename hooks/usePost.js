/* eslint-disable no-unused-vars */
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_POST } from '../post/graphql-mutations'

export const usePost = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [setNewPost] = useMutation(ADD_POST)

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

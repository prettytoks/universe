import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import Post from '../post/Post'
import classes from './posts.module.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/post/timeline/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className={classes.container}>
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts
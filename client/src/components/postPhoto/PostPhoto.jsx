import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import postdemoimg from '../../assets/people2.jpg'
import classes from './postPhoto.module.css'

const PostPhoto = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
     className={classes.post}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
     to={`/postDetails/${post._id}`}
    >
      {/*<img src={postdemoimg}/>
      */}
       <img className={classes.postImg} src={post?.photo ? `${process.env.REACT_APP_SERVER_URL}/images/${post?.photo}` : postdemoimg} 
         alt={post?.title}
       />
      {isHovered && <div className={classes.likes}>{post?.likes?.length} likes</div>}
    </Link>
  )
}

export default PostPhoto
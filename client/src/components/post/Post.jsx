import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import woman from '../../assets/woman.jpg'
import { capitalizeFirstLetter } from '../../util/capitalizeFirstLetter'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded } from 'react-icons/bi'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import classes from './post.module.css'
import Comment from '../comment/Comment'
import { bookmarkPost } from '../../redux/authSlice'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'

import { Text } from "@mantine/core"


const Post = ({ post }) => {
  const { token, user } = useSelector((state) => state.auth)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [isCommentEmpty, setIsCommentEmpty] = useState(false)
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id))
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(user?.bookmarkedPosts?.some(bookmarkedPost => bookmarkedPost._id === post._id))
  const [showComment, setShowComment] = useState(false)
  const dispatch = useDispatch()

  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const handleState = (e) => {
    setState(prev => {
     return {...prev, [e.target.name]: e.target.value}
    })
  }

const [showModal, setShowModal] = useState(false)
const [showForm, setShowForm] = useState(false)

const [showCommentModal, setShowCommentModal] = useState(false)
const [showCommentForm, setShowCommentForm] = useState(false)


const [postUpdate, setPostUpdate] = useState([])
const [commentUpdate, setCommentUpdate] = useState([])


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/comment/${post._id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        const data = await res.json()
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [post._id])

  const deletePost = async () => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/post/${post._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: 'DELETE'
      })
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikePost = async () => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/post/toggleLike/${post._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: "PUT"
      })
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handleBookmark = async () => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/user/bookmark/${post._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: "PUT"
      })
      dispatch(bookmarkPost(post))
      setIsBookmarked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePostComment = async () => {
    if (commentText === '') {
      setIsCommentEmpty(true)
      setTimeout(() => {
        setIsCommentEmpty(false)
      }, 2000)
      return
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/comment`, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({ commentText, post: post._id })
      })

      const data = await res.json()

      setComments(prev => [...prev, data])
      setCommentText('')
    } catch (error) {
      console.error(error)
    }
  }


  

  const handleShowForm = () => {
  setShowForm(true)
  setShowModal(false)
}


  const handleUpdatePost = async(e) => {
    e.preventDefault()
    let filename = null
    if(photo){
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append('filename', filename)
      formData.append('image', photo)
      
        await fetch(`${process.env.REACT_APP_SERVER_URL}/upload/image`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: formData
      })
    }
      
  
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/post/updatePost/${post._id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: "PUT",
      body: JSON.stringify({...state, photo: filename})
    })
    
    const data = await res.json()
    setShowForm(false)
    //dispatch(updatePost(data))
    setPostUpdate(data)
    //window.location.reload()
  } catch (error) {
    console.error(error)
  }
}




const handleShowCommentForm = () => {
  setShowCommentForm(true)
  setShowCommentModal(false)
}



const handleUpdateComment = async(e) => {

  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/post/updateComment/${post._id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: "PUT",
    body: JSON.stringify({...state, })
  })

  const data = await res.json()
  setShowForm(false)
  //dispatch(updatePost(data))
  setCommentUpdate(data)
  //window.location.reload()
  } catch (error) {
  console.error(error)
  }
}



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <Link to={`/profileDetail/${post?.user?._id}`} className={classes.topLeft}>
          {/*}
            <img src={woman} className={classes.profileUserImg} />
            */}
             <img 
             src={user?.profileImg ? `${process.env.REACT_APP_SERVER_URL}/images/${user?.profileImg}` : woman} 
             className={classes.profileUserImg} alt={user?.username}  
              />
            
            <div className={classes.profileMetadata}>
              <span>{capitalizeFirstLetter(post.user.username)}</span>
              <span>{format(post.createdAt)}</span>
            </div>
          </Link>
          {
            (user._id === post.user._id) &&
            <HiOutlineDotsVertical size={25} onClick={() => setShowDeleteModal(prev => !prev)} />
          }
          {
            showDeleteModal && (
              <div className={classes.deleteModal}>
                <h3>Delete Post</h3>
                <div className={classes.buttons}>
                  <button onClick={deletePost}>Yes</button>
                  <button onClick={() => setShowDeleteModal(prev => !prev)}>No</button>
                </div>
              </div>
            )
          }
        </div>
        <div className={classes.center}>
        <div className={classes.desc} onClick={() => setShowModal(prev => !prev)}>{post.title} </div>
          <div className={classes.desc}>{post.desc}</div>
          {post?.location && <div className={classes.location}>Location: {post.location}</div>}
          <img className={classes.postImg} src={post?.photo ? `${process.env.REACT_APP_SERVER_URL}/images/${post?.photo}` : woman} alt={post?.title} 
          
          />
           {showModal &&
             <div className={classes.modal}>
               <span onClick={handleShowForm}><Text ml={16}>
                  Update Post</Text>
                </span>
             </div>
           }


        </div>
        <div className={`${classes.controls} ${showComment && classes.showComment}`} onClick={() => setShowCommentModal(prev => !prev)}>
          <div className={classes.controlsLeft}>
            {
              isLiked
                ? <AiFillHeart onClick={handleLikePost} />
                : <AiOutlineHeart onClick={handleLikePost} />
            }
            <BiMessageRounded onClick={() => setShowComment(prev => !prev)} />


          </div>
          <div className={classes.controlsRight} onClick={handleBookmark}>
            {
              isBookmarked
                ? <BsBookmarkFill />
                : <BsBookmark />
            }
          </div>
        </div>
        {
          showComment &&
          <>
            <div className={classes.comments}>
              {
                comments?.length > 0 ? comments.map((comment) => (
                  <>
                  <Comment c={comment} key={comment._id} />               

                  {showCommentModal &&
                   <div className={classes.modal}>
                     <span onClick={handleShowCommentForm}>
                       <Text ml={16}>Update Comment</Text>
                     </span>
                   </div>
                 }
                 </>
                )) : <span style={{ marginLeft: '12px', fontSize: '20px' }}>No comments</span>
              }
            </div>
            <div className={classes.postCommentSection}>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                type="text"
                className={classes.inputSection}
                placeholder='Type comment'
              />
              <button onClick={handlePostComment}>Post</button>
            </div>
            {isCommentEmpty && <span className={classes.emptyCommentMsg}>You can't post empty comment!</span>}


            
          </>
        }







          {
            showForm &&
            <div className={classes.updateProfileForm} onClick={() => setShowForm(false)}>
              <div className={classes.updateProfileWrapper} onClick={(e) => e.stopPropagation()}>
                <h2>Update Post</h2>
                <form onSubmit={handleUpdatePost}>
                  <input type="text" placeholder='Title' name="title" onChange={handleState} />
                  <input type="text" placeholder='Description' name="desc" onChange={handleState} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                    <label htmlFor='photo'>Post Picture <AiOutlineFileImage /></label>
                    <input
                      type="file"
                      id='photo'
                      placeholder='Post picture'
                      style={{ display: 'none' }}
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    {photo && <p>{photo.name}</p>}
                  </div>
                  <button>Update post</button>
                </form>
                <AiOutlineClose onClick={() => setShowForm(false)} className={classes.removeIcon} />
              </div>
            </div>
          }



          
          {
            showCommentForm &&
            <div className={classes.updateProfileForm} onClick={() => setShowCommentForm(false)}>
              <div className={classes.updateProfileWrapper} onClick={(e) => e.stopPropagation()}>
                <h2>Update Comment</h2>
                <form onSubmit={handleUpdateComment}>
                  <input type="text" placeholder='Comment' name="commentText" onChange={handleState} />
                 
                  <button>Update comment</button>
                </form>
                <AiOutlineClose onClick={() => setShowCommentForm(false)} className={classes.removeIcon} />
              </div>
            </div>
          }



      </div>
    </div>
  )
}

export default Post
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { instance } from '../../instance'

import { PostItem } from 'types/Post'

import Loader from '../../components/Loader/Loader'
import Article from '../../components/Article/Article'
import Back from '../../components/Back/Back'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchDeletePost } from '../../services/slices/posts'
import NotFound from '../NotFound/NotFound'

const ArticlePage = () => {
  const [post, setPost] = useState<PostItem>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const onRemoveArticle = async (id: string) => {
    try {
      await dispatch(fetchDeletePost(id))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const { id } = useParams()

  useEffect(() => {
    instance
      .get<PostItem>(`/posts/${id}`)
      .then((res) => {
        setPost(res.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error.response)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <Loader />
  if (error) return <NotFound error={error} />

  return (
    <div className="my-10">
      <div className="mb-5">
        <Back />
      </div>
      <Article
        {...post}
        isEditable={post?.author._id === user?._id}
        onRemoveArticle={onRemoveArticle}
      />
    </div>
  )
}
export default ArticlePage

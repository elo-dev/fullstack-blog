import { useNavigate, useParams } from 'react-router'

import NotFound from '../NotFound/NotFound'

import Loader from '../../components/Loader/Loader'
import Article from '../../components/Article/Article'
import Back from '../../components/Back/Back'
import Comments from '../../components/Comments'

import { useAppSelector } from '../../hooks'

import {
  useDeletePostMutation,
  useGetOnePostQuery,
} from '../../services/query/posts'
import { currentUser } from '../../services/slices/userSlice'

const ArticlePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [deleteArticle, { error }] = useDeletePostMutation()
  const { user } = useAppSelector(currentUser)
  const {
    data: post,
    isLoading,
    error: errorPost,
  } = useGetOnePostQuery(id, { refetchOnMountOrArgChange: true })

  const onDeleteArticle = async (id) => {
    await deleteArticle(id).unwrap()
    navigate('/')
  }

  if (isLoading) return <Loader />
  if (error || errorPost) return <NotFound error={error || errorPost} />

  return (
    <div className="my-10">
      <div className="mb-5">
        <Back />
      </div>
      <Article
        {...post}
        isEditable={post?.author._id === user?._id}
        onRemoveArticle={onDeleteArticle}
      />
      <Comments {...post} user={user} />
    </div>
  )
}
export default ArticlePage

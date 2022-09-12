import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { instance } from '../../instance'

import { PostItem } from 'types/Post'

import Loader from '../../components/Loader/Loader'
import Article from '../../components/Article/Article'
import Back from '../../components/Back/Back'

const ArticlePage = () => {
  const [post, setPost] = useState<PostItem>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    instance
      .get<PostItem>(`/posts/${id}`)
      .then((res) => {
        setPost(res.data)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className="my-10">
      <div className="mb-5">
        <Back />
      </div>
      <Article {...post} />
    </div>
  )
}
export default ArticlePage

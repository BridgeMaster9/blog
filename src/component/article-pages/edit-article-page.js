import ArticleForm from '../article-form'
import { useState } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditArticlePage() {
  const service = useOutletContext()
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { slug } = useParams()
  const navigate = useNavigate()

  const data = useSelector((state) => state.article)

  const submit = ({ title, description, body, tags }) => {
    const token = localStorage.getItem('Token')
    service
      .updateArticle(slug, { article: { title, description, body, tagList: tags } }, token)
      .then((res) => {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
        setTimeout(() => navigate(`/articles/${res.article.slug}`), 2100)
      })
      .catch(() => {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 7000)
      })
  }

  return <ArticleForm title="Edit article" submit={submit} isError={isError} isSuccess={isSuccess} data={data} />
}

export default EditArticlePage

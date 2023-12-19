import ArticleForm from '../article-form'
import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'

function ArticleCreatePage() {
  const service = useOutletContext()
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const submit = ({ title, description, body, tags }) => {
    const token = localStorage.getItem('Token')
    service
      .createArticle({ article: { title, description, body, tagList: tags } }, token)
      .then((data) => {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
        setTimeout(() => navigate(`/articles/${data.article.slug}`), 2100)
      })
      .catch(() => {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 7000)
      })
  }

  return <ArticleForm title="Create new article" submit={submit} isError={isError} isSuccess={isSuccess} />
}

export default ArticleCreatePage

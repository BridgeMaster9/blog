import {useState} from "react";
import {getCookie} from "react-use-cookie";
import {useOutletContext, useNavigate} from 'react-router-dom'
import ArticleForm from "../article-form";

const ArticleCreatePage = () => {
  const service = useOutletContext()
  const [isError, setIsError]=useState(false)
  const [isSuccess, setIsSuccess]=useState(false)
  const navigate = useNavigate()

  const submit = ({ title, description, body, tags })=>{
    const token = getCookie('Token')
    service.createArticle({article: {title, description, body, tagList: tags,}}, token).then((data)=>{
      setIsSuccess(true)
      setTimeout(()=>{setIsSuccess(false)}, 2000)
      setTimeout(()=>navigate(`/articles/${data.article.slug}`), 2100)
    }).catch((e)=>{
      setIsError(true)
      setTimeout(()=>{setIsError(false)}, 7000)
    })
  }


  return(
    <ArticleForm title="Create new article" submit={submit} isError={isError} isSuccess={isSuccess}/>
  )
}

export default ArticleCreatePage
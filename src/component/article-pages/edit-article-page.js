import {useState} from "react";
import {getCookie} from "react-use-cookie";
import ArticleForm from "../article-form";
import {useParams, useOutletContext} from "react-router-dom";
import {useSelector} from "react-redux";

const EditArticlePage = () => {
  const service = useOutletContext()
  const [isError, setIsError]=useState(false)
  const [isSuccess, setIsSuccess]=useState(false)
  const {slug} = useParams()

  const data = useSelector(state=>state.article)

  const submit = ({ title, description, body, tags })=>{
    const token = getCookie('Token')
    service.updateArticle(slug, {article: {title, description, body, tagList: tags}}, token)
      .then(()=>{
      setIsSuccess(true)
      setTimeout(()=>{setIsSuccess(false)}, 7000)
    }).catch(()=>{
      setIsError(true)
      setTimeout(()=>{setIsError(false)}, 7000)
    })
  }


  return(
    <ArticleForm title="Edit article" submit={submit} isError={isError} isSuccess={isSuccess} data={data}/>
  )
}

export default EditArticlePage
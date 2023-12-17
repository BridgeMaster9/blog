import styles from './article-page.module.css'
import {useParams, useOutletContext} from "react-router-dom";
import ArticleItem from "../article-item";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setArticle} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {getCookie} from "react-use-cookie";
import Markdown from 'markdown-to-jsx'
import {Spin} from 'antd'
import {setLoading} from "../../redux/actions";

const ArticlePage = ()=>{
  const {slug} = useParams()
  const dispatch = useDispatch()
  const service = useOutletContext()
  const [isError, setIsError] = useState(false)
  const loading = useSelector(state=>state.mode.loading)

  useEffect(()=>{
    dispatch(setLoading(true))
    const token = getCookie('Token')
    service.getArticle(slug,token)
      .then((res)=>{
        dispatch(setLoading(false))
        dispatch(setArticle(res.article))
      })
      .catch(()=>{
        dispatch(setLoading(false))
        setIsError(true)
        setTimeout(()=>setIsError(false), 7000)
      })
  }, [])

  const article = useSelector(state=>state.article)

  const content = loading || !article?<Spin className={styles.spin} size="large"/>:
    (
      <div className={styles.article}>
        {isError?<div className={styles.error +' '+styles['error-alert']}>Invalid login or password</div>:null}
        <div className={styles.top}>
          <ArticleItem data={article} slug={slug}/>
          {isError?<div className={styles.error +' '+styles['error-alert']}>Invalid login or password</div>:null}
        </div>
        <div className={styles['main-text']}>
          <Markdown>{article.body}</Markdown>
        </div>
      </div>
    )

  return content
}

export default ArticlePage
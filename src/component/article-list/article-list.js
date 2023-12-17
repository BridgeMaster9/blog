import {useEffect, useState} from 'react'
import styles from './article-list.module.css'
import {  Pagination  } from 'antd'
import ArticleItem from '../article-item'
import {setArticles} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Spin} from 'antd'
import {setLoading} from "../../redux/actions";
import {getCookie} from "react-use-cookie";
import {useOutletContext} from 'react-router-dom'


const ArticleList = ()=>{
  const [pageNumber, setPageNumber] = useState(1)
  const articlesData = useSelector(state=>state.articles)
  const loading = useSelector(state=>state.mode.loading)
  const dispatch = useDispatch()
  const service = useOutletContext()


  const onChange = (page)=>{
    setPageNumber(page)
  }

  useEffect(()=>{
    const token = getCookie('Token')
    dispatch(setLoading(true))
    service.getArticles((pageNumber-1)*10, token).then((res)=>{
      dispatch(setArticles(res.articles))
    })
    dispatch(setLoading(false))
  }, [pageNumber])

  const content = loading?(
    <Spin className={styles.spin} size="large"/>
  ):(
    <ul className={styles.list}>
      {articlesData.map((elem, index)=>{
        return(
          <li key={`${elem.title} + ${index}`}>
            <div className={styles.post}>
              <ArticleItem data={elem} slug={elem.slug}/>
            </div>
          </li>
        )})}
      <Pagination className={styles.pagination} current={pageNumber} size="small" total={100} onChange={onChange} showSizeChanger={false}/>
    </ul>
  )

  return content
}

export default ArticleList
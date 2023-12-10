import {useEffect, useState, useRef} from 'react'
import styles from './article-list.module.css'
import {  Pagination  } from 'antd'
import ArticleItem from '../article-item'
import SeviceRealworld from '../../services/service-realworld'
import {setArticles} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";


const ArticleList = ()=>{
  const [pageNumber, setPageNumber] = useState(1)
  const articlesData = useSelector(state=>state.articles)
  const dispatch = useDispatch()
  const serviceRef = useRef(0)
  const service = new SeviceRealworld()

  serviceRef.current = service

  const onChange = (page)=>{
    setPageNumber(page)
  }

  useEffect(()=>{
    service.getArticles((pageNumber-1)*10).then((res)=>{
      dispatch(setArticles(res.articles))
    })
  }, [pageNumber])

  const items = articlesData.map((elem, index)=>{
    console.log(elem)
    return(
      <li key={`${elem.title} + ${index}`}>
        <Link className={styles.post} to={elem.slug}><ArticleItem data={elem}/></Link>
      </li>
    )
  })

  return (
    <ul className={styles.list}>
      {items}
      <Pagination className={styles.pagination} current={pageNumber} size="small" total={100} onChange={onChange} showSizeChanger={false}/>
    </ul>
  )
}

export default ArticleList
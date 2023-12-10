import styles from './article-page.module.css'
import {useParams} from "react-router-dom";
import ArticleItem from "../article-item";
import {useSelector} from "react-redux";
import Markdown from 'markdown-to-jsx'

const ArticlePage = ()=>{
  console.log('Render page')
  const {slug} = useParams()
  const dataList = useSelector(state=>state.articles)
  const dataItem = dataList.find((item)=>item.slug === slug)
  console.log(dataItem)
  return(
    <div className={styles.article}>
      <div className={styles.top}>
        <ArticleItem data={dataItem}/>
      </div>
      <div className={styles['main-text']}>
        <Markdown>{dataItem.body}</Markdown>
      </div>
    </div>
  )
}

export default ArticlePage
import styles from './article-item.module.css'
import React from 'react'
import {shortText} from "../../function/short-text";
import {modDate} from '../../function/modDate'
import Tags from '../tags'


const ArticleItem = (props)=>{
  const {title, description, author, updatedAt, favoritesCount, tagList} = props.data
  return (
    <>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.title}>{shortText(title, 'title')}</div>
          <button className={styles.likes} type="button">{favoritesCount}</button>
        </div>
        <Tags data={tagList}/>
        <div className={styles.description}>
          <p>{shortText(description, 'description')}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.author}>
          <div className={styles.name}>{author.username}</div>
          <div className={styles.date}>{modDate(updatedAt)}</div>
        </div>
        <div className={styles.avatar}>
          <img src={author.image} alt="avatar"/>
        </div>
      </div>
    </>
  )
}

export default ArticleItem
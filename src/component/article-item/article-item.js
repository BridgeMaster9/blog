import styles from './article-item.module.css'
import defAvatar from './images/avatar.png'
import { shortText } from '../../function/short-text'
import { modDate } from '../../function/modDate'
import Tags from '../tags'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { Popconfirm } from 'antd'
import { getCookie } from 'react-use-cookie'

function ArticleItem({ data: articleData, slug }) {
  const login = useSelector((state) => state.mode.login)
  const service = useOutletContext()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [data, setData] = useState(articleData)
  const slugParam = useParams().slug

  const confirm = () => {
    const token = getCookie('Token')
    service
      .deleteArticle(slug, token)
      .then(() => {
        alert('the article has been deleted')
      })
      .catch(() => {
        alert('the article has not been deleted')
      })
    navigate('/')
  }

  const onLikeClick = () => {
    const token = getCookie('Token')
    if (token) {
      if (data.favorited) {
        service
          .removeFavorite(slug, token)
          .then((res) => {
            setData(res.article)
          })
          .catch(() => console.log('лайк не удален'))
      } else {
        service
          .addFavorite(slug, token)
          .then((res) => {
            setData(res.article)
          })
          .catch(() => console.log('лайк не поставлен'))
      }
    }
  }
  const likesStyle = data.favorited ? styles['likes-ok'] : styles['likes-off']

  return (
    <>
      <div className={styles.left}>
        <div className={styles.header}>
          <Link to={`/articles/${slug}`}>
            <div className={styles.title}>{shortText(data.title, 'title')}</div>
          </Link>
          <button className={`${styles.likes} ${likesStyle}`} type="button" onClick={onLikeClick}>
            {data.favoritesCount}
          </button>
        </div>
        <Tags data={data.tagList} />
        <div className={styles.description}>
          <p>{shortText(data.description, 'description')}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.author}>
          <div className={styles.param}>
            <div className={styles.name}>{data.author.username}</div>
            <div className={styles.date}>{modDate(data.updatedAt)}</div>
          </div>
          <div className={styles.avatar}>
            <img src={data.author.image || defAvatar} alt="avatar" />
          </div>
        </div>
        {login && slug === slugParam && data.author.username === user.username ? (
          <div className={styles.buttons}>
            <Popconfirm
              placement="right"
              title="Delete the task"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
              description="Are you sure to delete this task?"
            >
              <button className={`${styles.btn} ${styles['btn-delete']}`} type="button">
                Delete
              </button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
              <button className={`${styles.btn} ${styles['btn-create']}`} type="button">
                Edit
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ArticleItem

import styles from './tags.module.css'

function Tags(props) {
  if (!props.data.length) {
    return (
      <div className={styles.tags}>
        <div className={styles.tag}>No tags</div>
      </div>
    )
  }

  const elements = props.data.map((elem) => {
    if (elem)
      return (
        <div className={styles.tag} key={Math.random()}>
          {elem}
        </div>
      )
    return null
  })

  return <div className={styles.tags}>{elements}</div>
}

export default Tags

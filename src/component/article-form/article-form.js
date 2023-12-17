import styles from "./article-form.module.css"
import {useForm, useFieldArray} from 'react-hook-form'
import {useEffect} from "react";


const ArticleForm = ({title, submit, data, isError, isSuccess}) => {
  const {register, handleSubmit,control,formState: {errors}} = useForm({mode: 'onBlur'})
  const {fields, append, remove} = useFieldArray({control, name: 'tags'})

  const addTag = (value = " ") => {
    append(value)
  }
  const deleteTag = (index) => {
    remove(index)
  }

  useEffect(() => {
    if(data?.tagList)
      data?.tagList.map((item)=>{
        append(item)
      })
    append('')
  }, [])


  const tagList = fields.map((field, index) => (
    <div className={styles['list-item']} key={field.id}>
      <label>
        {errors?.tags && <div className={styles.error}>{errors?.tags?.[`${index}`]?.message}</div>}
        <input {...register(`tags.${index}`,
          {
            required: 'Tags is required field',
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message:
                'You can use only english letters and digits without spaces and other symbols',
            },
          })}
               type="text" id="title" placeholder="Tag" control={control} className={styles.tag}/>
        <button className={styles.btn+' '+styles.delete} type="button" onClick={() => {deleteTag(index)}}>Delete</button>
      </label>
    </div>
  ))

  return(
    <div className={styles.article}>
      <form onSubmit={handleSubmit(submit)}>
        <div className={styles.header}>
          <div>{title}</div>
          {isSuccess?<div className={styles.success}></div>:null}
        </div>

        {isError?<div className={styles.error +' '+styles['error-alert']}>something happened wrong, try again</div>:null}
        <div className={styles.part}>
          <label htmlFor="title">Title</label>
          <input {...register('title',
            {
              required: 'Title is required field',
            })}
                 id="title" placeholder="Title" defaultValue={data?.title}/>
          {errors.title && <div className={styles.error}>{errors.title.message}</div>}
        </div>
        <div className={styles.part}>
          <label htmlFor="description">Short description</label>
          <input {...register('description',
            {
              required: 'Description is required field',
            })}
                 id="description" placeholder="description" defaultValue={data?.description}/>
          {errors.description && <div className={styles.error}>{errors.description.message}</div>}
        </div>
        <div className={styles.part}>
          <label htmlFor="text">Text</label>
          <textarea {...register('body',
            {
              required: 'Text is required field',
            })}
                    id="text" placeholder="Text" rows={6} defaultValue={data?.body}/>
          {errors.body && <div className={styles.error}>{errors.body.message}</div>}
        </div>
        <div className={styles.part}>
          <ul className={styles['tag-list']}>
            {tagList}
            <button className={styles.btn+' '+styles['add-btn']} type="button" onClick={() => {addTag()}}>Add tag</button>
          </ul>
        </div>
        <button className={styles.btn + ' ' + styles['send-btn']} type="submit" >Send</button>
      </form>
    </div>
  )
}

export default ArticleForm
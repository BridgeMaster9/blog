import styles from './profile-pages.module.css'
import { setUser } from '../../redux/actions'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function EditProfile() {
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch()
  const service = useOutletContext()
  const currentUser = useSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser.username,
      email: currentUser.email,
      image: currentUser.image,
    },
  })

  const onSubmit = ({ username, email, image }) => {
    const token = localStorage.getItem('Token')
    service
      .updateUser(
        {
          user: {
            email,
            username,
            bio: '',
            image,
            password: currentUser.password,
          },
        },
        token
      )
      .then((data) => {
        dispatch(
          setUser({
            username: data.user.username,
            email: data.user.email,
            image: data.user.image,
          })
        )
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
      })
      .catch(() => {
        setIsError(true)
        setTimeout(() => setIsError(false), 7000)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['sign-up']}>
        <div className={styles.header}>
          <div>Edit Profile</div>
          {isSuccess ? <div className={styles.success} /> : null}
        </div>
        {isError ? (
          <div className={`${styles.error} ${styles['error-alert']}`}>This username or password is busy</div>
        ) : null}
        <div className={styles.part}>
          <label htmlFor="username">Username</label>
          <input
            {...register('username', {
              required: 'Username is required field',
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
              minLength: {
                value: 3,
                message: 'username must be between 3 and 20 characters (inclusive)',
              },
              maxLength: {
                value: 20,
                message: 'username must be between 3 and 20 characters (inclusive)',
              },
            })}
            id="username"
            placeholder="Username"
          />
          {errors.username && <div className={styles.error}>{errors.username.message}</div>}
        </div>
        <div className={styles.data}>
          <div className={styles.part}>
            <label htmlFor="email">Email address</label>
            <input
              {...register('email', {
                required: 'Email is required field',
                pattern: {
                  value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                  message: 'Email must be a valid email',
                },
              })}
              id="email"
              placeholder="Email address"
              name="email"
            />
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
          </div>
          <div className={styles.part}>
            <label htmlFor="password">New password</label>
            <input
              {...register('password', {
                required: 'Password is required field',
                minLength: {
                  value: 6,
                  message: 'password must be between 6 and 40 characters (inclusive)',
                },
                maxLength: {
                  value: 40,
                  message: 'password must be between 6 and 40 characters (inclusive)',
                },
              })}
              id="password"
              placeholder="Password"
              type="password"
            />
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
          </div>
          <div className={styles.part}>
            <label htmlFor="avatar">Avatar image (url)</label>
            <input
              {...register('avatar', {
                required: 'avatar is required field',
                pattern: {
                  value: /\.(?:png|gif|jpeg?)$/,
                  message: 'avatar image must be a valid url',
                },
              })}
              id="avatar"
              placeholder="Avatar image"
            />
            {errors.avatar && <div className={styles.error}>{errors.avatar.message}</div>}
          </div>
        </div>
        <button className={styles.btn} type="submit">
          {' '}
          Save{' '}
        </button>
      </div>
    </form>
  )
}

export default EditProfile

import styles from './profile-pages.module.css'
import { setUser, setLogin, setLoading } from '../../redux/actions'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCookie } from 'react-use-cookie'
import { useState } from 'react'
import { Link, useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { Spin } from 'antd'

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const service = useOutletContext()
  const dispatch = useDispatch()
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const loading = useSelector((state) => state.mode.loading)
  const navigate = useNavigate()
  const location = useLocation()

  const fromPage = location.state?.from?.pathname || '/'

  const onSubmit = ({ email, password }) => {
    dispatch(setLoading(true))
    service
      .loginUser({
        user: {
          email,
          password,
        },
      })
      .then((data) => {
        dispatch(setLoading(false))
        setCookie('Token', data.user.token, { secure: true })
        dispatch(setLogin(true))
        dispatch(
          setUser({
            username: data.user.username,
            email: data.user.email,
            image: data.user.image,
          })
        )
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 2000)
        setTimeout(() => navigate(fromPage), 2200)
      })
      .catch(() => {
        dispatch(setLoading(false))
        setIsError(true)
        setTimeout(() => setIsError(false), 7000)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['sign-up']}>
        <div className={styles.header}>
          <div>Sign In</div>
          {isSuccess ? <div className={styles.success} /> : null}
          {loading ? <Spin className={styles.spin} size="large" /> : null}
        </div>
        {isError ? <div className={`${styles.error} ${styles['error-alert']}`}>Invalid login or password</div> : null}
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
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: 'Password is required field',
              })}
              id="password"
              placeholder="Password"
              type="password"
            />
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
          </div>
        </div>
        <button className={styles.btn} type="submit">
          {' '}
          Login{' '}
        </button>
        <div className={styles.question}>
          <p>
            Already have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default SignIn

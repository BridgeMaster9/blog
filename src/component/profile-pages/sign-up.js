import styles from './profile-pages.module.css'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import {setUser, setAuth, setLogin} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { setCookie } from 'react-use-cookie';
import {Link, useOutletContext, useNavigate} from 'react-router-dom'
import {Spin} from 'antd'
import {setLoading} from "../../redux/actions";

const SignUp = ()=>{
  const {register,watch, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onBlur'})
  const [isError, setIsError ] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const service = useOutletContext()
  const loading = useSelector(state=>state.mode.loading)

  const onSubmit = ({username, email, password}) =>{
    dispatch(setLoading(true))
    service.registerNewUser({
      user:{
        username,
        email,
        password
      }
    }).then((data)=>{
      dispatch(setLoading(false))
      setCookie('Token', data.user.token, { secure: true })
      dispatch(setAuth(true))
      dispatch(setUser({
        username: data.user.username,
        email: data.user.email,
        image: null
      }))
      setIsSuccess(true)
      dispatch(setLogin(true))
      setTimeout(()=>setIsSuccess(false), 2000)
      setTimeout(()=>navigate('/'),2100)
    }).catch(()=>{
      dispatch(setLoading(false))
      setIsError(true)
      setTimeout(()=>setIsError(false), 5000)
    })
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["sign-up"]}>
        <div className={styles.header}>
          <div>Create new account</div>
          {isSuccess?<div className={styles.success}></div>:null}
          {loading?<Spin className={styles.spin} size="large"/>:null}
        </div>
        <div className={styles.data}>
          <div className={styles.part}>
            <label htmlFor="username">Username</label>
            <input {...register('username',
                   {
                     required: 'Username is required field',
                     pattern: {
                       value: /^[a-z][a-z0-9]*$/,
                       message: 'You can only use lowercase English letters and numbers',
                     },
                     minLength: {
                       value: 3,
                       message: 'username must be between 3 and 20 characters (inclusive)'
                     },
                     maxLength: {
                       value: 20,
                       message: 'username must be between 3 and 20 characters (inclusive)'
                     }
                   })}
                   id="username" placeholder="Username" />
            {errors.name && <div className={styles.error}>{errors.name.message}</div>}
            {isError && <div className={styles.error}>'username is already in use'</div>}
          </div>
          <div className={styles.part}>
            <label htmlFor="email">Email address</label>
            <input {...register('email',{
                     required: 'Email is required field',
                     pattern: {
                       value: /([a-z]+[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                       message: 'Email must be a valid email'
                     }
                   })}
                   id="email" placeholder="Email address" name="email"/>
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
          </div>
          <div className={styles.part}>
            <label htmlFor="password">Password</label>
            <input {...register('password',
              {
                required: 'Password is required field',
                minLength: {
                  value: 6,
                  message: 'password must be between 6 and 40 characters (inclusive)'
                },
                maxLength: {
                  value: 40,
                  message: 'password must be between 6 and 40 characters (inclusive)'
                }
              })}
                   id="password" placeholder="Password" type="password"/>
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
          </div>
          <div className={styles.part}>
            <label htmlFor="repeat-password">Repeat Password</label>
            <input {...register('repeatPassword',
              {
                required: 'Password is required field',
                validate: (value)=>{
                  if(watch("password") !== value){
                    return 'Passwords must match'
                  }
                }
              })} id="repeat-password" type="password" placeholder="Password"/>
            {errors.repeatPassword && <div className={styles.error}>{errors.repeatPassword.message}</div>}
          </div>
        </div>
        <div className={styles['private-text']}>
          <input {...register('agree',
            {
              required: true,
            })}
            type="checkbox" name="agree" id="agree"/>
          <label htmlFor="agree">I agree to the processing of my personal
            information</label>
        </div>
        <button className={styles['btn']} type="submit" disabled={!isValid}> Create </button>
        <div className={styles.question}>
          <p>Already have an account? <Link to={'/signin'}>Sign In</Link></p>
        </div>
      </div>
    </form>
  )
}

export default SignUp

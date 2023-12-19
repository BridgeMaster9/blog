import './App.css'

import ArticleList from '../article-list'
import ArticlePage from '../article-page'
import Layout from '../layout'
import SignUp from '../profile-pages/sign-up'
import SignIn from '../profile-pages/sign-in'
import EditProfile from '../profile-pages/edit-profile'
import ArticleCreatePage from '../article-pages/article-create-page'
import EditArticlePage from '../article-pages/edit-article-page'
import RequireAuth from '../HOC/RequireAuth'
import ServiceRealworld from '../../services/service-realworld'
import { setLogin, setUser } from '../../redux/actions'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const service = new ServiceRealworld()

  useEffect(() => {
    const token = localStorage.getItem('Token')
    if (token) {
      service.getCurrentUser(token).then((data) => {
        dispatch(setLogin(true))
        dispatch(
          setUser({
            username: data.user.username,
            email: data.user.email,
            image: data.user.image,
          })
        )
      })
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/articles" />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
          <Route
            path="new-article"
            element={
              <RequireAuth>
                <ArticleCreatePage />
              </RequireAuth>
            }
          />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

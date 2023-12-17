import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";

import ArticleList from '../article-list'
import ArticlePage from "../article-page";
import Layout from "../layout";
import SignUp from "../profile-pages/sign-up";
import SignIn from "../profile-pages/sign-in";
import EditProfile from "../profile-pages/edit-profile";
import ArticleCreatePage from '../article-pages/article-create-page'
import EditArticlePage from '../article-pages/edit-article-page'
import RequireAuth from '../HOC/RequireAuth'



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Layout/>}>
          <Route index element={<Navigate to='/articles'/>}/>
          <Route path='articles' element={<ArticleList/>}/>
          <Route path='articles/:slug' element={<ArticlePage/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path='profile' element={<EditProfile/>}/>
          <Route path='new-article' element={
            <RequireAuth>
              <ArticleCreatePage/>
            </RequireAuth>
          }/>
          <Route path='articles/:slug/edit' element={<EditArticlePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

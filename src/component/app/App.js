import './App.css';

import {useEffect} from "react";
import SeviceRealworld from '../../services/service-realworld'
import {useDispatch} from "react-redux";
import {setTags} from '../../redux/actions'
import {Routes, Route} from "react-router-dom";

import ArticleList from '../article-list'
import ArticlePage from "../article-page";
import Layout from "../layout";


function App() {
  const service = new SeviceRealworld()
  const dispatch = useDispatch()

  useEffect(() => {
    service.getTags().then((res)=>{
      dispatch(setTags(res.tags))
    })
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Layout/>}>
          <Route index element={<ArticleList/>}/>
          <Route path='/articles' element={<ArticleList/>}/>
          <Route path='/articles/:slug' element={<ArticlePage/>}/>
          <Route path='/:slug' element={<ArticlePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetail from './pages/PostDetail';
import PostPostForm from './components/postForms/postPostForm';


function App() {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<RegisterPage/>}></Route>
        <Route path="/post/:id/" element={<PostDetail/>}></Route>
        <Route path='/createPost/' element={<PostPostForm/>}></Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

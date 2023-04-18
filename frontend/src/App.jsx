import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Feed from './components/Feed'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import SoloTweet from './components/SoloTweet'

function App() {
	 

  return (
    <Router>
      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route element={<PrivateRoute/>}>
            <Route index element={<Feed/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
            <Route path=':username' element={<UserProfile/>}/>
            <Route path='/tweet/:id' element={<SoloTweet/>}/>
          </Route>
        </Route>

        <Route path='auth'>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>

      </Routes>
    </Router>
  )
}

export default App


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tweets from "./components/Tweets"
import LoginPage from './components/LoginPage'
import Feed from './components/Feed'
import Layout from './components/Layout'

function App() {

  return (
  <Router>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Feed/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/tweets' element={<Tweets/>}/>
      </Route>
    </Routes>
  </Router>
  )
}

export default App

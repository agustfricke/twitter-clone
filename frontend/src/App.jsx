import LoginPage from "./api/components/LoginPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tweets from "./api/components/Tweets"

function App() {

  return (
  <Router>
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/tweets' element={<Tweets/>}/>
    </Routes>
  </Router>
  )
}

export default App

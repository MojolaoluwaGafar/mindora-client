import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aiChat" element={<ChatPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

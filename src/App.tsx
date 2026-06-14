import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import Error404 from './Pages/Error404';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/talkToMindora" element={<ChatPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

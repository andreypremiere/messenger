import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmationCodePage from './pages/ConfirmationCodePage/ConfirmationCodePage';
import { ChatProvider } from './utils/ChatContext/ChatContext';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/confirm" element={<ConfirmationCodePage />} />
                <Route path="/main" element={
                    <ChatProvider>
                        <MainPage />
                    </ChatProvider>
                    } />
            </Routes>
        </Router>
    );
}

export default App;

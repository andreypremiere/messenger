import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmationCodePage from './pages/ConfirmationCodePage/ConfirmationCodePage';

function App() {
    return (
        // Страница регистрации и входа
        // <LoginPage/>

        // Подтверждение кода
        // <ConfirmationCodePage></ConfirmationCodePage>

        // Главная страница с чатами
        // <MainPage></MainPage>

        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/confirm" element={<ConfirmationCodePage />} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default App;

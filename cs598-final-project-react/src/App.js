import React, {useState} from 'react';
import Header from './components/Header';

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const handleLogin = (userId) => {
        setLoggedIn(true);
        localStorage.setItem('userId', userId);
    }
    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('userId');
    }
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin}  handleLogout={handleLogout}/>
        </div>
    )
};

export default App;

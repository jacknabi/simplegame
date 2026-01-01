import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Configure axios default
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    // If we had a verify route, we'd use it. For now, we trust the token or add a /me route.
                    // Let's assume the backend has /api/user to get current user info.
                    const res = await axios.get('http://localhost:5001/api/user');
                    setUser(res.data);
                } catch (err) {
                    console.error(err);
                    logout();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [token]);

    const login = async (username, password) => {
        const res = await axios.post('http://localhost:5001/api/login', { username, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser({ username: res.data.username, highScore: res.data.highScore });
        axios.defaults.headers.common['Authorization'] = res.data.token;
    };

    const register = async (username, password) => {
        await axios.post('http://localhost:5001/api/register', { username, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateScore = (newHighScore) => {
        if (user) {
            setUser(prev => ({ ...prev, highScore: newHighScore }));
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateScore }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

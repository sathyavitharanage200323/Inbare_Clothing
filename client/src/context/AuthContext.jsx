import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (stored && token) {
            setUser(JSON.parse(stored));
            api.get('/auth/me')
                .then((res) => {
                    setUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    async function login(email, password) {
        const res = await api.post('/auth/login', { email, password });
        const { token, user: userData } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return res.data;
    }

    async function register(firstName, lastName, email, password) {
        const res = await api.post('/auth/register', { firstName, lastName, email, password });
        const { token, user: userData } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return res.data;
    }

    async function logout() {
        await api.post('/auth/logout').catch(() => {});
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    async function updateProfile(data) {
        const res = await api.put('/auth/profile', data);
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

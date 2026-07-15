import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchCartRef = useRef(null);

    function setFetchCart(fn) {
        fetchCartRef.current = fn;
    }

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
            api.get('/auth/me')
                .then((res) => {
                    setUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                })
                .catch(() => {
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
        const { user: userData } = res.data;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        fetchCartRef.current?.();
        return res.data;
    }

    async function register(firstName, lastName, email, password) {
        const res = await api.post('/auth/register', { firstName, lastName, email, password });
        const { user: userData } = res.data;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        fetchCartRef.current?.();
        return res.data;
    }

    async function logout() {
        await api.post('/auth/logout').catch(() => {});
        localStorage.removeItem('user');
        setUser(null);
    }

    async function updateProfile(data) {
        const res = await api.put('/auth/profile', data);
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    }

    async function forgotPassword(email) {
        const res = await api.post('/auth/forgot-password', { email });
        return res.data;
    }

    async function resetPassword(token, password) {
        const res = await api.put(`/auth/reset-password/${token}`, { password });
        return res.data;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, setFetchCart, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

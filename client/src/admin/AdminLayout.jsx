import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Package, Tags, ShoppingCart, Users,
    Star, Heart, Settings, LogOut, Menu, X, ChevronLeft
} from 'lucide-react';
import './AdminLayout.css';

const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/categories', icon: Tags, label: 'Categories' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/reviews', icon: Star, label: 'Reviews' },
    { to: '/admin/wishlists', icon: Heart, label: 'Wishlists' },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    return (
        <div className="admin-layout">
            {/* Mobile overlay */}
            {mobileOpen && <div className="admin-overlay" onClick={() => setMobileOpen(false)} />}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
                <div className="admin-sidebar-header">
                    {!collapsed && <h2 className="admin-logo">INBARE</h2>}
                    <span className="admin-badge">Admin</span>
                    <button className="admin-collapse-btn desktop-only" onClick={() => setCollapsed(!collapsed)}>
                        <ChevronLeft size={18} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                    </button>
                    <button className="admin-collapse-btn mobile-only" onClick={() => setMobileOpen(false)}>
                        <X size={18} />
                    </button>
                </div>

                <nav className="admin-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={20} />
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <NavLink to="/" className="admin-nav-item">
                        <Settings size={20} />
                        {!collapsed && <span>Back to Store</span>}
                    </NavLink>
                    <button className="admin-nav-item logout" onClick={handleLogout} title={collapsed ? 'Sign Out' : undefined}>
                        <LogOut size={20} />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
                <header className="admin-topbar">
                    <button className="admin-hamburger mobile-only" onClick={() => setMobileOpen(true)}>
                        <Menu size={22} />
                    </button>
                    <div className="admin-topbar-right">
                        <div className="admin-user-info">
                            <span className="admin-user-name">{user?.firstName} {user?.lastName}</span>
                            <span className="admin-user-role">{user?.role}</span>
                        </div>
                    </div>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

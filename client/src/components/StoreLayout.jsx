import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';

export default function StoreLayout() {
    return (
        <>
            <Navbar />
            <CartDrawer />
            <Outlet />
            <Footer />
        </>
    );
}

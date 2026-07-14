import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="not-found__link">Back to Home</Link>
        </div>
    );
}

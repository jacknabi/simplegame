import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-game-card p-4 shadow-lg border-b border-gray-800">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-game-accent neon-text uppercase tracking-widest">
                    NeonClicker
                </Link>

                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-game-text font-mono">Player: <span className="text-white font-bold">{user.username}</span></span>
                            <span className="text-game-text font-mono">High Score: <span className="text-game-secondary font-bold">{user.highScore}</span></span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold uppercase text-sm transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-game-text hover:text-game-accent transition-colors">Login</Link>
                            <Link to="/signup" className="bg-game-accent hover:bg-cyan-400 text-black px-4 py-2 rounded font-bold uppercase text-sm transition-colors">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

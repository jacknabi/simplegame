import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username might be taken.');
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-game-card p-8 rounded-lg shadow-2xl border border-gray-800 w-full max-w-md neon-border">
                <h2 className="text-3xl font-bold mb-6 text-center text-white uppercase tracking-wider">Sign Up</h2>
                {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full bg-game-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-game-secondary transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-game-dark border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-game-secondary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-game-secondary hover:bg-magenta-400 text-white font-bold py-3 rounded uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)]"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

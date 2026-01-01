import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Game = () => {
    const { user, updateScore } = useAuth();
    const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
    const [score, setScore] = useState(0);
    const scoreRef = useRef(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [target, setTarget] = useState({ top: '50%', left: '50%' });
    const containerRef = useRef(null);

    useEffect(() => {
        let timer;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    const startGame = () => {
        setScore(0);
        scoreRef.current = 0;
        setTimeLeft(30);
        setGameState('playing');
        moveTarget();
    };

    const moveTarget = () => {
        if (containerRef.current) {
            // -50 to keep it fully inside (assuming 50px size)
            const maxTop = containerRef.current.clientHeight - 60;
            const maxLeft = containerRef.current.clientWidth - 60;
            const newTop = Math.floor(Math.random() * maxTop);
            const newLeft = Math.floor(Math.random() * maxLeft);
            setTarget({ top: `${newTop}px`, left: `${newLeft}px` });
        }
    };

    const handleClickTarget = () => {
        if (gameState !== 'playing') return;
        setScore((s) => s + 1);
        scoreRef.current += 1;
        moveTarget();
        // Play sound?
    };

    const endGame = async () => {
        setGameState('gameover');
        // Save score
        try {
            const currentScore = scoreRef.current; // capture current score from ref
            // Only save if it's a high score? Backend handles that logic usually, but let's just send it.
            // Backend logic: "if (score > user.highScore)"
            const res = await axios.post('http://localhost:5001/api/score', { score: currentScore });

            if (res.data.highScore > user.highScore) {
                updateScore(res.data.highScore); // Update local context
            }
            console.log(res.data.message);
        } catch (err) {
            console.error("Failed to save score", err);
        }
    };

    return (
        <div className="h-[80vh] flex flex-col items-center justify-center">

            {gameState === 'menu' && (
                <div className="text-center animate-pulse">
                    <h1 className="text-6xl font-black mb-8 neon-text italic transform -skew-x-12">NEON RUSH</h1>
                    <p className="text-xl mb-8 text-gray-400">Hit as many targets as you can in 30 seconds!</p>
                    <button
                        onClick={startGame}
                        className="bg-game-accent hover:bg-cyan-400 text-black text-2xl font-bold py-4 px-12 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,235,0.5)] hover:shadow-[0_0_40px_rgba(0,255,235,0.7)] transition-all transform hover:scale-105"
                    >
                        Start Game
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="w-full h-full max-w-4xl relative bg-game-card/50 rounded-xl border-2 border-game-accent/30 overflow-hidden shadow-2xl" ref={containerRef}>
                    <div className="absolute top-4 left-4 text-2xl font-mono text-white">Score: <span className="text-game-accent">{score}</span></div>
                    <div className="absolute top-4 right-4 text-2xl font-mono text-white">Time: <span className="text-red-500">{timeLeft}s</span></div>

                    <div
                        className="absolute w-12 h-12 bg-game-secondary rounded-full cursor-crosshair shadow-[0_0_15px_#ff00ff] hover:scale-95 active:scale-90 transition-transform"
                        style={{ top: target.top, left: target.left }}
                        onMouseDown={handleClickTarget}
                    >
                        <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
                    </div>
                </div>
            )}

            {gameState === 'gameover' && (
                <div className="text-center bg-game-card p-10 rounded-2xl border-4 border-game-secondary shadow-[0_0_50px_rgba(255,0,255,0.2)]">
                    <h2 className="text-5xl font-bold mb-4 text-white uppercase">Game Over</h2>
                    <p className="text-3xl mb-8 font-mono">Final Score: <span className="text-game-secondary">{score}</span></p>
                    <button
                        onClick={startGame}
                        className="bg-game-accent hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded uppercase tracking-widest transition-colors mr-4"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;

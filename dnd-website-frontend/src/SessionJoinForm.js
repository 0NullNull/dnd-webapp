import React, { useState } from 'react';
import axios from 'axios';

const SessionJoinForm = () => {
    const [sessionId, setSessionId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const handleJoinSession = async () => {
        try {
            const response = await axios.post('http://localhost:3000/session/join', {
                sessionId,
                playerName
            });
            console.log('Joined session:', response.data.sessionId);
            // Handle further actions after joining session
        } catch (error) {
            console.error('Error joining session:', error);
        }
    };

    return (
        <div>
            <h2>Join Session</h2>
            <input type="text" placeholder="Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
            <input type="text" placeholder="Your Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button onClick={handleJoinSession}>Join Session</button>
        </div>
    );
};

export default SessionJoinForm;
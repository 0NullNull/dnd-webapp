import React, { useState } from 'react';
import axios from 'axios';

const SessionCreateForm = () => {
    const [sessionId, setSessionId] = useState('');

    const handleCreateSession = async () => {
        try {
            const response = await axios.post('http://localhost:3000/session/create');
            setSessionId(response.data.sessionId);
            console.log('Session created:', response.data.sessionId);
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    return (
        <div>
            <h2>Create Session</h2>
            <button onClick={handleCreateSession}>Create Session</button>
            {sessionId && <p>Session ID: {sessionId}</p>}
        </div>
    );
};

export default SessionCreateForm;
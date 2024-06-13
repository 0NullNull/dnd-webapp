const express = require('express');
const router = express.Router();

// Temporary storage for sessions (replace with database later)
let sessions = [];

// POST /session/create - Create a new session
router.post('/create', (req, res) => {
    // Implementation for session creation
    // Retrieve session details from request body
    const { sessionName } = req.body;

    // Example implementation:
    const sessionId = Math.random().toString(36).substring(7);

    // Logic to store session details (replace with actual storage mechanism)
    // For demonstration, storing in-memory using a simple array
    sessions.push({
        id: sessionId,
        name: sessionName,
        characters: []
    });

    console.log(`Created new session with ID: ${sessionId}`);
    res.json({ id: sessionId, name: sessionName, characters: [] });
});

router.post('/join', (req, res) => {
    const { sessionId, playerName } = req.body;

    // Find the session by ID
    const session = sessions.find(s => s.id === sessionId);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    // Add player to session (for simplicity, just storing player name)
    session.characters.push({ name: playerName });

    console.log(`Player ${playerName} joined session ${sessionId}`);
    res.json({ id: sessionId, playerName });
});

// GET /session/:id - Get session details by ID
router.get('/:id', (req, res) => {
    const sessionId = req.params.id;

    // Find session by ID
    const session = sessions.find(sess => sess.id === sessionId);

    // Logging for debugging purposes
    console.log(`Looking for session with ID: ${sessionId}`);
    console.log('Sessions in memory:', sessions);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
});

// PUT /session/addCharacter/:id - Add character to session
router.put('/addCharacter/:id', (req, res) => {
    const sessionId = parseInt(req.params.id);
    const { characterId } = req.body;

    // Find session by ID
    const session = sessions.find(sess => sess.id === sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    // Add character to session
    session.characters.push(characterId);

    res.json({ message: 'Character added to session', session });
});

// DELETE /session/removeCharacter/:id - Remove character from session
router.delete('/removeCharacter/:id', (req, res) => {
    const sessionId = parseInt(req.params.id);
    const { characterId } = req.body;

    // Find session by ID
    const session = sessions.find(sess => sess.id === sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    // Remove character from session
    session.characters = session.characters.filter(id => id !== characterId);

    res.json({ message: 'Character removed from session', session });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const CharacterSchema = require('../models/character'); // Import CharacterSchema

// Temporary storage for characters (replace with database later)
let characters = [];

// Create a new character
router.post('/create', (req, res) => {
    const newCharacter = req.body;
    // Validate newCharacter against CharacterSchema if needed
    characters.push(newCharacter);
    console.log('Created new character:', newCharacter);
    res.json(newCharacter); // Return created character
});

// Get character by ID
router.get('/:id', (req, res) => {
    const characterId = req.params.id;
    const character = characters.find(char => char.id === characterId);
    if (!character) {
        return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
});

// Update character by ID
router.put('/:id', (req, res) => {
    const characterId = req.params.id;
    const updatedCharacter = req.body;
    // Validate updatedCharacter against CharacterSchema if needed
    characters = characters.map(char => {
        if (char.id === characterId) {
            return { ...char, ...updatedCharacter };
        }
        return char;
    });
    console.log('Updated character:', updatedCharacter);
    res.json(updatedCharacter);
});

router.put('/equip/:id', (req, res) => {
    const characterId = req.params.id;
    const { itemId } = req.body;

    // Find the character by ID
    const character = characters.find(char => char.id === characterId);
    if (!character) {
        return res.status(404).json({ error: 'Character not found' });
    }

    // Find the item in character's inventory
    const itemToEquip = character.inventory.find(item => item.id === itemId);
    if (!itemToEquip) {
        return res.status(404).json({ error: 'Item not found in inventory' });
    }

    // Move the item from inventory to equipment
    character.equipment.push({
        item: itemToEquip.item,
        tags: itemToEquip.tags, // Copy tags from inventory
        equipped: true
    });

    // Remove item from inventory (optional, depending on your game logic)
    character.inventory = character.inventory.filter(item => item.id !== itemId);

    // Update character data (e.g., save to database if applicable)
    // characters.save(); // Example database operation

    res.json({ message: 'Item equipped successfully', character });
});

router.put('/unequip/:id', (req, res) => {
    const characterId = req.params.id;
    const { itemId } = req.body;

    // Find the character by ID
    const character = characters.find(char => char.id === characterId);
    if (!character) {
        return res.status(404).json({ error: 'Character not found' });
    }

    // Find the item in character's equipment
    const itemToUnequip = character.equipment.find(item => item.id === itemId);
    if (!itemToUnequip) {
        return res.status(404).json({ error: 'Item not found in equipment' });
    }

    character.inventory.push({
        id: itemToUnequip.id,
        item: itemToUnequip.item,
        tags: itemToUnequip.tags
    });
    character.equipment = character.equipment.filter(item => item.id !== itemId);

    // Update character data (e.g., save to database if applicable)
    // characters.save(); // Example database operation

    res.json({ message: 'Item unequipped successfully', character });
});

module.exports = router;
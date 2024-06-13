const CharacterSchema = {
    name: String,
    race: String,
    class: String,
    attributes: {
        strength: { type: Number, default: 10 },
        dexterity: { type: Number, default: 10 },
        constitution: { type: Number, default: 10 },
        intelligence: { type: Number, default: 10 },
        wisdom: { type: Number, default: 10 },
        charisma: { type: Number, default: 10 }
    },
    abilities: [String],
    equipment: [{             // Unique identifier for the item
        item: String,            // Name or type of the item
        tags: [String],          // Tags like "two-handed", "one-handed", etc.
        equipped: Boolean        // Indicates if the item is currently equipped
    }],
    inventory: [{           // Unique identifier for the item
        item: String,            // Name or type of the item
        tags: [String]           // Tags like "consumable", "weapon", etc.
    }],
    background: String,
    personalityTraits: {
        ideals: String,
        bonds: String,
        flaws: String
    }
};

module.exports = CharacterSchema;
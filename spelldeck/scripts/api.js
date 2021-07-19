const apiRoot = 'https://www.dnd5eapi.co/api';

async function getClasses() {
    try {
        const result = await fetch(`${apiRoot}/classes`);
        return await result.json();
    } catch (err) {
        throw new Error(`Error fetching list of character classes: ${err.message}`);
    }
}


async function getSpellsByLevel(level) {
    try {
        const result = await fetch(`${apiRoot}/spells?level=${level}`);
        return await result.json();
    } catch (err) {
        throw new Error(`Error fetching list of ${school} spells for level ${level}: ${err.message}`);
    }
}

async function getSpellsByClass(className) {
    try {
        const result = await fetch(`${apiRoot}/classes/${className}/spells`);
        return await result.json();
    } catch (err) {
        throw new Error(`Error fetching list of ${school} spells for level ${level}: ${err.message}`);
    }
}

async function searchSpells(className, level) {
    const spellsByLevel = await getSpellsByLevel(level);
    const spellsByclass = await getSpellsByClass(className);

    const spells = [];
    for (let byLevel of spellsByLevel.results) {
        for (let byClass of spellsByclass.results) {
            if (byClass.name == byLevel.name) {
                spells.push(byLevel);
                break;
            }
        }

    }

    return spells;
}

async function getSpellInfo(index) {
    try {
        const result = await fetch(`${apiRoot}/spells/${index}`);
        return await result.json();
    } catch (err) {
        throw new Error(`Error fetching info for spell ${index}: ${err.message}`);
    }
}
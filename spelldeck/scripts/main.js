window.addEventListener('load', main);

let statusDiv;
let classNameSelect;
let levelSelect;
let searchButton;
let resultsDiv;
let spellbookDiv;
let SpellbookTitle;
let modalHeader;
let modalContent;

function setStatus(statusText) {    
    if (statusText) {
        statusDiv.className = 'visible';
        statusDiv.textContent = statusText;
    } else {
        statusDiv.className = 'hidden';
    }
}

async function showDetails(spellInfo) {
    const details = await getSpellInfo(spellInfo.index);

    modalHeader.textContent = details.name;
    modalContent.textContent = "";
    for(const text of details.desc) {
        const p = document.createElement('p');
        p.textContent = text;
        modalContent.appendChild(p);
    }
    toggle();
}

async function onSearch() {
    resultsDiv.textContent = "";
    // detailsDiv.textContent = "";
    setStatus("Checking the library");
    
    try {
        const className = classNameSelect.value;
        const level = spellLevel.value;

        const spells = await searchSpells(className, level);

        setStatus("");

        if (!spells.length) {
            setStatus(`There are no level ${level} ${className.toLowerCase()} spells.`);
            return;
        }
        createCardHeadline();
        SpellbookTitle.textContent = `My ${className}'s spellbook`;
        
        function createCardHeadline() {
            cardHeadline = document.createElement('h2')
            cardHeadline.textContent = `${spells.length} level ${level} ${className} spells found`; 
            resultsDiv.appendChild(cardHeadline);
        }

        spells.forEach(result => {
            const spellDiv = document.createElement('div');
            spellDiv.id = result.index;
            spellDiv.classList.add("basicCard");
            resultsDiv.appendChild(spellDiv);

            const spellh3 = document.createElement("h3");
            spellh3.textContent = result.name;
            spellDiv.appendChild(spellh3);

            const cardImg = document.createElement("img");
            cardImg.setAttribute("src", "images/dragon-cropped.jpg");   //Photo by Photo by Jonathan Kemper on Unsplash
            spellDiv.appendChild(cardImg);

            const cardBtn = document.createElement("p");
            const btnText = "Read details";
            cardBtn.textContent = btnText;
            cardBtn.classList.add("button");
            cardBtn.addEventListener('click', () => showDetails(result));
            spellDiv.appendChild(cardBtn);

            const toSpellbookBtn = document.createElement("p");
            const toSpellbookBtnText = "Add to my spellbook";
            toSpellbookBtn.textContent = toSpellbookBtnText;
            toSpellbookBtn.classList.add("button");
            toSpellbookBtn.addEventListener('click', () => toSpellbook(result));
            spellDiv.appendChild(toSpellbookBtn);
        });
    } catch (err) {
        setStatus(err.message);
    }
}

function removeSpell(spellDivId) {
    const removeSpellBtn = document.getElementById(spellDivId);
    removeSpellBtn.remove();
}

function toSpellbook(result) {
    const id = `${result.index}Spell`
    if (document.getElementById(id)) {
        return
    }
    
    const spellDiv = document.createElement('div');
    spellDiv.id = id;
    spellDiv.classList.add("basicCard");
    spellbookDiv.appendChild(spellDiv);

    const spellh3 = document.createElement("h3");
    spellh3.textContent = result.name;
    spellDiv.appendChild(spellh3);
    
    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", "images/dragon-cropped.jpg");   //Photo by Photo by Jonathan Kemper on Unsplash
    spellDiv.appendChild(cardImg);

    const cardBtn = document.createElement("p");
    const btnText = "Read details";
    cardBtn.textContent = btnText;
    cardBtn.classList.add("button");
    cardBtn.addEventListener('click', () => showDetails(result));
    spellDiv.appendChild(cardBtn);
    
    const removeCardBtn = document.createElement("p");
    const removeCardText = "Remove from spellbook";
    removeCardBtn.textContent = removeCardText;
    removeCardBtn.classList.add("button");
    removeCardBtn.addEventListener('click', () => removeSpell(spellDivID));
    spellDiv.appendChild(removeCardBtn);
    const spellDivID = spellDiv.id;
}

async function main() {
    classNameSelect = document.getElementById('className');
    spellLevel = document.getElementById('spellLevel');
    searchButton = document.getElementById('searchButton');
    statusDiv = document.getElementById('status');
    resultsDiv = document.getElementById('results');
    spellbookDiv = document.getElementById("spellbook");
    SpellbookTitle = document.getElementById("spellbookTitle");
    modalHeader = document.querySelector(".modal-header");
    modalContent = document.querySelector(".modal-content");

    searchButton.addEventListener('click', onSearch);

    setStatus("Loading...");

    try {
        const classList = await getClasses();
        // populateClassList(classList);

        // const spells = await postQuerySpells();

        classNameSelect.disabled = false;
        spellLevel.disabled = false;
        searchButton.disabled = false;

        setStatus("");
    } catch (err) {
        setStatus(err.message);
    }
}
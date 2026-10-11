

function createCharacter(charName, catName = null, initialSkills) { // this function creates a character object with the specified name, optional cat name, and initial skills

    function getSkillValue(skill) { // this function retrieves the skill value from initialSkills array or returns 0 if not provided
        if (initialSkills && initialSkills.length === 3) { // Check if initialSkills is provided and has the correct length
            const skillIndex = {
                fishingSkill: 0,
                miningSkill: 1,
                farmingSkill: 2
            };
            const value = Number(initialSkills[skillIndex[skill]]);
            return Math.max(0, Math.min(value, 10)); // Ensure skill does not exceed 10
        }
        return 0; // Default skill value if initialSkills is not provided
    }

    const characterName = charName;
    const fishingSkill = getSkillValue('fishingSkill');
    const miningSkill = getSkillValue('miningSkill');
    const farmingSkill = getSkillValue('farmingSkill');


    function levelUp(skill) { // this function increments the specified skill by 1, up to a maximum of 10
        if (skill === 'fishingSkill' && fishingSkill < 10) {
            fishingSkill++;
        } else if (skill === 'miningSkill' && miningSkill < 10) {
            miningSkill++;
        } else if (skill === 'farmingSkill' && farmingSkill < 10) {
            farmingSkill++;
        }

    }

   function grabItems(...items) { // takes a list of item names and adds them to the inventory
    this.inventory.push(...items);

    }

   function dropItem(item) { //take a single item name and remove the first instance of item from the character's 
        inventory
    const index = this.inventory.indexOf(item);
    if (index !== -1) {
        this.inventory.splice(index, 1);

    }
    }

    let character = {     
        characterName, //comes from charName directly
        fishingSkill, //comes from initialSkills as described
        miningSkill, //comes from initialSkills as described
        farmingSkill, //comes from initialSkills as described
        inventory: [],
        levelUp, 
        grabItems,
        dropItem

    };

    if (catName !== null) {  // Check if catName is not null
        character.catName = catName;
    }
    return character;                   
}

function describeCharacter(character) {
//calculate total skill level
    let total = character.fishingSkill + character.miningSkill + character.farmingSkill;

    //set description to the characterName property of character
    let description = character.characterName;

    if (total < 10) {
        description += " is just starting out";
    } else {
        description += " is a skilled adventurer";
    }

    if ("catName" in character) { // Check if catName is a property of character
        description += ` and has a cat ${character.catName}`;
    }

    description += ".";

    console.log(description);

    //Leave this for the autograder!
    return description;                 
}

// A few examples are shown below of the calling the function k
let player = createCharacter("New Player", null)
player.levelUp("farmingSkill")
console.log(player.farmingSkill) //should print 1
player.grabItems("Apple", "Peach") 
player.dropItem("Peach")
console.log(...player.inventory) //should print Apple
describeCharacter(player) //should print "New Player is just starting out."
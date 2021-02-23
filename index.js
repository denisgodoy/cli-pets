const inquirer = require('inquirer');
const { v4 } = require('uuid');
const {start, register, search} = require('./questions');
const fs = require('fs');
const {results} = require('./pets.json');

// Object Constructor

function Pet(id, name, animal, breed, tutor){
    this.id = id,
    this.name = name,
    this.animal = animal,
    this.breed = breed,
    this.tutor = tutor
};

// Functions

function createFile(object) {
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
            if (err) throw err;
        
            let petObj = JSON.parse(data);
            petObj.results.push(object);
                        
            fs.writeFile('./pets.json', JSON.stringify(petObj, null, 2), 'utf-8', err => {
                if (err) throw err;
                console.log('Successfully registered a new pet!');
            });
    });
};

function find(query){
    for(let pet in results){
        let {name} = results[pet];

        if(query == name){
            console.table(results[pet]);
        };
    };
};

function removeDuplicates(array) {
    let setArray = new Set(array);
    let noDuplicates = setArray.values();
    return Array.from(noDuplicates);
};

// Prompts

inquirer.prompt(start).then(answers => {
    switch(answers.options){
        case 0:
            inquirer.prompt(register).then(answers => {
                const newPet = new Pet(v4(), answers.name_pet.toLowerCase(), answers.animal.toLowerCase(), answers.breed.toLowerCase(), answers.user.toLowerCase());
                
                createFile(newPet);
            });
            break;

        case 1:
            let petsList = [];
            for(let pet in results){
                let {name} = results[pet];
                petsList.push(`${name.charAt(0).toUpperCase() + name.slice(1)}`);
            };

            inquirer.prompt([
                {
                type: 'list',
                name: 'list_pets',
                message: 'Search pet by list of names',
                choices: removeDuplicates(petsList)
                }
            ]).then(answers => {
                let searchList = answers.list_pets.toLowerCase();
                find(searchList);
            });
            break;

        case 2:
            inquirer.prompt(search).then(answers => {
                let searchName = answers.search_pet.toLowerCase();
                find(searchName);
            });
            break;
        };
    }
);

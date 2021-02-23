![node.js](https://img.shields.io/badge/node.js-3C873A) ![javascript](https://img.shields.io/badge/javascript-f7df1e)

# cli-pets :computer:
#### Command Line Interface to register and lookup for pets with Inquirer prompts.

- [Setting up](https://github.com/denisgodoy/cli-pets#setting-up)
- [Object Constructor](https://github.com/denisgodoy/cli-pets#object-constructor)
- [Prompting the user](https://github.com/denisgodoy/cli-pets#prompting-the-user)
- [Secondary functions](https://github.com/denisgodoy/cli-pets#secondary-functions)
- [Write and read JSON](https://github.com/denisgodoy/cli-pets#write-and-read-json)
- [Running CLI](https://github.com/denisgodoy/cli-pets#running-cli)


## Setting up
Installing all necessaries libraries and importing them into ```index.js```.
```
npm i inquirer
      uuid
```

```javascript
const inquirer = require('inquirer');
```

Creating Inquirer ```questions.js``` to prompt the user all questions.

```javascript
const start = [
    {
        type: 'list',
        name: 'options',
        message: 'Hello, what would you like to do?',
        choices: [
            {
                name: 'Register a new pet',
                value: 0
            },
            {
                name: 'List existing pets',
                value: 1
            },
            {
                name: 'Search pet by name',
                value: 2
            }
        ] 
    }
];
```

After all questions have been registered with Inquirer's format, export all modules.

```javascript
module.exports = {start, register, search};
```

Create a ```pets.json``` that receives a ```results"``` property.


```json
{
  "results": []
}
```

Then import into ```index.js```.

```javascript
const {start, register, search} = require('./questions');
const {results} = require('./pets.json');
```

## Object Constructor 

Using JavaScript's Object Constructor method to create a new pet from user's input.

```javascript
function Pet(id, name, animal, breed, tutor){
    this.id = id,
    this.name = name,
    this.animal = animal,
    this.breed = breed,
    this.tutor = tutor
};
```

## Prompting the user

Accessing ```prompt``` method, returning imported questions. 

```
inquirer.prompt('question').then('answers => { }');
```

Showing ```start``` questions and accessing user's input inside a ```switch case```. 

* If input ```value = 0```, then create a new pet and write it to the JSON file.

```javascript
inquirer.prompt(start).then(answers => {
    switch(answers.options){
        case 0:
            inquirer.prompt(register).then(answers => {
                const newPet = new Pet(v4(), answers.name_pet.toLowerCase(), answers.animal.toLowerCase(), answers.breed.toLowerCase(), answers.user.toLowerCase());
                
                createFile(newPet);
            });
            break;
```

* If input ```value = 1```, destructuring JSON to retrieve data and show on list.


```javascript
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
```

* If input ```value = 2```, return ```find()```.


```javascript
        case 2:
            inquirer.prompt(search).then(answers => {
                let searchName = answers.search_pet.toLowerCase();
                find(searchName);
            });
            break;
        };
    }
);
```

## Secondary functions
Some functions are required to populate objects' properties and receive user's input.

* ```find()``` to return search query.

```javascript
function find(query){
    for(let pet in results){
        let {name} = results[pet];

        if(query == name){
            console.table(results[pet]);
        };
    };
};
```

* ```removeDuplicates()``` to ensure no repeated names are shown on the list.


```javascript
function removeDuplicates(array) {
    let setArray = new Set(array);
    let noDuplicates = setArray.values();
    return Array.from(noDuplicates);
};
```

## Write and read JSON

Importing Node's File System.

```javascript
const fs = require('fs');
```
A function to read the existing JSON file and register new pets.
File System's method read and ```parse``` data, ```push``` the new object into the array and write a new file.

```javascript
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
```

## Running CLI
Run ```node index.js``` from terminal command.

![CLI-PETS](https://user-images.githubusercontent.com/56933400/108890915-e46ccf80-75ec-11eb-86da-bae4781f18b1.png)
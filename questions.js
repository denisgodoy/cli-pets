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

const register = [
    {
        type: 'input',
        name: 'user',
        message: 'What is your name?'
    },
    {
        type: 'input',
        name: 'name_pet',
        message: 'What is your pet name?'
    },
    {
        type: 'list',
        name: 'animal',
        message: "This pet is a:",
        choices: [
            {
                name: 'Dog',
                value: 'dog'
            },
            {
                name: 'Cat',
                value: 'cat'
            },
            {
                name: 'Other',
                value: 'other'
            },
        ]
    },
    {
        type: 'input',
        name: 'breed',
        message: 'What breed? (Or animal if Other)'
    }
];

const search = [
    {
        type: 'input',
        name: 'search_pet',
        message: 'Type the name you would like to find:'
    }
];

module.exports = {start, register, search};
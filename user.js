const uuid = require('uuid');
const fs = require('fs');


const numUsers = 2000;

const countries = ['India', 'Australia', 'Europe', 'America'];
const genders = ['male', 'female'];
const browsers = ['Chrome', 'Edge'];

const users = [];

for (let i = 0; i < numUsers; i++) {
  const user = {
    distinct_id: uuid.v4(),
    country: countries[Math.floor(Math.random() * countries.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    browser: browsers[Math.floor(Math.random() * browsers.length)],
  };
  users.push(user);
}

fs.writeFile('person4.json', JSON.stringify(users, null, 2), (err) => {
  if (err) {
    console.error('Error writing user details to file:', err);
  } else {
    console.log(`Successfully saved ${numUsers} user details to person.json`);
  }
});
const axios = require('axios');
const fs = require('fs');

const apiKey = 'phc_laVD3EFCGBc95FIudwgMobmsYwVtQiG4oSye0rTvxgS';
const apiUrl = 'https://app.posthog.com/batch';
// Read user details from the "person.json" file
const userData = JSON.parse(fs.readFileSync('person2.json', 'utf8'));

const totalEvents = 2500;
const events = [];

const generateRandomTimestamp = () => {
  // Set the start date to August 1, 2023
  const startDate = new Date('2023-08-01');
  const currentDate = new Date(); // Current date
  const monthDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + currentDate.getMonth() - startDate.getMonth();
  
  // Randomly select a month within the range
  const randomMonth = Math.floor(Math.random() * (monthDiff + 1));
  
  // Set the timestamp to a random day within the selected month
  const randomDate = new Date(startDate.getFullYear(), startDate.getMonth() + randomMonth, Math.floor(Math.random() * 30) + 1);
  
  return randomDate.toISOString();
};

// Generate and add "$pageview" events with user details
for (let i = 0; i < totalEvents; i++) {
  const user = userData[i % userData.length]; // Reuse user details cyclically
  const event = {
    event: '$v1',
    properties: {
      distinct_id: user.distinct_id,
      gender: user.gender,
      country: user.country,
      browser: user.browser,
      timestamp: generateRandomTimestamp(),
    },
  };
  events.push(event);
}

// Send the events in a single batch
const sendEvents = async () => {
  const eventData = {
    api_key: apiKey,
    batch: events,
  };

  try {
    await axios.post(apiUrl, eventData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Sent ${totalEvents} "$pageview" events with user details in a single batch.`);
  } catch (error) {
    console.error(`Error sending events: ${error}`);
  }
};

sendEvents();

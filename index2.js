const axios = require('axios');
const fs = require('fs');

const apiKey = 'phc_laVD3EFCGBc95FIudwgMobmsYwVtQiG4oSye0rTvxgS';
const apiUrl = 'https://app.posthog.com/batch';
// Read user details from the "person.json" file
const userData = JSON.parse(fs.readFileSync('person2.json', 'utf8'));

const totalEvents = 10000;
const events = [];

const generateRandomTimestamp = () => {
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  const randomTimestamp = new Date(
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomTimestamp.toISOString();
};

// Generate and add "$pageview" events with user details
for (let i = 0; i < totalEvents; i++) {
  const user = userData[i % userData.length]; // Reuse user details cyclically
  const event = {
    event: '$pageview',
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

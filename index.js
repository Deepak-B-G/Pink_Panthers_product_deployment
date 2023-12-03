const axios = require('axios');
const fs = require('fs');

const apiKey = 'phc_laVD3EFCGBc95FIudwgMobmsYwVtQiG4oSye0rTvxgS';
const apiUrl = 'https://app.posthog.com/batch';
// Read user details from the "person.json" file
const userData = JSON.parse(fs.readFileSync('person4.json', 'utf8'));

const totalEvents = 5000;
const events = [];

const fixedDate = new Date('2023-11-11T12:00:00'); // Updated fixed date and time

// Generate and add "$v1" events with user details
for (let i = 0; i < totalEvents; i++) {
  const user = userData[i % userData.length]; // Reuse user details cyclically
  const event = {
    event: '$Pageview',
    properties: {
      distinct_id: user.distinct_id,
      gender: user.gender,
      country: user.country,
      browser: user.browser
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
    console.log(`Sent ${totalEvents} "$v1" events with user details in a single batch.`);
  } catch (error) {
    console.error(`Error sending events: ${error}`);
  }
};

sendEvents();

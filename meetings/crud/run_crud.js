/**
 *                _
 *  __      _____| |__   _____  __
 *  \ \ /\ / / _ \ '_ \ / _ \ \/ /
 *   \ V  V /  __/ |_) |  __/>  <         @WebexDevs
 *    \_/\_/ \___|_.__/ \___/_/\_\
 *
 * CREATE, READ, UPDATE, and DELETE a meeting in Webex with the REST API in Node
 * https://developer.webex.com/docs/api/v1/meetings/create-a-meeting
 *
 * Step 0: Have a (free) Webex account: https://cart.webex.com/sign-up
 * Step 1: Log in to https://developer.webex.com/login
 * Step 2: Find your bearer token at
 *         https://developer.webex.com/docs/getting-started under "Your
 *         Personal Access Token" in the middle of the page.
 * Step 3: Replace the string on the line that defines const myWebexDeveloperToken,
 *         just below, with your personal bearer (access) token. Hit "save".
 * Step 4: Run this file with node from within
 *         this directory on the command line:
 *
 *         node ./run_crud.js
 *
 * Step 5: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 *
 */

const https = require('https');
const readline = require('readline');

const myWebexDeveloperToken = 'YOUR WEBEX TOKEN';
const hostname = 'webexapis.com';
const meetingsPath = '/v1/meetings';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Helper function that asks a question from stdin
 * @param {String} question
 * @returns {Promise} Resolves with the answer of the question
 */
function askConsole(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Creates a meeting with the given params
 * @param {String} title
 * @param {String} start
 * @param {String} end
 * @returns {Promise} Promise that resolves with the created meeting object
 */
async function createMyMeeting(title, start, end) {
  return new Promise((resolve) => {
    const createBody = JSON.stringify({
      title,
      start,
      end,
    });

    const options = {
      method: 'POST',
      hostname,
      path: meetingsPath,
      port: 443,
      headers: {
        Authorization: `Bearer ${myWebexDeveloperToken}`,
        'Content-Type': 'application/json',
        'Content-Length': createBody.length,
      },
    };

    const createRequest = https.request(options, (createResponse) => {
      let data = '';

      createResponse.on('data', (chunk) => {
        data += chunk;
      });

      createResponse.on('end', () => {
        const myMeeting = JSON.parse(data);

        console.log(`Crud CREATE: The ID of the meeting we've just created is: ${myMeeting.id}`);
        console.log(`Crud CREATE: The Title of the meeting we've just created is: ${myMeeting.title}`);
        resolve(myMeeting);
      });

      createResponse.on('error', (e) => {
        console.error(`Create Response Error: ${e.message}`);
        throw e;
      });
    });

    createRequest.on('error', (e) => {
      console.error(`Create Request Error: ${e.message}`);
      throw e;
    });

    createRequest.write(createBody);

    createRequest.end();
  });
}

/**
 * Gets and Reads an existing meeting given the meeting ID
 * @param {String} meetingId
 * @returns {Promise} Promise that resolves with the meeting object that was read
 */
async function getMyMeeting(meetingId) {
  console.log(`getMyMeeting: ${meetingId}`);

  return new Promise((resolve) => {
    const readOptions = {
      method: 'GET',
      hostname,
      port: 443,
      path: `${meetingsPath}/${meetingId}`,
      headers: {
        Authorization: `Bearer ${myWebexDeveloperToken}`,
      },
    };

    const readRequest = https.request(readOptions, (readResponse) => {
      let data = '';

      readResponse.on('data', (chunk) => {
        data += chunk;
      });

      readResponse.on('end', () => {
        const myMeeting = JSON.parse(data);
        console.log(`cRud READ: This meeting's ID is: ${myMeeting.id}`);
        console.log(`cRud READ: This meeting's title is: ${myMeeting.title}`);
        resolve(myMeeting);
      });

      readResponse.on('error', (e) => {
        console.error(`Error: ${e.message}`);
        throw e;
      });
    });

    readRequest.on('error', (e) => {
      console.error(`Read Request Error: ${e.message}`);
      throw e;
    });

    readRequest.end();
  });
}

/**
 * Updates an existing meeting with a new title
 * @param {String} meeting.id
 * @param {String} meeting.password
 * @param {String} meeting.start
 * @param {String} meeting.end
 * @param {String} title New title of the meeting
 * @returns {Promise} Promise that resolves with the updated meeting object
 */
async function updateMyMeetingTitle({
  id: meetingId, password, start, end,
}, title) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      title,
      password,
      start,
      end,
    });

    const options = {
      method: 'PUT',
      hostname,
      path: `${meetingsPath}/${meetingId}`,
      port: 443,
      headers: {
        Authorization: `Bearer ${myWebexDeveloperToken}`,
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
    };

    const updateRequest = https.request(options, (updateResponse) => {
      let data = '';

      updateResponse.on('data', (chunk) => {
        data += chunk;
      });

      updateResponse.on('end', () => {
        const updatedMeeting = JSON.parse(data);
        console.log(`crUd UPDATE: This meeting's ID is: ${updatedMeeting.id}`);
        console.log(`crUd UPDATE: This meeting's title is: ${updatedMeeting.title}`);
        resolve(updatedMeeting);
      });

      updateResponse.on('error', (e) => {
        console.error(`Error: ${e.message}`);
        throw e;
      });
    });

    updateRequest.on('error', (e) => {
      console.error(e);
      throw e;
    });

    updateRequest.write(body);

    updateRequest.end();
  });
}

/**
 * Deletes a meeting with the given ID
 * @param {String} meetingId
 * @returns {Promise} Promise that resolves with a boolean if meeting was deleted
 */
async function deleteMyMeeting(meetingId) {
  console.log(`deleteMyMeeting: ${meetingId}`);

  return new Promise((resolve) => {
    const options = {
      method: 'DELETE',
      hostname,
      path: `${meetingsPath}/${meetingId}`,
      port: 443,
      headers: {
        Authorization: `Bearer ${myWebexDeveloperToken}`,
        'Content-Type': 'application/json',
      },
    };

    const deleteRequest = https.request(options, (deleteResponse) => {
      deleteResponse.on('error', (e) => {
        console.error(`Error: ${e.message}`);
        throw e;
      });

      console.log(`statusCode: ${deleteResponse.statusCode}`);
      resolve(deleteResponse.statusCode === 204);
    });

    deleteRequest.on('error', (e) => {
      console.error(e);
      throw e;
    });

    deleteRequest.end();
  });
}

/**
 * MAIN
 */
async function main() {
  try {
    console.log('MAIN: Welcome to the CRUD Tool!');
    // Defaulting our meeting to start 24 hours from now
    const myDateStart = new Date(Date.now() + (24000 * 60 * 60)).toISOString(); // 24 Hours from Now
    const myDateEnd   = new Date(Date.now() + (25000 * 60 * 60)).toISOString(); // 25 Hours from Now

    const myOriginalTitle = await askConsole('What is your meeting title? >>>> ');
    const createdMeeting = await createMyMeeting(myOriginalTitle, myDateStart, myDateEnd);
    console.log('MAIN: Your meeting has been created.');

    const fetchedMeeting = await getMyMeeting(createdMeeting.id);
    console.log('MAIN: Your meeting has been read');

    const myUpdatedTitle = await askConsole('What is your new meeting title? >>>> ');
    await updateMyMeetingTitle(fetchedMeeting, myUpdatedTitle);
    console.log('MAIN: Your meeting has been updated.');

    const deleteResult  = await deleteMyMeeting(fetchedMeeting.id);
    console.log(`Delete Meeting Result: ${deleteResult}`);
    console.log('MAIN: Your meeting has been deleted.');

    // Clean Up
    rl.close();
  } catch (error) {
    console.error(error);
  }
} // End async function main

// Calling the main function for async ability
main();

/**
 *                _
 *  __      _____| |__   _____  __
 *  \ \ /\ / / _ \ '_ \ / _ \ \/ /
 *   \ V  V /  __/ |_) |  __/>  <         @WebexDevs
 *    \_/\_/ \___|_.__/ \___/_/\_\
 *
 * DELETE a meeting in Webex with the REST API in Node
 * https://developer.webex.com/docs/api/v1/meetings/delet-a-meeting
 *
 * Step 0: Have a (free) Webex account: https://cart.webex.com/sign-up
 * Step 1: Log in to https://developer.webex.com/login
 * Step 2: Find your bearer token at
 *         https://developer.webex.com/docs/getting-started under "Your
 *         Personal Access Token" in the middle of the page.
 * Step 3: Replace the string on the line that defines const myWebexDeveloperToken,
 *         just below, with your personal bearer (access) token. Hit "save".
 * Step 4: Replace the String on the line that defines let meetingId, just below,
 *         with the meeting ID that is a required unique identifier for the meeting
 *         being deleted.
 * Step 5: Run this file with node from within
 *         this directory on the command line:
 *
 *         node ./delete_meeting.js
 *
 * Step 6: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 *
 *
 */

const https = require('https'); // https://nodejs.org/api/https.html

const myWebexDeveloperToken = 'REPLACE ME WITH YOUR WEBEX DEVELOPER PERSONAL ACCESS TOKEN';
const meetingId = 'REPLACE WITH MEETING ID';

const options = {
  method: 'DELETE',                   // https://en.wikipedia.org/wiki/Representational_state_transfer#Semantics_of_HTTP_methods
  hostname: 'webexapis.com',          // https://developer.webex.com/docs/basics
  path: `/v1/meetings/${meetingId}`,  // https://developer.webex.com/docs/meetings
  port: 443,                          // https://en.wikipedia.org/wiki/HTTPS#Technical
  headers: {
    Authorization: `Bearer ${myWebexDeveloperToken}`, // https://oauth.net/2/bearer-tokens/
    'Content-Type': 'application/json',               // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`); // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

  res.on('error', (e) => {
    console.error(`Error: ${e.message}`); // https://nodejs.org/api/errors.html#errormessage_1
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();

/**
   * Expected Output :
   *
   * The HTTPS request should receive a status code. We expect a 204 (No Content)
   * status code if the action has been enacted and no further information is to be supplied.
   *
   * statusCode: 204
   */

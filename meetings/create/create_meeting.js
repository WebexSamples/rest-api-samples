/**
 *                _
 *  __      _____| |__   _____  __
 *  \ \ /\ / / _ \ '_ \ / _ \ \/ /
 *   \ V  V /  __/ |_) |  __/>  <         @WebexDevs
 *    \_/\_/ \___|_.__/ \___/_/\_\
 *
 * CREATE a meeting in Webex with the REST API in Node
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
 *         node ./create_meeting.js
 *
 * Step 5: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 *
 */

const https = require('https'); // https://nodejs.org/api/https.html

// You can set your WEBEXTOKEN env to your 12-hour token, OR...
const myWebexDeveloperToken = (typeof process.env.WEBEXTOKEN !=='undefined' )
    ? process.env.WEBEXTOKEN // Sets the token from your system's ENV if you've done that, OR...
    : 'REPLACE ME WITH YOUR WEBEX DEVELOPER PERSONAL ACCESS TOKEN'; // ...replace this text with your 12-hour token

const body = JSON.stringify({
  title: 'Book Club Discussion: Curious George', // String, Required | Meeting title. The title can be a maximum of 128 characters long.
  start: '2022-08-12T13:51:43-04:00',            // String, Required | https://en.wikipedia.org/wiki/ISO_8601 format
  end: '2022-08-12T14:38:16-04:00',              // String, Required | Replace the start/end with the times you'd like
});

const options = {
  method: 'POST',            // https://en.wikipedia.org/wiki/Representational_state_transfer#Semantics_of_HTTP_methods
  hostname: 'webexapis.com', // https://developer.webex.com/docs/basics
  path: '/v1/meetings',      // https://developer.webex.com/docs/meetings
  port: 443,                 // https://en.wikipedia.org/wiki/HTTPS#Technical
  headers: {
    Authorization: `Bearer ${myWebexDeveloperToken}`, // https://oauth.net/2/bearer-tokens/
    'Content-Type': 'application/json',               // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
    'Content-Length': body.length,                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`); // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(data)); // https://nodejs.org/en/knowledge/javascript-conventions/what-is-json/
  });

  res.on('error', (e) => {
    console.error(`Error: ${e.message}`); // https://nodejs.org/api/errors.html#errormessage_1
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(body);

req.end();

/**
 * Expected output:
 *
 * The HTTPS request should receive a status code. We expect a 200.
 *
 * The body of the response is JSON text. We expect a single object
 * containing details of the newly-created meeting. These details
 * should include at least the following fields:
 *
 *  - id
 *  - meetingNumber
 *  - title
 *  - password
 *  - phoneAndVideoSystemPassword
 *  - meetingType
 *  - state
 *  - timezone
 *  - start
 *  - end
 *  - hostUserId
 *  - hostDisplayName
 *  - hostEmail
 *  - hostKey
 *  - siteUrl
 *  - webLink
 *  - sipAddress
 *  - dialInIpAddress
 *  - enabledAutoRecordMeeting
 *  - allowAnyUserToBeCoHost
 *  - allowFirstUserToBeCoHost
 *  - allowAuthenticatedDevices
 *  - enabledJoinBeforeHost
 *  - joinBeforeHostMinutes
 *  - enableConnectAudioBeforeHost
 *  - excludePassword
 *  - publicMeeting
 *  - enableAutomaticLock
 *  - telephony
 *    - accessCode
 *    - callInNumbers
 *    - links
 *
 * An example of the response JSON may be found
 * in this directory: ./example_response.json
 *
 */

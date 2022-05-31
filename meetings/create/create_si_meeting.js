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
 * Step 3: Replace the string on the line that defines const myWebexDeveloperToken
 *         and interpreterAry values for an interpreter object,
 *         just below, with your personal bearer (access) token. Hit "save".
 * Step 4: Run this file with node from within
 *         this directory on the command line:
 *
 *         node ./create_si_meeting.js
 *
 * Step 5: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 *
 */

 const https = require('https'); // https://nodejs.org/api/https.html

 const myWebexDeveloperToken = 'REPLACE ME WITH YOUR WEBEX DEVELOPER PERSONAL ACCESS TOKEN';
 //REPLACE languageCode1/2 VARIABLES WITH REQUIRED LANGUAGES, BELOW IS EXAMPLE OF ENGLISH TO SPANSISH AND SPANISH TO ENGLISH
 interpreterAry = [
    {"languageCode1":"en", "languageCode2":"es", "email":"REPLACE WITH INTERPRETER EMAIL", "displayName":"REPLACE WITH INTERPRETER DISPLAY NAME"},
    {"languageCode1":"es", "languageCode2":"en", "email":"REPLACE WITH INTERPRETER EMAIL", "displayName":"REPLACE WITH INTERPRETER DISPLAY NAME"}
  ];
 
 const body = JSON.stringify({
   title: 'WebDev Meeting w/ Simultaneous Interpretation', // String, Required | Meeting title. The title can be a maximum of 128 characters long.
   start: '2022-08-12T13:51:43-04:00',            // String, Required | https://en.wikipedia.org/wiki/ISO_8601 format
   end: '2022-08-12T14:38:16-04:00',              // String, Required | Replace the start/end with the times you'd like
   simultaneousInterpretation: {"enabled":true,"interpreters":interpreterAry}
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
  * statusCode: 200
  * {
  * id: 'd22a9f343201470f8443b0ab01c81855',
  * meetingNumber: '25710538727',
  * title: 'WebDev Meeting w/ Simultaneous Interpretation',
  * password: 'x8YPCFimS73',
  * phoneAndVideoSystemPassword: '98972346',
  * meetingType: 'meetingSeries',
  * state: 'active',
  * timezone: 'UTC',
  * start: '2022-08-12T17:51:00Z',
  * end: '2022-08-12T18:38:00Z',
  * hostUserId: 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS9iMWQ4ZGQ2MC0yZDRjLTQxNmYtYWVkNS03NjQ2NjcxZTIwMzM',
  * hostDisplayName: 'Joe Zanini',
  * hostEmail: 'jozanini@cisco.com',
  * hostKey: '154507',
  * siteUrl: 'cisco.webex.com',
  * webLink: 'https://cisco.webex.com/cisco/j.php?MTID=med3b9c0ae544ea8d015d2df2361ccc52',
  * sipAddress: '25710538727@webex.com',
  * dialInIpAddress: '173.243.2.68',
  * enabledAutoRecordMeeting: false,
  * allowAnyUserToBeCoHost: false,
  * allowFirstUserToBeCoHost: false,
  * allowAuthenticatedDevices: false,
  * enabledJoinBeforeHost: true,
  * joinBeforeHostMinutes: 5,
  * enableConnectAudioBeforeHost: true,
  * excludePassword: false,
  * publicMeeting: false,
  * enableAutomaticLock: false,
  * unlockedMeetingJoinSecurity: 'allowJoin',
  * telephony: {
  *   accessCode: '25710538727',
  *   callInNumbers: [ [Object] ],
  *   links: [ [Object] ]
  * },
  * meetingOptions: {
  * enabledChat: true,
  * enabledVideo: true,
  * enabledPolling: false,
  * enabledNote: true,
  * noteType: 'allowAll',
  * enabledClosedCaptions: false,
  * enabledFileTransfer: true,
  * enabledUCFRichMedia: true
  * },
  * sessionTypeId: 159,
  * scheduledType: 'meeting',
  * simultaneousInterpretation: { enabled: true, interpreters: [ [Object], [Object] ] }
  * }
  */
 
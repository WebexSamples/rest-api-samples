/**
 *                _
 *  __      _____| |__   _____  __
 *  \ \ /\ / / _ \ '_ \ / _ \ \/ /
 *   \ V  V /  __/ |_) |  __/>  <         @WebexDevs
 *    \_/\_/ \___|_.__/ \___/_/\_\
 *
 * READ (get) meeting in Webex with the REST API in Node
 * https://developer.webex.com/docs/api/v1/meetings/get-a-meeting
 *
 * Step 0: Have a (free) Webex account: https://cart.webex.com/sign-up
 * Step 1: Log in to https://developer.webex.com/login
 * Step 2: Find your bearer token at
 *         https://developer.webex.com/docs/getting-started under "Your
 *         Personal Access Token" in the middle of the page.
 * Step 3: Replace the string on the line that defines const myWebexDeveloperToken,
 *         just below, with your personal bearer (access) token. Hit "save".
 * Step 4: Run the sample at https://github.com/Aaron-TheCreator/rest-api-samples/tree/main/meetings/create.
 *         Copy the meeting ID from the "id" property in the response object.
 *         Replace the string on the line that defines const meetingID, 
 *         just below, with your copied meetingID value. Hit "save".
 * Step 5: Run this file with node (https://nodejs.org/en/download/)
 *         from within this directory on the command line:
 *
 *         node ./get_meeting.js
 *
 * Step 6: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 *
 */

const https = require("https"); // https://nodejs.org/api/https.html

const myWebexDeveloperToken = "REPLACE WITH TOKEN";
const meetingID = "REPLACE WITH MEETING ID";

const options = {
	method: "GET",
	hostname: "webexapis.com",
	path: `/v1/meetings/${meetingID}`, // Make sure you set your meetingID above !
	port: 443,
	headers: {
		Authorization: "Bearer " + myWebexDeveloperToken, // Make sure you set your token above!
	},
};

const req = https.request(options, (res) => {
	let data = "";

	res.on("data", (chunk) => {
		data += chunk;
	});

	res.on("end", () => {
		console.log("This meeting's information includes the following: " + data);
	});

	res.on("error", (e) => {
		console.error("Error: " + e.message);
	});
});

req.end();

/**
 * Expected output:
 * 
 * The HTTPS request should receive a status code. We expect a 200.
 * 
 * The body of the response is JSON text. We expect a single object
 * containing details of the meeting with "id" property matching value passed in.
 * These details should include at least the following fields:
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
 * in this directory: ./get_example_response.json
 * 
 */

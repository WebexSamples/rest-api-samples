/**
 *                _
 *  __      _____| |__   _____  __
 *  \ \ /\ / / _ \ '_ \ / _ \ \/ /
 *   \ V  V /  __/ |_) |  __/>  <         @WebexDevs
 *    \_/\_/ \___|_.__/ \___/_/\_\
 *
 * READ (list) meetings in Webex with the REST API in Node
 * https://developer.webex.com/docs/api/v1/meetings/list-meetings
 *
 * Step 0: Have a (free) Webex account: https://cart.webex.com/sign-up
 * Step 1: Log in to https://developer.webex.com/login
 * Step 2: Find your bearer token at
 *         https://developer.webex.com/docs/getting-started under "Your
 *         Personal Access Token" in the middle of the page.
 * Step 3: Replace the string on the line that defines const myWebexDeveloperToken,
 *         just below, with your personal bearer (access) token. Hit "save".
 * Step 4: Run this file with node (https://nodejs.org/en/download/)
 *         from within this directory on the command line:
 *
 *         node ./list_meetings.js
 *
 * Step 5: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 *
 */

const https = require("https") // https://nodejs.org/api/https.html

const myWebexDeveloperToken = "REPLACE WITH TOKEN"
const meetingID = "REPLACE WITH MEETING ID"

const options = {
	method: "GET",
	hostname: "webexapis.com",
	path: `/v1/meetings/${meetingID}`, // Make sure you set your meetingID above !
	port: 443,
	headers: {
		Authorization: "Bearer " + myWebexDeveloperToken, // Make sure you set your token above!
	},
}

const req = https.request(options, (res) => {
	let data = ""

	res.on("data", (chunk) => {
		data += chunk
	})

	res.on("end", () => {
		console.log("This meeting's information includes the following: " + data)
	})

	res.on("error", (e) => {
		console.error("Error: " + e.message)
	})
})

req.end()

/**
 * Expected output:
 *
 *
 *     The title of the first meeting in the list is: My Meeting Title
 *
 *
 * Where "My Meeting Title" represents the title of the first meeting
 * in the list of meetings in your account.
 *
 * To view all of the fields for the first meeting in the list, simply
 * remove the .title from JSON.parse(data).items[0].title above.
 *
 * To see every single field for every single meeting on your account,
 * just strip that further down to: JSON.parse(data)
 *
 * NOTE: If you do not have meetings in your account, check out the code
 *       example in ../create/create_meeting.js and run that. Then come
 *       back here, and you'll have a meeting in your account to retrieve.
 */

# Cisco > Webex > REST API Samples > Meetings: Create

This directory contains sample code demonstrating a JavaScript implementation of a REST client that calls the Meetings API to create a meeting.

## Get a Token

If you don't already have a Webex account, go ahead and [sign up](https://www.webex.com/pricing/free-trial.html)! You'll need an account to use the APIs and SDKs.

When making requests to the Webex REST API, an Authentication HTTP header is used to identify the requesting user. This header must include an access token. This access token may be a personal access token from this site (see below), a Bot token, or an OAuth token from an Integration or Guest Issuer application.

Our interactive API Reference uses your personal access token, which can be used to interact with the Webex API as yourself. This token has a short lifetime—only 12 hours after logging into this site—so it shouldn't be used outside of app development. When using this token, any actions taken through the API will be done as you.

Visit https://developer.webex.com/docs/getting-started and scroll down to "Your Personal Access Token". You'll copy this, paste it into the sample code file you want to run, save, and send it in your REST client requests as a bearer token in the headers.

## Run the code

This sample is JS, intended to be run via Node:

`node ./create_meeting.js`

At the time of writing, we're using the latest LTS release of Node, "Gallium", v16.13.2.


## Don't be a Stranger

- https://developer.webex.com/docs
- https://developer.webex.com/blog
- https://developer.webex.com/support
- @WebexDevs: https://twitter.com/webexdevs

Made with <3 by the Webex Developer Evangelist Team at Cisco

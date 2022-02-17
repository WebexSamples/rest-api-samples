# Webex REST API Samples

The [Webex APIs](https://developer.webex.com/docs/getting-started) provide your applications with direct access to the Cisco Webex Platform, giving you the ability to:

- Create a Webex space and invite people
- Search for people in your company
- Post messages in a Webex space
- Get Webex space history or be notified in real-time when new messages are posted by others
- Execute a command on a Webex RoomOS device
- ...and much more!

## Get a Token

If you don't already have a Webex account, go ahead and [sign up](https://www.webex.com/pricing/free-trial.html)! You'll need an account to use the APIs and SDKs.

When making requests to the Webex REST API, an Authentication HTTP header is used to identify the requesting user. This header must include an access token. This access token may be a personal access token from this site (see below), a Bot token, or an OAuth token from an Integration or Guest Issuer application.

Our interactive API Reference uses your personal access token, which can be used to interact with the Webex API as yourself. This token has a short lifetime—only 12 hours after logging into this site—so it shouldn't be used outside of app development. When using this token, any actions taken through the API will be done as you.

Visit https://developer.webex.com/docs/getting-started and scroll down to "Your Personal Access Token". You'll copy this, paste it into the sample code file you want to run, save, and send it in your REST client requests as a bearer token in the headers.

## Meetings

The [Webex Meetings REST API](https://developer.webex.com/docs/meetings) enables seamless integration of Webex Meetings into your websites, apps, and services. Schedule meetings, invite meeting attendees, update preferences, and more.

### Meetings API CRUD Samples

#### CREATE a Meeting

https://developer.webex.com/docs/api/v1/meetings/create-a-meeting

See sample code in this repo under [./meetings/create/](./meetings/create/)

#### READ a Meeting

https://developer.webex.com/docs/api/v1/meetings/get-a-meeting

See sample code in this repo under [./meetings/read/](./meetings/read/)

#### UPDATE a Meeting

https://developer.webex.com/docs/api/v1/meetings/update-a-meeting

#### DELETE a Meeting

https://developer.webex.com/docs/api/v1/meetings/delete-a-meeting

## Language Reference

### Node

At the time of writing, we're using the latest LTS release of Node.

- https://nodejs.dev/learn/making-http-requests-with-nodejs


## Don't be a Stranger

- https://developer.webex.com/docs
- https://developer.webex.com/blog
- https://developer.webex.com/support
- @WebexDevs: https://twitter.com/webexdevs

Made with <3 by the Webex Developer Evangelism Team at Cisco

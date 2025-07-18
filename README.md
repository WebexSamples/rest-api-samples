# Webex REST API Samples

A comprehensive collection of sample code demonstrating how to use the Webex REST APIs to build powerful collaboration applications. These samples provide practical examples for integrating Webex functionality into your applications using standard HTTP methods.

## 🎯 Overview

The [Webex APIs](https://developer.webex.com/docs/getting-started) provide your applications with direct access to the Cisco Webex Platform, giving you the ability to:

- **Create a Webex space** and invite people
- **Search for people** in your company
- **Post messages** in a Webex space
- **Get Webex space history** or be notified in real-time when new messages are posted by others
- **Execute a command** on a Webex RoomOS device
- **...and much more!**

## 🔑 Get a Token

If you don't already have a Webex account, go ahead and [sign up](https://www.webex.com/pricing/free-trial.html)! You'll need an account to use the APIs and SDKs.

When making requests to the Webex REST API, an Authentication HTTP header is used to identify the requesting user. This header must include an access token. This access token may be a personal access token from this site (see below), a Bot token, or an OAuth token from an Integration or Guest Issuer application.

Our interactive API Reference uses your personal access token, which can be used to interact with the Webex API as yourself. This token has a short lifetime—only 12 hours after logging into this site—so it shouldn't be used outside of app development. When using this token, any actions taken through the API will be done as you.

**To get your personal access token:**

1. Visit https://developer.webex.com/docs/getting-started 
2. Scroll down to "Your Personal Access Token" in the middle of the page
3. Copy the token and paste it into the sample code files
4. Use it as a bearer token in your REST client request headers

## 📊 Meetings

The [Webex Meetings REST API](https://developer.webex.com/docs/meetings) enables seamless integration of Webex Meetings into your websites, apps, and services. Schedule meetings, invite meeting attendees, update preferences, and more.

### Meetings API CRUD Samples

#### CREATE a Meeting

**API Reference**: https://developer.webex.com/docs/api/v1/meetings/create-a-meeting

**Sample Code**: See sample code in this repo under [./meetings/create/](./meetings/create/)

**Features**:
- Create scheduled meetings with title, start/end times
- Support for advanced meeting settings
- Automatic meeting URL and dial-in number generation
- Host key and password assignment

#### READ a Meeting

**API Reference**: https://developer.webex.com/docs/api/v1/meetings/get-a-meeting

**Sample Code**: See sample code in this repo under [./meetings/read/](./meetings/read/)

**Features**:
- List all meetings in your account
- Get detailed information about specific meetings
- Multi-language support (Node.js and PHP implementations)
- Filter meetings by various criteria

#### UPDATE a Meeting

**API Reference**: https://developer.webex.com/docs/api/v1/meetings/update-a-meeting

**Sample Code**: See sample code in this repo under [./meetings/update/](./meetings/update/)

**Features**:
- Modify meeting title, times, and settings
- Update meeting passwords and security options
- Change meeting type and access permissions
- Preserve meeting URLs and dial-in numbers

#### DELETE a Meeting

**API Reference**: https://developer.webex.com/docs/api/v1/meetings/delete-a-meeting

**Sample Code**: See sample code in this repo under [./meetings/delete/](./meetings/delete/)

**Features**:
- Cancel scheduled meetings
- Clean up meeting resources
- Automatic attendee notifications
- Permanent meeting removal

## 📁 Project Structure

```
rest-api-samples/
├── meetings/                    # Webex Meetings API samples
│   ├── README.md               # Meetings-specific documentation
│   ├── create/                 # Create meeting samples
│   │   ├── README.md
│   │   ├── create_meeting.js   # Node.js implementation
│   │   └── example_response.json
│   ├── read/                   # Read meeting samples
│   │   ├── README.md
│   │   ├── list_meetings.js    # List meetings (Node.js)
│   │   ├── get_meeting.js      # Get specific meeting (Node.js)
│   │   ├── list_meetings.php   # List meetings (PHP)
│   │   └── *_response.json     # Example API responses
│   ├── update/                 # Update meeting samples
│   │   ├── README.md
│   │   ├── update_meeting.js   # Node.js implementation
│   │   └── example_response.json
│   ├── delete/                 # Delete meeting samples
│   │   ├── README.md
│   │   └── delete_meeting.js   # Node.js implementation
│   └── crud/                   # Complete CRUD workflow
│       ├── README.md
│       └── run_crud.js         # Interactive CRUD demo
├── package.json                # Node.js project configuration
├── .eslintrc.json             # ESLint configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (Latest LTS version recommended)
- **Webex Developer Account** (free at https://developer.webex.com/)
- **Personal Access Token** or Bot Token
- **Basic knowledge** of REST APIs and HTTP methods

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/WebexSamples/rest-api-samples.git
   cd rest-api-samples
   ```

2. **Choose a sample**:
   ```bash
   cd meetings/create
   ```

3. **Configure your token**:
   - Edit the JavaScript file (e.g., `create_meeting.js`)
   - Replace `REPLACE ME WITH YOUR WEBEX DEVELOPER PERSONAL ACCESS TOKEN`
   - Or set the `WEBEXTOKEN` environment variable

4. **Run the sample**:
   ```bash
   node create_meeting.js
   ```

## 💻 Language Reference

### Node.js

At the time of writing, we're using the latest LTS release of Node.js.

**Key Features**:
- Built-in HTTPS module for secure API calls
- Environment variable support for token management
- Comprehensive error handling
- JSON parsing and manipulation
- Promise-based asynchronous operations

**Resources**:
- [Making HTTP requests with Node.js](https://nodejs.dev/learn/making-http-requests-with-nodejs)
- [Node.js HTTPS Documentation](https://nodejs.org/api/https.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### PHP

Selected samples also include PHP implementations for broader language support.

**Features**:
- Native cURL support for HTTP requests
- JSON handling with built-in functions
- Command-line execution support
- Cross-platform compatibility

**Version**: We're using PHP v8.1.2+ for modern language features.

## 🔧 Code Examples

### Basic API Call Structure

All samples follow this consistent pattern:

```javascript
const https = require('https');

// Token configuration
const myWebexDeveloperToken = process.env.WEBEXTOKEN || 'YOUR_TOKEN_HERE';

// Request configuration
const options = {
  method: 'POST',           // HTTP method
  hostname: 'webexapis.com', // Webex API hostname
  path: '/v1/meetings',     // API endpoint
  port: 443,                // HTTPS port
  headers: {
    'Authorization': `Bearer ${myWebexDeveloperToken}`,
    'Content-Type': 'application/json',
    'Content-Length': body.length
  }
};

// Make the request
const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const result = JSON.parse(data);
    console.log(result);
  });
});

req.write(body);
req.end();
```

### Environment Variable Usage

Set your token as an environment variable:

```bash
# Linux/macOS
export WEBEXTOKEN="your_token_here"

# Windows
set WEBEXTOKEN=your_token_here

# Or use a .env file (not included in samples)
echo "WEBEXTOKEN=your_token_here" > .env
```

### Error Handling

All samples include comprehensive error handling:

```javascript
req.on('error', (e) => {
  console.error(`Request Error: ${e.message}`);
});

res.on('error', (e) => {
  console.error(`Response Error: ${e.message}`);
});
```

## 📊 API Response Examples

### Create Meeting Response

```json
{
  "id": "5f72c9a4-7b2b-4c8d-9e1f-3a4b5c6d7e8f",
  "meetingNumber": "2551234567",
  "title": "Book Club Discussion: Curious George",
  "password": "abc123",
  "meetingType": "meetingSeries",
  "state": "active",
  "timezone": "UTC",
  "start": "2024-01-15T10:00:00Z",
  "end": "2024-01-15T11:00:00Z",
  "hostUserId": "user-id-123",
  "hostDisplayName": "John Smith",
  "hostEmail": "john.smith@example.com",
  "webLink": "https://example.webex.com/meet/meeting-link",
  "telephony": {
    "accessCode": "1234567890",
    "callInNumbers": [
      {
        "label": "United States",
        "callInNumber": "+1-555-123-4567"
      }
    ]
  }
}
```

### List Meetings Response

```json
{
  "items": [
    {
      "id": "meeting-id-1",
      "title": "Daily Standup",
      "start": "2024-01-15T09:00:00Z",
      "end": "2024-01-15T09:30:00Z",
      "webLink": "https://example.webex.com/meet/standup"
    },
    {
      "id": "meeting-id-2", 
      "title": "Sprint Planning",
      "start": "2024-01-15T14:00:00Z",
      "end": "2024-01-15T16:00:00Z",
      "webLink": "https://example.webex.com/meet/sprint"
    }
  ]
}
```

## 🛠️ Development Tools

### Code Quality

The project includes development tools for maintaining code quality:

```json
{
  "scripts": {
    "lint": "npx eslint meetings",
    "lint:fix": "npm run lint -- --fix"
  }
}
```

**ESLint Configuration**:
- Airbnb JavaScript Style Guide
- Import/export validation
- Consistent code formatting
- Error prevention

### Running Code Quality Checks

```bash
# Check for linting issues
npm run lint

# Automatically fix linting issues
npm run lint:fix
```

## 🔐 Security Best Practices

### Token Management

**✅ Do**:
- Use environment variables for tokens
- Implement token rotation for production
- Use appropriate token types (Personal, Bot, OAuth)
- Keep tokens secure and never commit them to version control

**❌ Don't**:
- Hardcode tokens in source code
- Share tokens in public repositories
- Use personal access tokens in production
- Log tokens in application logs

### API Security

**Authentication**:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

**HTTPS Only**:
- All API calls use HTTPS (port 443)
- Certificate validation enabled
- Secure token transmission

## 🧪 Testing

### Interactive CRUD Demo

The most comprehensive sample is the interactive CRUD demo:

```bash
cd meetings/crud
node run_crud.js
```

This sample demonstrates:
1. **CREATE**: Interactive meeting creation with custom titles
2. **READ**: Fetching meeting details by ID
3. **UPDATE**: Modifying meeting properties
4. **DELETE**: Removing meetings

### Sample Output

```
MAIN: Welcome to the CRUD Tool!
What is your meeting title? >>>> Weekly Team Meeting
Crud CREATE: The ID of the meeting we've just created is: abc123
Crud CREATE: The Title of the meeting we've just created is: Weekly Team Meeting
MAIN: Your meeting has been created.
cRud READ: This meeting's ID is: abc123
cRud READ: This meeting's title is: Weekly Team Meeting
MAIN: Your meeting has been read
What is your new meeting title? >>>> Weekly Team Sync
crUd UPDATE: This meeting's ID is: abc123
crUd UPDATE: This meeting's title is: Weekly Team Sync
MAIN: Your meeting has been updated.
Delete Meeting Result: true
MAIN: Your meeting has been deleted.
```

## 📈 Advanced Features

### Meeting Configuration Options

```javascript
const meetingBody = {
  title: 'Advanced Meeting',
  start: '2024-01-15T10:00:00Z',
  end: '2024-01-15T11:00:00Z',
  
  // Advanced options
  enabledAutoRecordMeeting: true,
  allowAnyUserToBeCoHost: false,
  enabledJoinBeforeHost: true,
  joinBeforeHostMinutes: 5,
  excludePassword: false,
  publicMeeting: false,
  enableAutomaticLock: true,
  
  // Telephony settings
  telephony: {
    accessCode: '1234567890',
    callInNumbers: [
      {
        label: 'United States',
        callInNumber: '+1-555-123-4567'
      }
    ]
  }
};
```

### Pagination and Filtering

```javascript
// List meetings with pagination
const options = {
  method: 'GET',
  hostname: 'webexapis.com',
  path: '/v1/meetings?max=10&offset=0',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

// Filter meetings by date range
const filteredPath = '/v1/meetings?from=2024-01-01T00:00:00Z&to=2024-01-31T23:59:59Z';
```

## 🔍 Troubleshooting

### Common Issues

**401 Unauthorized**:
- Check token validity (12-hour expiration for personal tokens)
- Verify token is correctly formatted
- Ensure proper Authorization header format

**400 Bad Request**:
- Validate JSON payload syntax
- Check required fields are present
- Verify date formats (ISO 8601)

**404 Not Found**:
- Confirm meeting ID exists
- Check API endpoint URLs
- Verify meeting hasn't been deleted

### Debug Tips

**Enable Detailed Logging**:
```javascript
res.on('end', () => {
  console.log('Status Code:', res.statusCode);
  console.log('Response Headers:', res.headers);
  console.log('Response Body:', data);
});
```

**Validate API Responses**:
```javascript
const result = JSON.parse(data);
if (result.errors) {
  console.error('API Errors:', result.errors);
}
```

## 🚀 Next Steps

### Production Integration

1. **OAuth Implementation**: Replace personal tokens with OAuth flow
2. **Error Handling**: Implement comprehensive error handling
3. **Rate Limiting**: Add rate limiting to prevent API abuse
4. **Logging**: Implement proper logging for debugging
5. **Testing**: Add unit and integration tests

### SDK Alternatives

Consider using official Webex SDKs for production applications:
- [Webex JavaScript SDK](https://github.com/webex/webex-js-sdk)
- [Webex Python SDK](https://github.com/CiscoDevNet/webexpythonsdk)
- [Webex Java SDK](https://github.com/webex/webex-java-sdk)

## 📚 Additional Resources

### Documentation

- [Webex REST API Documentation](https://developer.webex.com/docs/api/getting-started)
- [Webex Meetings API Guide](https://developer.webex.com/docs/meetings)
- [Authentication Guide](https://developer.webex.com/docs/authentication)
- [API Rate Limits](https://developer.webex.com/docs/basics#rate-limiting)

### Community

- [Webex Developer Community](https://developer.webex.com/community)
- [Stack Overflow - Webex](https://stackoverflow.com/questions/tagged/webex)
- [GitHub - Webex Samples](https://github.com/WebexSamples)

## 🌟 Don't be a Stranger

- [Webex Developer Documentation](https://developer.webex.com/docs)
- [Webex Developer Blog](https://developer.webex.com/blog)
- [Webex Developer Support](https://developer.webex.com/support)
- [@WebexDevs on Twitter](https://twitter.com/webexdevs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-sample`
3. Add your sample code with documentation
4. Follow the existing code style and patterns
5. Test your samples thoroughly
6. Submit a pull request with detailed description

### Sample Contribution Guidelines

- Include comprehensive documentation
- Add example API responses
- Follow consistent naming conventions
- Include error handling
- Test with personal access tokens

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

Made with ❤️ by the Webex Developer Evangelism Team at Cisco

**Repository**: https://github.com/WebexSamples/rest-api-samples

/**
 *  ____   ___   ____
 * |  _ \ / _ \ / ___|
 * | |_) | | | | |
 * |  __/| |_| | |___
 * |_|    \___/ \____|
 *
 * This is a Proof-Of-Concept (POC) for async with our REST API Meetings CRUD project.
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
=======
 *  ____   ___   ____ 
 * |  _ \ / _ \ / ___|
 * | |_) | | | | |    
 * |  __/| |_| | |___ 
 * |_|    \___/ \____|
 *                
 * This is a Proof-Of-Concept (POC) for async with our REST API Meetings CRUD project.
 * 
 */

const https = require('https');
const myWebexDeveloperToken = 'REPLACE-ME-WITH-YOUR-TOKEN';

const myDateStart = new Date( Date.now() + (1000 * 60 * 60) ).toISOString();
const myDateEnd   = new Date( Date.now() + (2000 * 60 * 60) ).toISOString();

/*******************************************************************************
 * MAIN 
*******************************************************************************/

async function main() {

    const createdMeeting = await createMyMeeting();
    const fetchedMeeting = await getMyMeeting(createdMeeting.id);
    //const newTitle       = await updateMyMeeting(fetchedMeeting.id, fetchedMeeting.password);
    //const deleteResult   = await deleteMyMeeting(meeting.id); // D - STATUS CODE EXPECTED: ___

} // End async function main

async function updateMyMeeting(id, password){
 // TODO: return a STRING with the new title
}
async function deleteMyMeeting(id){
  // TODO: return a friendly msg with the status code
}

/*******************************************************************************
 * CREATE 
*******************************************************************************/

async function createMyMeeting(){

    return new Promise((resolve) => {
        const createBody = JSON.stringify({
            title: 'Book Club Discussion: Curious George',
            start: myDateStart,
            end: myDateEnd,
        });
        
        const options = {
            method: 'POST',
            hostname: 'webexapis.com',
            path: '/v1/meetings',
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
        
                let myMeeting = JSON.parse(data);
        
                console.log(`Crud CREATE: The ID of the meeting we've just created is: ${myMeeting.id}`,
                );
            });
        
            createResponse.on('error', (e) => {
                console.error(`Error: ${e.message}`);
            });
    
        });
        
        createRequest.on('error', (e) => {
            console.error(e);
        });
        
        createRequest.write(createBody);
        
        return createRequest.end( () => {
    
            return new Promise((resolve) => {
                resolve(myMeeting);
            });
        });
    });

    

} // END async function createMyMeeting



/*******************************************************************************
 * READ
*******************************************************************************/

async function getMyMeeting( res, myCreatedMeetingId ){

    return new Promise((resolve) => {
        
        let myNewMeeting;

        const readOptions = {
            method: 'GET',
            hostname: 'webexapis.com',
            port: 443,
            path: `/v1/meetings/${myCreatedMeetingId}`,
            headers: {
                Authorization: `Bearer ${myWebexDeveloperToken}`, 
            }
        };
    
        const readRequest = https.request(readOptions, (readResponse) => {
    
            let data = '';
    
            readResponse.on('data', (chunk) => {
                data += chunk;
            });
    
            readResponse.on('end', () => {
                myNewMeeting = JSON.parse(data);
                console.log(`cRud READ: This meeting's title is: ${myNewMeeting.title}`);
            });
    
            readResponse.on('error', (e) => {
                console.error(`Error: ${e.message}`);
            });
    
        });
    
        readRequest.end( () => {
            resolve( {title: myNewMeeting.title} )
        });
    });

} // End READ

main();

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

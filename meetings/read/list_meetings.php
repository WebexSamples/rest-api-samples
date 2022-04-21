<?php
/**
 *                _               
 *  __      _____| |__   _____  __
 *  \ \ /\ / / _ \ '_ \ / _ \ \/ /
 *   \ V  V /  __/ |_) |  __/>  <         @WebexDevs
 *    \_/\_/ \___|_.__/ \___/_/\_\
 * 
 * READ (list) meetings in Webex with the REST API in PHP
 * https://developer.webex.com/docs/api/v1/meetings/list-meetings
 * 
 * Step 0: Have a (free) Webex account: https://cart.webex.com/sign-up
 * Step 1: Log in to https://developer.webex.com/login
 * Step 2: Find your bearer token at
 *         https://developer.webex.com/docs/getting-started under "Your
 *         Personal Access Token" in the middle of the page.
 * Step 3: Replace the string on the line that defines const myWebexDeveloperToken,
 *         just below, with your personal bearer (access) token. Hit "save".
 * Step 4: Run this file with PHP (https://www.php.net/downloads.php#v8.1.2)
 *         from within this directory on the command line:
 * 
 *         php ./list_meetings.php
 * 
 * Step 5: Profit. Get your app listed in the Webex App Hub!
 *         https://apphub.webex.com/
 * 
 */

$myWebexDeveloperToken = 'REPLACE ME WITH YOUR WEBEX DEVELOPER PERSONAL ACCESS TOKEN';

$curl = curl_init(); // Initialize

curl_setopt_array( $curl, array(
  CURLOPT_URL            => 'https://webexapis.com/v1/meetings',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING       => 'UTF-8',
  CURLOPT_MAXREDIRS      => 10,
  CURLOPT_TIMEOUT        => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST  => 'GET',
  CURLOPT_HTTPHEADER     => array(
    "Authorization: Bearer $myWebexDeveloperToken"
  ),
)); // Configure

$response = curl_exec( $curl ); // Execute

curl_close( $curl ); // Terminate

echo $response."\n"; // View result

/**
 * Expected output:
 * 
 * JSON text with an array of meetings,
 * as seen in the example JSON file in this directory: ./list_example_response.json
 * 
 * NOTE: If you do not have meetings in your account, check out the code
 *       example in ../create/create_meeting.js and run that. Then come
 *       back here, and you'll have a meeting in your account to retrieve.
 * 
 */

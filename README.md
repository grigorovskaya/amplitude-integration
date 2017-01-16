# How to use this Amplitude integration


Download this repo to your local machine.

From the root directory of the project run 'npm install' in the terminal.

If using the integration constructor in external files, save index.js to your project (rename index.js if needed) and require.


Create a new instance of Amplitude integration constructor using keyword new.
Amplitude API key is required for instantiation.

ex.: 
var amplitude = new Amplitude("YOUR_AMPLITUDE_API_KEY");

Pass a Segment's event to amplitude.take() method to send event to Amplitude API along with a callback that will handle eventual return value after validating, translating and sending the event to Amplitude API. 

ex.: 
var mockObj = { "timestamp": "2017-15-07T16:28:11.861037", "userId": "0000", "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"model": "iPhone6", "type": "ios", "id": "9b92536e-06ae-4e53-929f-6df9d848ed2y", "adTrackingEnabled": true, "manufacturer": "Apple"}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "type": "track", "event": "Tested one last thing", "id": "0000"};

var amplitude = new Amplitude("YOUR_AMPLITUDE_API_KEY");
var callback = function() {
  ...
};
amplitude.take(mockObj, callback);


To run mocha unit tests from test.js file, run 'npm run test' or 'mocha tests.js' in the terminal from the root directory of the project (valid Amplitude key has to be inserted in keys.js file).

(in keys.js)

ex.: 
module.exports =  "INSERT_YOUR_AMPLITUDE_API_KEY_HERE";

(in terminal)

ex.:
$ npm run test

or

$ mocha tests.js

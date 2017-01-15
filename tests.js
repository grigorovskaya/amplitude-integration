var assert = require('assert');
var Integration = require('./index.js');
var apiKey = require('./keys.js');
var myIntegration = new Integration(apiKey);

describe('amplitude-integration', function() {
  describe('make new integration', function() {
    var fakeKey = 'jdhfkjhskgbv';
    it('should return an instance of Amplitude when provided an api key', function() {
      assert.equal(true, new Integration(fakeKey) instanceof Integration);
    });
    it('should throw an error when not provided an api key', function() {
      assert.throws(Integration, Error, "Error thrown");
    });
  });
  describe('integration.take', function(done) {
    var mockObj = {"username": "o9amxb7u", "timestamp": "2017-01-07T18:16:17.861037", "userId": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "email": "wgqnkiru@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "7ef58428-8dba-4dfe-a2a2-eb6becceb1e1", "token": "3e6e6cb0-4156-4b5a-a67d-1f91d5f9c421", "model": "iPhone6", "type": "ios", "id": "9b92536e-06ae-4e53-929f-6df9d848ed2e", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "5.73.164.238", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5, "name": "analytics.js"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "type": "identify", "id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5"};
    var invalidMockObj = {};
    it('it should return response from Amplitude HTTP API when provided a valid input', function(done){ 
      myIntegration.take(mockObj, function(err, res) {
        assert.equal(200, res.statusCode);
      });
      done();
    });
    it('it should return an error when provided an invalid input', function(done){ 
      myIntegration.take(invalidMockObj, function(err, res) {
        assert.equal('Error: not a valid event', err);
      });
      done();
    });
  });
  describe('integration.validate', function() {
    it('should return true when passed a valid message', function() {
      var mockObj = {"username": "o9amxb7u", "timestamp": "2017-01-07T18:16:17.861037", "userId": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "email": "wgqnkiru@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "7ef58428-8dba-4dfe-a2a2-eb6becceb1e1", "token": "3e6e6cb0-4156-4b5a-a67d-1f91d5f9c421", "model": "iPhone6", "type": "ios", "id": "9b92536e-06ae-4e53-929f-6df9d848ed2e", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "5.73.164.238", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5, "name": "analytics.js"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "type": "identify", "id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5"};
      assert.equal(true, myIntegration.validate(mockObj));
    });
    it('should return false when passed a message with no userId and no device.id properties', function() {
      var mockObj = {"username": "o9amxb7u", "timestamp": "2017-01-07T18:16:17.861037", "user_id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "email": "wgqnkiru@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "7ef58428-8dba-4dfe-a2a2-eb6becceb1e1", "token": "3e6e6cb0-4156-4b5a-a67d-1f91d5f9c421", "model": "iPhone6", "type": "ios", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "5.73.164.238", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5, "name": "analytics.js"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "type": "identify", "id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5"};
      assert.equal(false, myIntegration.validate(mockObj));
    });
    it('should return false when passed a message without a type property', function() {
      var mockObj = {"username": "o9amxb7u", "timestamp": "2017-01-07T18:16:17.861037", "userId": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "email": "wgqnkiru@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "7ef58428-8dba-4dfe-a2a2-eb6becceb1e1", "token": "3e6e6cb0-4156-4b5a-a67d-1f91d5f9c421", "model": "iPhone6", "type": "ios", "id": "9b92536e-06ae-4e53-929f-6df9d848ed2e", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "5.73.164.238", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5, "name": "analytics.js"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5"};
      assert.equal(false, myIntegration.validate(mockObj));
    });
    it('should return false when passed a message of invalid type', function() {
      var mockObj = 'hello';
      assert.equal(false, myIntegration.validate(mockObj));
    });
    it('should return false when passed an empty message', function() {
      var mockObj = {};
      assert.equal(false, myIntegration.validate(mockObj));
    });
  });

  describe('integration.translate', function() {
    var mockObjIdentify = {"username": "o9amxb7u", "timestamp": "2017-01-07T18:16:17.861037", "userId": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "email": "wgqnkiru@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "7ef58428-8dba-4dfe-a2a2-eb6becceb1e1", "token": "3e6e6cb0-4156-4b5a-a67d-1f91d5f9c421", "model": "iPhone6", "type": "ios", "id": "9b92536e-06ae-4e53-929f-6df9d848ed2e", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "5.73.164.238", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5, "name": "analytics.js"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "type": "identify", "id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5"};
    var mockObjTrack = {"username": "o9amxb7u", "timestamp": "2017-01-07T18:16:17.861037", "userId": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "email": "wgqnkiru@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "7ef58428-8dba-4dfe-a2a2-eb6becceb1e1", "token": "3e6e6cb0-4156-4b5a-a67d-1f91d5f9c421", "model": "iPhone6", "type": "ios", "id": "9b92536e-06ae-4e53-929f-6df9d848ed2e", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "5.73.164.238", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "10.2", "name": "iPhone OS"}, "library": {"version": 5, "name": "analytics.js"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "28aeef18-2806-43a1-8ce0-6664aac7524e", "type": "track", "event": "Products Searched"};
    var mockTranslatedObjIdentify = {"user_properties": {"username": "o9amxb7u", "email": "wgqnkiru@definitely_not_a_spammer.internet"}, "time": 1483812977861, "user_id": "12ec721b-0d16-424d-b27d-c50db3e9b2d5", "location_lat": 40.2964197, "city": "San Francisco", "location_lng": -76.9411617, "country": "United States", "device_model": "iPhone6", "device_id": "9b92536e-06ae-4e53-929f-6df9d848ed2e", "device_manufacturer": "Apple", "ip": "5.73.164.238", "os_version": "10.2", "os_name": "iPhone OS", "carrier": "Verizon", "device_brand" : undefined};
    it('should alias userId to user_id and map value from a passed in event', function() {
      assert.equal(true, myIntegration.translate(mockObjIdentify).hasOwnProperty('user_id'));
      assert.equal(myIntegration.translate(mockObjIdentify).user_id, mockObjIdentify.userId);
    });
    it('should alias device.id to device_id and map value from a passed in event', function() {
      assert.equal(true, myIntegration.translate(mockObjIdentify).hasOwnProperty('device_id'));
      assert.equal(myIntegration.translate(mockObjIdentify).device_id, mockObjIdentify.context.device.id);
    });
    it('should alias type to event_type when given a "track" type event', function() {
      assert.equal(true, myIntegration.translate(mockObjTrack).hasOwnProperty('event_type'));
    });
    it('should map event_type value from event.event when given a "track" type event', function() {
      assert.equal(myIntegration.translate(mockObjTrack).event_type, mockObjTrack.event);
    });
    it('should get rid of type property when given an "identify" type event', function() {
      assert.equal(false, myIntegration.translate(mockObjIdentify).hasOwnProperty('event_type'));
      assert.equal(myIntegration.translate(mockObjIdentify).event_type, mockObjIdentify.context.type);
    });
    it('should return an object with correctly mapped values', function() {
      assert.equal('object', typeof myIntegration.translate(mockObjIdentify));
      assert.deepEqual(myIntegration.translate(mockObjIdentify), mockTranslatedObjIdentify);
    });
  });
  describe('integration.track', function() {
    var mockTranslatedObj = {"user_properties": {"username": "nat", "email": "nat@definitely_not_a_spammer.internet"}, "time": 1484525212144, "user_id": "4242", "location_lat": 40.2964197, "city": "San Francisco", "location_lng": -76.9411617, "country": "United States", "device_model": "iPhone6", "device_type": "ios", "device_id": "9922", "device_manufacturer": "Apple", "ip": "73.170.79.133", "os_version": "10.2", "os_name": "iPhone OS", "device_carrier": "Verizon", "device_brand" : null, "event_type": "Page viewed", "event_properties" :{"id": "4242"}};
    it('it should send data to Amplitude HTTP API', function(done){
      myIntegration.track(mockTranslatedObj, function(err, res) {
        assert.equal(200, res.statusCode);
      });
      done();
    });
  });
  describe('integration.identify', function() {
    it('it should send data to Amplitude Identify API', function(done){
      var mockTranslatedObj = {"user_properties": {"username": "nat", "email": "nat@definitely_not_a_spammer.internet"}, "time": 1484525212144, "user_id": "2323", "location_lat": 40.2964197, "city": "San Francisco", "location_lng": -76.9411617, "country": "United States", "device_model": "iPhone6", "device_type": "ios", "device_id": "9922", "device_manufacturer": "Apple", "ip": "73.170.79.133", "os_version": "10.2", "os_name": "iPhone OS", "device_carrier": "Verizon", "device_brand" : null}; 
      myIntegration.identify(mockTranslatedObj, function(err, res) {
        assert.equal(200, res.statusCode);
      });
      done();
    });
  });
});

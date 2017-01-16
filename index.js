'use strict';

var request = require('superagent');
var amplitudeAPI = 'https://api.amplitude.com';

/* instantiate with api key
@param {String} key
@return {Object}
*/
var Amplitude = function(key) {
  if (!key) {
    throw new Error('API key must be provided');
  }
  this.apiKey = key;
};

/* handle general flow for incoming events
@param {Object} event
@param {Function} callback (can handle queueing for later processing if needed, logging, etc.)
@return {Object}
*/

Amplitude.prototype.take = function(event, callback) { 
  if (this.validate(event)) {
    var translatedEvent = this.translate(event);
    return this.send(translatedEvent, callback);
  } else {
    return callback(new Error('not a valid event'));
  }
};


/* route incoming events to http api/identify api
@param {Object} amplitudeEvent
@param {Function} callback
@return {Object}
*/
Amplitude.prototype.send = function(amplitudeEvent, callback) {
  if (amplitudeEvent.event_type) {
    return this.track(amplitudeEvent, callback);
  } else {
    return this.identify(amplitudeEvent, callback);
  }
};


/* validate incoming message
@param {Object} event
@return {Boolean}
*/
Amplitude.prototype.validate = function(event) {
  var isValidObj = JSON.parse(JSON.stringify(event));
  var hasDeviceId = event.context && event.context.device && event.context.device.id;
  var hasRequiredProps = event.type && (event.userId || hasDeviceId);

  if (isValidObj && hasRequiredProps) {
    return true;
  } else {
    return false;
  }
};


/* map incoming message properties to amplitude properties
@param {Object} event
@return {Object}
*/

Amplitude.prototype.translate = function(event) {
  var amplitudeEvent = {
    user_id: event.userId,
    device_id: event.context.device.id,
    time: new Date(event.timestamp).getTime(), //iso8601 date to epoch
    carrier: event.context.network.carrier,
    device_model: event.context.device.model,
    device_manufacturer: event.context.device.manufacturer,
    device_brand: event.context.device.brand,
    os_version: event.context.os.version,
    os_name: event.context.os.name,
    ip: event.context.ip,
    country: event.context.location.country,
    city: event.context.location.city,
    location_lat: event.context.location.latitude,
    location_lng: event.context.location.longitude
  };

  amplitudeEvent.user_properties = event.traits || {};
  if (event.email) {
    amplitudeEvent.user_properties.email = event.email;
  }
  if (event.username) {
    amplitudeEvent.user_properties.username = event.username;
  }
  if (event.context.os && event.context.os.name.toLowerCase() === 'android') {
    amplitudeEvent.adid = event.context.device.advertisingId;
  }

  if (event.type === 'track') {
    amplitudeEvent.event_type = event.event;
    amplitudeEvent.event_properties = event.properties || {}; 
    if (event.properties && event.properties.revenue) {
      amplitudeEvent.revenue = event.properties.revenue;
      if (event.properties.price && event.properties.quantity) {
        amplitudeEvent.price = event.properties.price;
        amplitudeEvent.quantity = event.properties.quantity;
      }
    }
  }

  return amplitudeEvent;
};



/* send an event to amplitude http api
@param {Object} amplitudeEvent
@param {Function} callback
*/
// uses a callback that was passed to .take method; it can queue failed requests for later processing, gather stats, etc.

Amplitude.prototype.track = function(amplitudeEvent, callback) {
  var api_key = this.apiKey;
  var path = amplitudeAPI + '/httpapi';
  return request
    .post(path)
    .type('json')
    .query({ api_key: api_key })
    .query({ event: JSON.stringify(amplitudeEvent) })
    .end(function(err, res) {
      if (err) { return callback(err); }
      callback(res);
    });
};


/* send an event to amplitude identify
@param {Object} amplitudeEvent
@param {Function} callback
*/
// uses a callback that was passed to .take method; it can queue failed requests for later processing, gather stats, etc.
Amplitude.prototype.identify = function(amplitudeEvent, callback) {
  var api_key = this.apiKey;
  var path = amplitudeAPI + '/identify';
  return request
    .post(path)
    .type('json')
    .query({ api_key: api_key })
    .query({ identification: JSON.stringify(amplitudeEvent) })
    .end(function(err, res) {
      if (err) { return callback(err); }
      callback(res);
    });
};


module.exports = Amplitude;

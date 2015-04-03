import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  _validateToken: function(accessToken, providerName='google-oauth2') {
    var requestURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?' + 'access_token=' + accessToken;

    return new Ember.RSVP.Promise(function(resolve, reject){
      return Ember.$.ajax({
        url: requestURL,
        dataType: 'json',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject),
      });
    })
      .then(function(response){
        var apiKey = config.torii.providers[providerName].apiKey;

        if (apiKey !== response.audience) {
          throw new Error('apiKey does not match');
        }

        return {
          accessToken: accessToken,
          userId: response.user_id
        };
      });
  },

  open: function(authentication){
    var accessToken = authentication.authorizationToken.access_token;
    var providerName = authentication.provider;

    return this._validateToken(accessToken, providerName)
      .then(function(sessionData) {
        return localStorage.toriiAuthToken = sessionData.accessToken;
      });
  },

  fetch: function() {
    var accessToken = localStorage.toriiAuthToken;

    return this._validateToken(accessToken);
  }
});

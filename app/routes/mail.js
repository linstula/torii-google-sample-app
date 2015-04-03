import Ember from 'ember';
import authedAjax from '../utils/authed-ajax';
import Message from '../models/message';

var messagesURL = 'https://www.googleapis.com/gmail/v1/users/me/messages';

export default Ember.Route.extend({
  beforeModel: function() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('sign-in');
    }
  },

  model: function() {
    var session = this.get('session');
    var data = {
      maxResults: 10
    };

    return authedAjax(session, messagesURL, data)
      .then(function(results) {
        var messages = results.messages;

        var promises = messages.map(function(message) {
          var url = `${messagesURL}/${message.id}`;

          return authedAjax(session, url)
            .then(function(messageData) {
              return Message.create(messageData);
            })
        });

        return Ember.RSVP.all(promises);
      })
  }
});

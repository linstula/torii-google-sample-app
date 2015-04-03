import Ember from 'ember';

export default function(session, url, data) {
  var accessToken = session.get('accessToken') ;

  return new Ember.RSVP.Promise(function(resolve, reject) {
    return Ember.$.ajax({
      url: url,
      data: data || {},
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: Ember.run.bind(null, resolve),
      error: Ember.run.bind(null, reject)
    })
  })
}

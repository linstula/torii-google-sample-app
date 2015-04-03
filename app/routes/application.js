import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var session = this.get('session');
    var accessToken = localStorage.toriiAuthToken;

    if (accessToken) {
      session.fetch('google-oath2-bearer')
        .catch(() => { });
    }
  },

  actions: {
    signOutUser: function() {
      var session = this.get('session');
      session.close();
    }
  }
});

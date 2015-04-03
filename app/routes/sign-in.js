import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signInWithGoogle: function(){
      var session = this.get('session');

      session.fetch('google-oauth2-bearer')
        .catch(() => this.get('session').open('google-oauth2-bearer'))
        .then(() => this.transitionTo('mail'));
    }
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signInWithGoogle: function(){
      var session = this.get('session');

      session.fetch('google-oath2')
        .catch(() => this.get('session').open('google-oauth2'))
        .then(() => this.transitionTo('mail'));
    }
  }
});

import Ember from 'ember';

export default Ember.Object.extend({
  init: function() {
    this.from = this._getValueForHeader('From');
    this.subject = this._getValueForHeader('Subject');
    this.receivedDate = this._getValueForHeader('Date');
  },

  _getValueForHeader: function(name) {
    var headers = this.get('payload.headers');

    for (var i = 0; i < headers.length; i++) {
      if (headers[i].name === name) {
        return headers[i].value;
      }
    }
  }
});

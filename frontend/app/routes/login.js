
import Ember from 'ember';

export default Ember.Route.extend({


	$_GET: function(name){
		  var url = window.location.search;
		  var num = url.search(name);
		  var namel = name.length;
		  var frontlength = namel+num+1; //length of everything before the value
		  var front = url.substring(0, frontlength);
		  url = url.replace(front, "");
		  num = url.search("&");

		 if(num >= 0){ return url.substr(0,num);}
		 if(num < 0){  return url;}
	},
  loadCurrentUser() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const token =
        this.get('session.data.authenticated.token');
      if (!Ember.isEmpty(token)) {
        return this.get('store').findRecord('user',
          'me').then((user) => {
          this.set('account', user);
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  },

	activate: function() {
		//TODO: Instead of checking if there's GET data for 'code', we should use the
		//backend to check if the user is logged in, or if they need to go to login page
		var code = this.$_GET('code');
		var self = this;
		console.log(code);


    if (code === '') {
			window.location="https://staging-accounts.osf.io/oauth2/authorize?scope=osf.full_read+osf.full_write&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&response_type=code&client_id=87ccc107d57b44b988abe7fe269bf6ba";
		} else {
			Ember.$.ajax({
				url: "http://localhost:8000/login?code=" + code,
				type: "GET",
				//crossDomain: true
				dataType: 'json',
				contentType: 'text/plain',
				xhrFields: {
					withCredentials: true,
				}
			}).then(function() {

        self.transitionTo('editing.submissions');

			});
		}
	},headers: Ember.computed(function() {
    var csrftoken = "";
    try {
       csrftoken = Ember.get(document.cookie.match(/csrftoken\=([^;]*)/), "1");
      console.log(csrftoken);
    } catch(e){
      console.log(e);
      console.log('no csrftoken present');
    }

    return {
      "X-CSRFToken": csrftoken
    };
  }).volatile()
});


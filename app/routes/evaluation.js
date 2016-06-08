import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.createRecord('submission-eval');
    },
    // submission: null,
    // total: Ember.computed.sum('submission.sda', submission.asd',)

    actions: {
        saveEvaluation(newEval) {
            var router = this;
            newEval.save().then( function() {
                document.getElementById('submitAlert').className = 
                    "ember-view alert-success alert fade in";
                ssetTimeout(function() {
                    router.transitionTo('reviews');
                }, 3000);
                
            });
        },

    }
});


// {{evaluation submission=model}}\

// {{submission.}}
// {{total}}
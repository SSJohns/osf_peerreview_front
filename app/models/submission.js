import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr'

export default DS.Model.extend({
  conference: attr('string'),
  title: attr('string'),
  reviewdeadline: attr('string'),
  author_name: attr('string'),
  author_email: attr('string'),
  status: attr('string'),
  link: attr('string'),
  attachment: attr('string'),
  iswaiting: Ember.computed.equal('status', 'Awaiting review'),
  evaluations: hasMany('evaluation'),
  reviewerassignments: hasMany('reviewerassignment'),
});

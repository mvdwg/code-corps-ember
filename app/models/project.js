import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, computed: { alias, filterBy, gt }, get } = Ember;

export default Model.extend({
  canActivateDonations: attr(),
  closedTasksCount: attr('number'),
  cloudinaryPublicId: attr(),
  description: attr(),
  donationsActive: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  longDescriptionBody: attr(),
  longDescriptionMarkdown: attr(),
  openTasksCount: attr('number'),
  slug: attr(),
  title: attr(),
  totalMonthlyDonated: attr('dollar-cents'),

  donationGoals: hasMany('donation-goal', { async: true }),
  organization: belongsTo('organization', { async: true }),
  taskLists: hasMany('task-list', { async: true }),
  tasks: hasMany('tasks', { async: true }),
  projectCategories: hasMany('project-category', { async: true }),
  projectSkills: hasMany('project-skill', { async: true }),
  stripeConnectPlan: belongsTo('stripe-connect-plan', { async: true }),

  currentDonationGoal: computed('_currentGoals', function() {
    return get(this, '_currentGoals.firstObject');
  }),
  hasOpenTasks: gt('openTasksCount', 0),
  hasPendingMembers: alias('organization.hasPendingMembers'),
  inboxTaskList: computed('_inboxTaskListAsArray', function() {
    return get(this, '_inboxTaskListAsArray.firstObject');
  }),
  pendingMembersCount: alias('organization.pendingMembersCount'),

  _currentGoals: filterBy('donationGoals', 'current', true),
  _inboxTaskListAsArray: filterBy('taskLists', 'inbox', true)
});

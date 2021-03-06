import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

export default Component.extend({
  classNames: ['project-settings-form'],

  flashMessages: service(),
  loadingBar: service(),

  uploadDone(cloudinaryPublicId) {
    let project = get(this, 'project');
    set(project, 'cloudinaryPublicId', cloudinaryPublicId);
    project.save().then(() => {
      this._stopLoadingBar();
      get(this, 'flashMessages').clearMessages().success('Project icon uploaded successfully');
    });
  },

  uploadErrored() {
    this._stopLoadingBar();
    get(this, 'flashMessages').clearMessages().danger('Upload failed');
  },

  uploadStarted() {
    this._startLoadingBar();
  },

  actions: {
    save() {
      this.get('project').save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Project updated successfully');
      });
    }
  },

  _startLoadingBar() {
    get(this, 'loadingBar').start();
  },

  _stopLoadingBar() {
    get(this, 'loadingBar').stop();
  }
});

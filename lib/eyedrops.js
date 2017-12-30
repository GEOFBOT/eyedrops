'use babel';

import EyedropsView from './eyedrops-view';
import { CompositeDisposable } from 'atom';

export default {

  eyedropsView: null,
  modalPanel: null,
  subscriptions: null,
  eyedropped: false,

  activate(state) {
    this.eyedropsView = new EyedropsView(state.eyedropsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.eyedropsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eyedrops:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.eyedropsView.destroy();
  },

  serialize() {
    return {
      eyedropsViewState: this.eyedropsView.serialize()
    };
  },

  toggle() {
    // at the moment tabs that have not yet been added to the document
    // are not blurred :/ maybe cycle through all tabs before blurring?
    [].forEach.call(document.getElementsByClassName("lines"),
      this.eyedropped ? (el) => {
        el.style.filter = "";
      } : (el) => {
        el.style.filter = "blur(5px)";
      });
    this.eyedropped = !this.eyedropped;

    return;
  }

};

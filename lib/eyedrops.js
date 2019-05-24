'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  eyedropped: false,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eyedrops:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      eyedropped: this.eyedropped
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

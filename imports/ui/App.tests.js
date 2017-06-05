/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { App } from './App.jsx';
 
if (Meteor.isClient) {
  describe('App', () => {
    describe('methods', () => {
      it('can submit a username', () => {
      	expect(this.state.count).toEqual(2);
      });
    });
  });
}
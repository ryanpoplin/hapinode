'use strict';

import MySuperClass from './MySuperClass.js';

/**
  * MyClass description
  */
export default class MyClass extends MySuperClass {
  /**
    * MyClass constructor description
    */
  constructor(name = 'anonymous') {
    super();
    this._name = name;
  }

  /**
   * sayMyName description
   * @returns {string} this is return description
   */
  sayMyName() {
    return `sub ${this._name}`;
  }
}

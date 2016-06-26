import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import Article from '../../src/components/Article';

const markdown = `# yo

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

* list 1
* list 2
* list 3

> blockquote

**Bold**

## header 2`;

describe('Article suite', () => {
  it('contains spec with an expectation', () => {
    assert(shallow(<Article article={{ markdown }} />).is('.markdown-body'));
  });
});

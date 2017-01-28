import React from 'react';
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from './App';

it('renders without crashing', () => {
  const enzymeWrapper = shallow(<App />)
  expect(enzymeWrapper).to.have.length(1)
});

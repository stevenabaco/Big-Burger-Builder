import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem))
            .toHaveLength(2);
    })
});
import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserHome } from './user-home';

enzyme.configure({ adapter: new Adapter() });

describe('UserHome', () => {
	it('renders the email in an h3', () => {
		const user = { email: 'cody@email.com' };
		const userHome = shallow(<UserHome user={user} />);
		expect(userHome.find('h3').text()).to.be.equal('Welcome back, cody@email.com');
	});
});

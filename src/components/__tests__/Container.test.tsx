/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Container from '../Container';

const props = {
	label: 'name',
	value: '1',
	onChange: jest.fn(),
}

describe('<List />', () => {
	test('should match snapshot', () => {
		const { asFragment } = render(
			<Container {...props} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});

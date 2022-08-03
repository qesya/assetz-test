/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Input from '../Input';

const props = {
	value: '1',
	onChange: jest.fn(),
}

describe('<List />', () => {

	test('should does not have input label', () => {
		const { queryByTestId } = render(
			<Input {...props} />
		);
		expect(queryByTestId('input-label')).not.toBeInTheDocument();
	});

	test('should has input label', () => {
		const { getByText } = render(
			<Input label="name" {...props} />
		);
		expect(getByText('name')).toBeInTheDocument();
	});

	test('should match snapshot', () => {
		const { asFragment } = render(
			<Input label="name" {...props} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});

/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import List from '../List';

const exampleData = [
	{
		investorId: 1,
		investmentAccount: 'ABC',
		balance: '10',
		totalBalance: 10,
		totalBalanceDetails: '10'
	},
	{
		investorId: 2,
		investmentAccount: 'DEF',
		balance: '15',
		totalBalance: 15,
		totalBalanceDetails: '15' 
	}
]

describe('<List />', () => {
	test('should has label', () => {
		const { getByText } = render(
			<List
				data={exampleData}
				dataKeys={[
					'investmentAccount',
					'totalBalance',
				]}
			/>
		);
		expect(getByText('investment account')).toBeInTheDocument();
	});

	test('should match snapshot', () => {
		const { asFragment } = render(
			<List
				data={exampleData}
				dataKeys={[
					'investmentAccount',
					'totalBalance',
				]}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});

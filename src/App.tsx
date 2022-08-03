import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import Container from './components/Container';
import Input from './components/Input';
import List, { SingleData } from './components/List';

import holdingData from './data/holdings.json';
import ratesData from './data/rates.json';

export const AppRoot = createGlobalStyle`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  }

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

function App() {
	const [promotion, setPromotion] = useState<string>('1');

	const handleChangePromotion = useCallback(
		(e: ChangeEvent<HTMLInputElement>) =>
			setPromotion(e.target.value),                             
		[setPromotion]
	);

	const data = useMemo(() => {
		const listData = holdingData
			.map((holding) => {
				// merge holding data with rates data
				const rateIndex = ratesData.findIndex(
					(rate) => rate.investmentAccount === holding.investmentAccount
				);
				if (rateIndex !== -1) {
					return { ...holding, ...ratesData[rateIndex] };
				}

				return holding;
			})
			.reduce((acc: SingleData[], holding) => {
				// reduce & create (totalBalance & balanceDetail) for each data
				const existingIndex = acc.findIndex(
					(x) => x.investmentAccount === holding.investmentAccount
				);
				if (existingIndex !== -1) {
					const existingHolding = acc[existingIndex];

					acc[existingIndex] = {
						...existingHolding,
						totalBalance:
							existingHolding.totalBalance + parseFloat(holding.balance),
						totalBalanceDetails: `${existingHolding.totalBalanceDetails} + ${holding.balance}`,
					};

					return acc;
				}

				return [
					...acc,
					{
						...holding,
						totalBalance: parseFloat(holding.balance),
						totalBalanceDetails: holding.balance,
					},
				];
			}, []);
		const highestTotalBalance = Math.max(
			...listData.map((x) => x.totalBalance)
		);
		const highestTotalBalanceIndex = listData.findIndex(
			(x) => x.totalBalance === highestTotalBalance
		);

		return listData.map((holding: SingleData, i: number) => {
			// add annualInterestRate, annualInterestValue & totalBalanceIncludedInterestValue for each data
			if (i === highestTotalBalanceIndex) {
				// add 1% interest to highest investment account
				const annualRate: number = holding.annualRate ? holding.annualRate + parseFloat(promotion) : 0;
				const interestValue = (annualRate / 100) * holding.totalBalance;
				return {
					...holding,
					annualRate,
					annualInterestRate: `${holding.annualRate! + parseFloat(promotion)}% (${
						holding.annualRate
					} + ${promotion}%)`,
					annualInterestValue: interestValue,
					totalBalanceWithInterestValue: holding.totalBalance + interestValue,
				};
			}

			const annualRate = holding.annualRate ?? 0;
			const interestValue = (annualRate / 100) * holding.totalBalance;

			return {
				...holding,
				annualInterestRate: `${annualRate}%`,
				annualInterestValue: interestValue,
				totalBalanceWithInterestValue: holding.totalBalance + interestValue,
			};
		}, []);
	}, [promotion]);

	return (
		<Container>
			<AppRoot />

			<Input
				label="Custom Promotion (%)"
				type="number"
				placeholder="Promotion"
				value={promotion}
				onChange={handleChangePromotion}
			/>

			<List
				data={data}
				dataKeys={[
					'investmentAccount',
					'annualInterestRate',
					'annualInterestValue',
					'totalBalance',
					'totalBalanceDetails',
					'totalBalanceWithInterestValue',
				]}
			/>
		</Container>
	);
}

export default App;

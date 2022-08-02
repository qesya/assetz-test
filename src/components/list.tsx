import { memo } from 'react';
import styled from 'styled-components';


type Props = {
  data: SingleData[];
  dataKeys: string[];
}

export type SingleData = {
  investorId: number;
  investmentAccount: string;
  balance: string;
  annualRate?: number;
  totalBalance: number;
  totalBalanceDetails: string;
  totalBalanceIncludedInterestValue?: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{ header?: boolean }>`
  display: flex;

  & > div:last-child {
    border-right-width: 1px;
  }

  ${({ header }) => header && `
    background-color: #6184e3;
    color: white;
    font-weight: 600;
    font-size: 20px;
    position: sticky;
    top: 0px;
  `};
`;

const Column = styled.div`
  flex: 1;
  padding: 10px 20px;

  border-width: 0px 0px 1px 1px;
  border-style: solid;
  border-color: #e3e3e3;

  &:first-child {
    border-left-width: 1px;
  }

  & > div:last-child {
    border-bottom-width: 1px;
  }
`;

const List: React.FC<Props> = memo(({ data, dataKeys }) => {

  return (
    <Wrapper>
      <Row header>
        {dataKeys.map((dataKey, ii) => (
          <Column key={ii.toString()}>{dataKey.replace(/([A-Z]+)/g, ' $1').toLowerCase()}</Column>
        ))}
      </Row>
      {data.map((single: { [key: string]: string | number }, i) => (
        <Row key={i.toString()}>
          {dataKeys.map((dataKey, ii) => (
            <Column key={ii.toString()}>{single[dataKey]}</Column>
          ))}
        </Row>
      ))}
    </Wrapper>
  )
});

export default List;
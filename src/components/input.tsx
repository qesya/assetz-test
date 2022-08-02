import React from 'react';
import styled from 'styled-components';


type Props = {
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  number?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  margin: 50px 0;

  & > label {
    padding-bottom: 10px;
  }
`;

const InputText = styled.input`
  padding: 10px 15px;
  border: 1px solid #e3e3e3;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
  
  &:focus {
    
    border-color: #6184e3;
  }
`;

const Input: React.FC<Props> = ({label, ...props }) => {

  return (
    <Wrapper>
      {label && <label htmlFor={label}>{label}</label>}
      <InputText id={label} {...props} />
    </Wrapper>
  )
}

export default Input;
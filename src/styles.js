import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { variant } from 'styled-system';

let subColour = 'grey';
let mainColour = 'black';
// Forms, inputs, buttons

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', Sans-Serif;
  }
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  background: white;
  background-color: #fff;
  color: ${subColour};
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: 3px solid black;
  border-radius: 3px;
  border-bottom: 1px solid $sub-color;
  margin: 25px 0;
  box-shadow: rgb(46 170 220 / 70%);
  cursor: text;
  outline: none;
`;

export const FormLabel = styled.label`
  top: -14px;
  font-size: 12px;
  color: ${mainColour};
`;

export const Button = styled.button`
  width: 15;
  height: 15;
  background-color: #fff;
  border: none;
  /* color: #fff; */
`;

export const Title = styled.h1`
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  color: ${(props) => props.color || '#4d4d4d'};
`;

export const MainContainer = styled.div`
  width: 80%;
  float: right;
  display: flex;
`;

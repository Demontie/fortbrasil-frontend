import styled, { keyframes, css } from 'styled-components';

export const MsgErro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  background-color: red;
  margin-top: 30px;
  border-radius: 5px;
  h1 {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  margin-top: ${(props) => (props.error ? '5px' : '30px')};
  display: block;

`;

export const LinksText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;


const rotate = keyframes`
 from {
   transform: rotate(0deg);
 }

 to {
   transform: rotate(360deg);
 }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: green;
  color: #fff;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  width: 150px;
  height: 30px;


  display: flex;
  justify-content: center;
  align-items: center;


  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const InputTextField = styled.div`
  display: flex;
  margin-bottom:45px;
  input {
    flex: 1;
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid #757575;
  }
  input:focus 		{ outline:none; }

  label {
    color:#999;
    font-size:18px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }
  input:focus ~ label, input:valid ~ label 		{
    top:-20px;
    font-size:14px;
    color:#5264AE;
  }
`;







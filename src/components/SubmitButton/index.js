import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
 from {
   transform: rotate(0deg);
 }

 to {
   transform: rotate(360deg);
 }
`;

const SubmitButton = styled.button.attrs((props) => ({
  type: !props.typeButton ? 'submit' : props.typeButton,
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

export default SubmitButton;

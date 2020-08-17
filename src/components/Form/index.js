import styled from 'styled-components';

const Form = styled.form`
  margin-top: ${(props) => (props.error ? '5px' : '30px')};
  display: block;
`;

export default Form;

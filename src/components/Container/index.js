import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;

    button {
      background: green;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 5px 10px;
      height: 30px;
      margin-left: 15px;
    }
    button:nth-child(2) {
      background: red;
    }
    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;

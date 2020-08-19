import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
 from {
   transform: rotate(0deg);
 }

 to {
   transform: rotate(360deg);
 }
`;

export const ShopsList = styled.ul`
  padding-top: 15px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        label {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
            cursor: pointer;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }

  li:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    transform: scale(1.01);
    cursor: pointer;
  }
`;

export const ButtonClick = styled.button.attrs((props) => ({
  type: 'button',
  disabled: props.loading,
}))`
  background: green;
  color: #fff;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  padding: 8px 15px;
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

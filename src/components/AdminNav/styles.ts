import styled from 'styled-components';

export const SubMenu = styled.nav`
  li {
    margin-top: 10px;
    list-style-type: none;
    align-items: center;
    color: #fffeee;
    margin-right: 115px;
  }

  ul {
    padding: 0;
  }

  button {
    margin-top: 10px;
  }

  a {
    text-decoration: none;
    font-size: 20px;
    color: white;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.7);
    }
  }
`;

import styled from 'styled-components';

export const Menu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  padding: 30px 0 90px;
  overflow: auto;
  z-index: 2;
  background: var(--black80);
  color: white;

  li {
    margin-top: 30px;
    list-style-type: none;
    align-items: center;
    color: #fffeee;

    & + li {
      margin-top: 15px;
    }
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

  button {
    position: absolute;
    right: 15px;
    top: 15px;
    border: 0;
    width: 1px;
  }

  transform: translateX(-300px);
  -webkit-transition: transform 0.5s 0s ease;
  -moz-transition: transform 0.5s 0s ease;
  -o-transition: transform 0.5s 0s ease;
  transition: transform 0.5s 0s ease;

  &.show {
    transform: translateX(0);
  }
`;

export const Container = styled.header`
  background: var(--black30);
  padding-right: 15px;
  padding-left: 15px;
  color: white;
`;

export const Content = styled.div`
  margin: 0 auto;

  padding: 16px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button,
  a,
  p {
    font-size: 16px;
    color: white;
    background-color: transparent;
    border: 0;
    border-radius: 4px;
    height: 48px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.7);
    }
  }
`;

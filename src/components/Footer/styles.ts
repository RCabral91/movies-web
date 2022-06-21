import styled from 'styled-components';

export const FooterStyles = styled.div`
  background: var(--black30);
  margin-top: auto;

  a {
    text-decoration: none;
    font-size: 20px;
    color: white;
  }

  a {
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.7);
    }
  }
`;

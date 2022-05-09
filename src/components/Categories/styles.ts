import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PillStyles = styled(Link)`
  border-radius: 20px;
  white-space: nowrap;
`;

export const CategoryOverflow = styled.ul`
  overflow-x: scroll;
  flex-wrap: nowrap;
  padding: 0;

  @media screen and (min-width: 768px) {
    flex-wrap: wrap;
    overflow-x: auto;
  }
`;

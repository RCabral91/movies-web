import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0 4px;

    a {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 4px;

      text-decoration: none;
      background-color: #f2f2f2;
    }

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    &.selected a {
      background-color: var(--primary);
    }

    &.previous,
    &.next {
      display: none;
    }
  }
`;

export default Pagination;

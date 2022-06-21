import styled from 'styled-components';

export const ImgCard = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 0;
  padding-top: 140%;
  position: relative;

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

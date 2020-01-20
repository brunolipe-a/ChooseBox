import styled from 'styled-components';
import {Item, Line} from "../Main/styles";

export const Back = styled.button`
  position: absolute;
  background: transparent;
  border: 0;
  top: 21px;
  left: 21px;
  cursor: pointer;
`;

export const BoxContainer = styled.div`
  max-width: 900px;
  margin: 100px auto 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 24px;
`;

export const TitleBox = styled.h1`
  font-size: 21px;
  padding-left: 15px;
  margin-left: 15px;
  border-left: 1px solid #d2d2d2;
`;

export const UploadContainer = styled.div`
  border-radius: 4px;
  padding: 30px;
  text-align: center;
  border: 1px dashed #ddd;
  color: #999;
  cursor: pointer;
  margin: 34px 21px;
`;

export const List = styled.ul`
    margin: 34px 21px;
    list-style: none;
    
    & ${Item}:last-child ${Line} {
      width: 0;
      height: 0;
      margin: 0;
    }
`;

export const CardSide = styled.div`
  display: flex;
  align-items: ${props => props.align && `flex-${props.align}`};
`;

export const TitleFile = styled.strong`
  font-weight: normal;
  font-size: 16px;
  color: #333;
`;

export const TextTime = styled.span`
  color: #999;
  font-size: 13px;
`;

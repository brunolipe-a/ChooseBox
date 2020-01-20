import styled from 'styled-components';

export const Content = styled.div`
    height: 100%;
    display: flex;
`;

export const MainContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

export const Input = styled.input`
    height: 48px;
    border: 1px solid ${props => props.hasError ? "#dc3545" : "#ddd"};
    border-radius: 4px;
    font-size: 16px;
    padding: 0 20px;
    margin-top: 30px;
`;

export const Error = styled.span`
    margin-top: 10px;
    color: #dc3545;
`;

export const Button = styled.button`
    height: 48px;
    background: #454ADE;
    flex-grow: 1;
    flex-basis: 0;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 20px;
    margin: 10px 0 0 10px;
    color: #fff;
    font-weight: bold;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
      opacity: 0.8;
      transition: all .2s;
    }
    
    &.btn-create {
      background: transparent;
      border: 2px solid #454ADE;
      color: #454ADE;
    }
    
    & svg {
      margin-left: 6px;
    }
`;

export const Form = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    
    & ${Button}:first-child {
      margin: 10px 10px 0 0;
    }
`;

export const GroupButtons = styled.div`
    width: 100%;
    flex-wrap: wrap;
    display: flex;
`;

//# Side #\\\

export const Side = styled.div`
    max-width: 250px;
    width: 100%;
    position: fixed;
    right: 0;
    z-index: 1100;
    height: 100%;
    display: flex;
    justify-content: center;
    background: #fff;
    box-shadow: 0 0.46875rem 2.1875rem rgba(8,10,37,.03),
    0 0.9375rem 1.40625rem rgba(8,10,37,.03),
    0 0.25rem 0.53125rem rgba(8,10,37,.05),
    0 0.125rem 0.1875rem rgba(8,10,37,.03);
    transition: all 0.5s ease 0s;
    transform: ${props => props.isOpen ? "" : "translate3d(93%, 0px, 0px)" };
`;

export const Arrow = styled.span`
    top: 10%;
    right: 238px;
    position: absolute;
    display: block;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #454ADE;
    color: #fff;
    transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s;
    transform-origin: center center;
    transform: ${props => props.isOpen ? "rotate(180deg)" : "rotate(0deg)" };
`;

export const Item = styled.li``;

export const ItemCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    background: ${props => props.bg || "#FFF"};
    border-radius: 4px;
    padding: 8px 13px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(8,10,37,.03),
    0 0.9375rem 1.40625rem rgba(8,10,37,.03),
    0 0.25rem 0.53125rem rgba(8,10,37,.05),
    0 0.125rem 0.1875rem rgba(8,10,37,.03);
`;

export const CardInfo = styled.span`
    margin: ${props => props.margin && props.margin};
    display: flex;
    flex-direction: column;
`;

export const SmallButton = styled.button`
    margin: ${props => props.margin ? props.margin : "5px 0 0 2px"};
    border: 0;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: ${props => props.size ? `${props.size}px` : "initial"};
    color: ${props => props.color || "initial"};
  
    & svg {
      margin-left: 4px;
    }
`;

export const Line = styled.div`
    width: 100%;
    margin: 0 0 15px;
    height: 1px;
    background: #d2d2d2;
`;

export const List = styled.ul`
    width: 100%;
    margin: 21px 28px;
    list-style: none;
    
    & ${Item}:last-child ${Line} {
      width: 0;
      height: 0;
      margin: 0;
    }
`;

export const Circule = styled.span`
    display: block;
    height: 25px;
    width: 25px;
    line-height: 25px;
    border-radius: 50%;
    background-color: #454ADE;
    color: white;
    text-align: center;
`;
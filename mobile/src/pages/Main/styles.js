import styled from 'styled-components/native';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 30px;
  background: #F1F4FA;
`;

export const Logo = styled.Image`
align-self: center;
`;

export const Input = styled.TextInput`
    height: 48px;
    border: 1px solid ${(props) => (props.hasError ? '#dc3545' : '#ddd')};
    border-radius: 4px;
    background: #fff;
    font-size: 16px;
    padding: 0 20px;
    margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
    height: 48px;
    background: ${(props) => (props.bg ? props.bg : '#454ADE')};
    flex-grow: 1;
    flex-direction: row;
    border-radius: 4px;
    padding: 0 20px;
    margin: ${(props) => (props.first ? '10px 5px 0 0' : '10px 0 0 5px')};
    border: ${(props) => (props.border ? props.border : '0')};
    justify-content: center;
    align-items: center;
`;

export const GroupButtons = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${(props) => (props.color ? props.color : '#FFF')};;
  font-weight: bold;
  margin-right: 8px;
`;

export const Error = styled.Text`
    margin-top: 10px;
    color: #dc3545;
`;

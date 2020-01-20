import { Platform } from 'react-native';
import styled from 'styled-components/native';

import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';


export const Container = styled.View`
position: relative;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0};
    flex: 1;
    z-index: -1;
    background: #F1F4FA;
`;

export const BoxTitle = styled.Text`
    position: relative;
    margin-top: 50px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    z-index: -1;
`;

export const List = styled.FlatList`
    margin-top: 20px;
    padding: 5px;
`;

export const File = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 4px;
  background: #FFF;
  margin: 8px 0;
  border-radius: 10px;  
  height: 75px;
`;

export const Line = styled.View`
    height: 1px;
    background: #eee;
`;

export const FileInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FileTitle = styled.Text`
  font-size: 16px;
  color: #333;
  margin-left: 10px;
  width: 150px;
`;

export const FileTime = styled.Text`
  font-size: 14px;
  color: #666;
  flex-wrap: wrap;
  flex: 1;
  text-align: center;
`;

export const FaB = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: ${40 + getBottomSpace()}px;
  width: 60px;
  height: 60px;
  background-color: #454ADE;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

export const Back = styled.TouchableOpacity`
  position: absolute;
  background: transparent;
  border: 0;
  top: ${getStatusBarHeight() + 15};
  left: 15px;
`;

import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import {
  Button, Container, GroupButtons, Input, Logo, ButtonText, Error,
} from './styles';

export default function Main(props) {
  const [hasError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function getStorage() {
      const box = await AsyncStorage.getItem('@ChooseBox:box');
      if (box) {
        props.navigation.navigate('Box');
      }
    }
    getStorage();
  }, []);

  async function handleAccess() {
    const response = await api.post('access', {
      title: inputValue,
    });

    if (response.data.exists) {
      await AsyncStorage.setItem('@ChooseBox:box', response.data._id);
      props.navigation.navigate('Box');
    } else {
      setError(true);
      setErrorMsg('Box inexistente. Você pode criá-lo se quiser!');
    }
  }

  async function handleCreate() {
    const response = await api.post('boxes', {
      title: inputValue,
    });

    if (response.data.error) {
      setError(true);
      setErrorMsg('Box já criado. Você pode acessá-lo se quiser!');
    } else {
      await AsyncStorage.setItem('@ChooseBox:box', response.data._id);
      props.navigation.navigate('Box');
    }
  }

  function handleInputFocus() {
    if (hasError) {
      setError(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Logo source={logo} />
        <Input
          placeholder="Nome do Box..."
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          onFocus={handleInputFocus}
          hasError={hasError}
          autoCompleteType="off"
        />
        {hasError && <Error>{errorMsg}</Error>}
        <GroupButtons>
          <Button first bg="transparent" border="2px solid #454ADE" onPress={handleCreate}>
            <ButtonText color="#454ADE">Criar</ButtonText>
            <Icon name="plus" size={14} color="#454ADE" />
          </Button>
          <Button onPress={handleAccess}>
            <ButtonText>Entrar</ButtonText>
            <Icon name="dropbox" size={16} color="#FFF" />
          </Button>
        </GroupButtons>
      </Container>
    </TouchableWithoutFeedback>
  );
}

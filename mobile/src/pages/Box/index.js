import React, { useEffect, useState } from 'react';
import socket from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ImagePicker from 'react-native-image-picker';
import RFNS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import api from '../../services/api';
import {
  Container, List, File, BoxTitle, FaB, FileInfo, FileTime, FileTitle, Line, Back,
} from './styles';

const io = socket('http://www.apibox.gochoose.xyz');

export default function Box(props) {
  const [box, setBox] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    io.open();
    async function getStorage() {
      const boxId = await AsyncStorage.getItem('@ChooseBox:box');
      const response = await api.get(`/boxes/${boxId}`);
      setBox(response.data);
      setFiles(response.data.files);
      io.emit('connectRoom', boxId);
    }
    getStorage();
  }, []);

  useEffect(() => {
    io.once('file', (data) => {
      setFiles([data, ...files]);
    });
  }, [files]);

  async function handleBack() {
    await AsyncStorage.removeItem('@ChooseBox:box');
    io.disconnect();
    props.navigation.navigate('Main');
  }

  function handleUpload() {
    ImagePicker.launchImageLibrary({}, async (upload) => {
      if (upload.error) {
        return upload.error;
      } if (upload.didCancel) {
        return upload.didCancel;
      }
      const data = new FormData();

      const [prefix, sufix] = upload.fileName.split('.');

      const ext = sufix.toLowerCase() === 'heic' ? 'jpg' : sufix;

      data.append('file', {
        uri: upload.uri,
        type: upload.type,
        name: `${prefix}.${ext}`,
      });

      const boxId = await AsyncStorage.getItem('@ChooseBox:box');

      api.post(`boxes/${boxId}/file`, data);
    });
  }

  // eslint-disable-next-line consistent-return
  async function openFile(file) {
    try {
      const filePath = `${RFNS.DocumentDirectoryPath}/${file.title}`;

      await RFNS.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (e) {
      return e;
    }
  }

  function renderItem({ item }) {
    return (
      <File onPress={() => openFile(item)}>
        <FileInfo>
          <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
          <FileTitle numberOfLines={1}>{item.title}</FileTitle>
        </FileInfo>
        <FileTime>
          {'há '}
          {formatDistance(new Date(item.createdAt), new Date(), { locale: pt })}
        </FileTime>
      </File>
    );
  }

  return (
    <Container>
      <Back onPress={handleBack}>
        <Icon name="arrow-back" color="#333" size={40} />
      </Back>
      <BoxTitle>{box.title}</BoxTitle>
      <List
        data={files}
        keyExtractor={(file) => file._id}
        ItemSeparatorComponent={() => <Line />}
        renderItem={renderItem}
      />
      <FaB onPress={handleUpload}>
        <Icon name="cloud-upload" size={24} color="#FFF" />
      </FaB>
    </Container>
  );
}

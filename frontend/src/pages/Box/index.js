import React, {useState, useEffect} from "react";
import useTypewriter  from 'react-typewriter-hook';
import {formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client'
import Swal from 'sweetalert2';
import {MdInsertDriveFile, MdArrowBack} from 'react-icons/md'
import {GoTrashcan} from 'react-icons/go'

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import {
    Back,
    BoxContainer,
    CardSide,
    Header,
    List, TextTime,
    TitleBox,
    TitleFile,
    UploadContainer
} from './styles';

import {
    CardInfo,
    Item,
    ItemCard,
    Line, SmallButton
} from '../Main/styles';


const io = socket("http://www.apibox.gochoose.xyz");

export default function Box(props) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        onClose: () => {
            handleBack()
        }
    });

    const [box, setBox] = useState({
        title: "Seu box"
    });
    const [files, setFiles] = useState([]);
    const box_id = props.match.params.id;
    const typing = useTypewriter(box.title);

    useEffect(() => {
        io.emit('connectRoom', box_id);
        async function getApi() {
            const response = await api.get(`/boxes/${box_id}`);
            setBox(response.data);
            setFiles(response.data.files);
        }
        getApi()
    }, []);

    useEffect( () =>{
        io.on('file', function (data) {
            setFiles([data, ...files])
        })
    }, [files]);

    useEffect( () =>{
        io.on('deleteFile', function (data) {
            setFiles(
                files.filter(file => { return file._id !== data })
            );
        })
    }, [files]);

    useEffect( () =>{
        io.on('beenDelete', function () {
            Toast.fire({
                icon: 'warning',
                title: 'Esse box foi deletado e você será redirecionado...'
            });
        })
    }, []);

    async function handleUpload(files) {
        files.forEach(file => {
            const data = new FormData();

            data.append('file', file);
            api.post(`boxes/${box_id}/file`, data);
        })
    }

    async function handleDelete(id) {
        const oldFiles = files;
        setFiles(files.filter(file => {return file._id !== id}));
        const response = await api.delete(`files/${id}/delete`);

        if(!!response.data.error){
            setFiles(oldFiles);
        }
    }

    function handleBack() {
        props.history.push(`/`);
    }

    return (
        <>
            <Back onClick={handleBack}><MdArrowBack size={36}/></Back>
            <BoxContainer>
                <Header>
                    <img src={logo} alt=""/>
                    <TitleBox>{typing}</TitleBox>
                </Header>

                <Dropzone onDropAccepted={handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <UploadContainer {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <p>Arraste arquivos ou clique aqui!</p>
                        </UploadContainer>
                    )}
                </Dropzone>

                <List>
                    {files && files.map(file => (
                        <Item key={file._id}>
                            <ItemCard>
                                <CardSide align={"start"}>
                                    <MdInsertDriveFile size={32} color={"#A5CFFF"}/>
                                    <CardInfo margin={"0 0 0 10px"}>
                                        <TitleFile>{file.title}</TitleFile>
                                        { !!file.url && (
                                          <SmallButton size={"12"} color={"#e57878"} onClick={() => handleDelete(file._id)}>
                                              Excluir
                                              <GoTrashcan/>
                                          </SmallButton>
                                        )}
                                    </CardInfo>
                                </CardSide>
                                <CardSide align={"end"}>
                                    <CardInfo>
                                        <TextTime>há{" "}{formatDistance(new Date(file.createdAt), new Date(),{locale: pt})}</TextTime>
                                    </CardInfo>
                                </CardSide>
                            </ItemCard>
                            <Line />
                        </Item>
                    ))}
                </List>
            </BoxContainer>
        </>
    );
}
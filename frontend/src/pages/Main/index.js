import React, {useEffect, useState} from "react";
import {FaBoxOpen, FaTrash} from 'react-icons/fa';
import {GoPlus} from 'react-icons/go';
import {MdKeyboardArrowLeft} from 'react-icons/md';
import socket from 'socket.io-client'

import logo from '../../assets/logo.svg';
import api from '../../services/api';
import {
    Side,
    Arrow,
    List,
    SmallButton,
    Line,
    Item,
    ItemCard,
    CardInfo,
    Circule,
    Content,
    MainContainer,
    Form,
    Input,
    Error,
    Button,
    GroupButtons
} from './styles';

const io = socket("http://www.apibox.gochoose.xyz");

export default function Main(props) {
    const [hasError, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        async function getApi() {
            const response = await api.get(`/boxes`);
            setBoxes(response.data);
        }
        getApi();
    },[]);

    useEffect(() => {
        io.on('box', function (data) {
            setBoxes([data, ...boxes])
        })
    },[boxes]);

    useEffect( () =>{
        io.on('deleteBox', function (data) {
            setBoxes(
                boxes.filter(box => { return box._id !== data })
            );
        })
    }, [boxes]);

    async function handleAccess() {
        const response = await api.post('access', {
            title: inputValue
        });

        if(response.data.exists) {
            props.history.push(`/box/${response.data._id}`);
        }
        else {
            setError(true);
            setErrorMsg('Box inexistente. Você pode criá-lo se quiser!');
        }
    }

    async function handleCreate() {
        const response = await api.post('boxes', {
            title: inputValue
        });
        if(!!response.data.error) {
            setError(true);
            setErrorMsg('Box já criado. Você pode acessá-lo se quiser!');
        }
        else {
            props.history.push(`/box/${response.data._id}`);
        }
    }

    async function handleDelete(id) {
        const oldBoxes = boxes;
        setBoxes(boxes.filter(box => {return box._id !== id}));
        const response = await api.delete(`boxes/${id}/delete`);

        if(!!response.data.error){
            setBoxes(oldBoxes);
        }
    }

    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    function handleInputFocus() {
        if(hasError) {
            setError(false);
        }
    }

    function handleClickSide() {
        setIsOpen(!isOpen);
    }

    function handleOpenBox(id) {
        props.history.push(`/box/${id}`);
    }

    return (
        <Content>
             <MainContainer>
                 <Form>
                     <img src={logo} alt=""/>
                     <Input
                         placeholder="Nome do box..."
                         value={inputValue}
                         onChange={handleInputChange}
                         onFocus={handleInputFocus}
                         hasError={hasError}
                     />
                     {hasError && <Error>{errorMsg}</Error>}
                     <GroupButtons>
                         <Button className="btn-create" onClick={handleCreate}>Criar <GoPlus/></Button>
                         <Button className="icon" onClick={handleAccess}>Entrar <FaBoxOpen/></Button>
                     </GroupButtons>
                 </Form>
            </MainContainer>
            <Side isOpen={isOpen} id="side">
                    <Arrow isOpen={isOpen}>
                        <MdKeyboardArrowLeft onClick={handleClickSide}  size={24}/>
                    </Arrow>
                    <List>
                        {boxes && boxes.map(box => (
                            <Item key={box._id}>
                                <ItemCard bg={'#F3EFF5'}>
                                    <CardInfo>
                                        <SmallButton margin={"5px 0"} onClick={() => handleOpenBox(box._id)}>{box.title}</SmallButton>
                                        <SmallButton color={"#7159c1"} size={12} onClick={() => handleDelete(box._id)}>
                                            Excluir
                                            <FaTrash/>
                                        </SmallButton>
                                    </CardInfo>
                                    <Circule>{box.files.length}</Circule>
                                </ItemCard>
                                <Line />
                            </Item>
                        ))}
                    </List>
            </Side>
        </Content>
    );
}
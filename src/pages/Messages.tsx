import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router';
import InputBar from '../Components/InputBar';
import Message, { IMessage } from '../Components/Message';
import { IResponse, ISendMessage } from '../interfaces/IReponse';
import { browser } from "../styles/_Messages.module.scss"
import SocketIO, { Socket } from "socket.io-client"

function Messages() {

    const [cookies, setCookies, delCookie] = useCookies();

    const [inputval, setInputval] = useState("");   
    const [io, setIo] = useState<Socket>();
    const [messages, setMessages] = useState<IMessage[]>([]);   

    const history = useHistory();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollIntoView() 
        // Scroll to bottom
        // { behavior: "smooth" }, when spam, doesn't scroll
    }, [messages])


    useEffect(() => { // Verify if session valid
        if (cookies.auth == null) history.push("/login")
        const io = SocketIO(`${process.env.SERVER_URL}`);
        setIo(io);
        if (cookies.auth == null) return;

        axios({
            url: `${process.env.SERVER_URL}/api/verify?auth=${cookies.auth}`,
            method: "GET"
        }).then(e => {
            const data: IResponse = e.data;
            if (!data.success) {
                delCookie("auth");
                history.push("/login")
            }
        })

        io.on("new:message", (message: IMessage) => {
            setMessages(prev => [...prev, message]);
        })

        io.emit("login", cookies.auth);
    }, []);


    function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key != "Enter" || inputval.length < 1) return;

        setInputval("");
        io.emit("send:message", inputval)
    }

    return (
        <div className={browser}>
            {
                messages.map((m, index) => <Message key={index} {...m} />)
            }
            <div ref={bottomRef}></div>
            <InputBar val={inputval} keyUp={sendMessage} setValue={setInputval} />
        </div>
    )
}

export default Messages

import React from 'react'
import { background, Sender, backgroundSender } from "../styles/_Message.module.scss";

export interface IMessage {
    sender: string
    message: string
    IsSender: boolean
}

function Message({ message, sender, IsSender }: IMessage) {
    return (
        <div className={IsSender ? backgroundSender : background}>
            {
                !IsSender && <p className={Sender}>{sender}</p>
            }
            <p>{message}</p>
        </div>
    )
}

export default Message

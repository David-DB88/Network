import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
type ChatMessageType ={
    message: string,
    photo:   string,
    userId?: number,
    userName: string
}
const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}
const Messages: React.FC = () => {
    const [messages, setMessages]= useState<ChatMessageType[]>([])
    useEffect(()=>{
        ws.addEventListener('message', (e)=>{
            setMessages((prevMessages)=>[...prevMessages, ...JSON.parse(e.data)])
        })
    },[])
    return <div>
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((item, index) => <Massage message = {item} key={index}/>)}
        </div>

    </div>
}
const Massage: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return <div>
                <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
                  <br/>
                   {message.message}
               <hr/>
           </div>
}

const AddMessageForm: React.FC = () => {
const [messageValue, setMessageValue]=useState('')
    const sendMessage=()=>{
    if(!messageValue){
        return
    }
        ws.send(messageValue)
        setMessageValue('')
    }

    return <div>
        <div>
            <textarea onChange={(e)=>setMessageValue(e.target.value)} value={messageValue}></textarea>
        </div>
        <div>
            <Button onClick={sendMessage}>Send</Button>
        </div>
    </div>
}


export default ChatPage
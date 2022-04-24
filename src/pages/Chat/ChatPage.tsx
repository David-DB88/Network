import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";


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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

            useEffect(()=>{
                let ws: WebSocket
                const closeHandler = ()=>{
                    console.log(1111111)
                    setTimeout(creatChannel, 3000)
                }
                function creatChannel(){
                    ws?.removeEventListener('close', closeHandler)
                    ws?.close()
                    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
                    ws.addEventListener('close', closeHandler)
                    setWsChannel(ws)
                }
                    creatChannel()
                return()=>{
                    ws?.removeEventListener('close', closeHandler)
                    ws?.close()
                }
            },[])

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}


const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages]= useState<ChatMessageType[]>([])
    useEffect(()=>{
        let messageHandler = (e: MessageEvent)=>{
            setMessages((prevMessages)=>[...prevMessages, ...JSON.parse(e.data)])
        };
        wsChannel?.addEventListener('message',messageHandler)

        return()=>{
            wsChannel?.removeEventListener('message', messageHandler)
        }
    },[wsChannel])
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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
const [messageValue, setMessageValue]=useState('')
const [readyStatus, setReadyStatus]=useState<'pending' | 'ready'>('pending')
    useEffect(()=>{
        let openHandler = ()=>{
            setReadyStatus('ready')
        };
        wsChannel?.addEventListener('open', openHandler)

        return()=>{
            wsChannel?.removeEventListener('open', openHandler)
        }
    },[wsChannel])

    const sendMessage=()=>{
    if(!messageValue){
        return
    }
        wsChannel?.send(messageValue)
        setMessageValue('')
    }

    return <div>
        <div>
            <textarea onChange={(e)=>setMessageValue(e.target.value)} value={messageValue}></textarea>
        </div>
        <div>
            <Button disabled={readyStatus === "pending"} onClick={sendMessage}>Send</Button>
        </div>
    </div>
}


export default ChatPage
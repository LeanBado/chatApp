import { useEffect, useState } from "react"
import { COLLECTION_ID_MESSAGES, databases, DATABASE_ID } from "./appWriteConfig"

const Room = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getMessages()

    }, [])

    const getMessages = async () =>{
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES);
        console.log('response', response)
        setMessages(response.documents)
    }

  return (
    <main className="container">
        <div className="room--container">
            <div>
                {messages.map(message =>(
                    <div key={message.$id} className='message--wrapper'>
                        <div className="message--header">
                            <small className="message-timestamp">{message.$createdAt}</small>
                        </div>
                        <div className="message--body">
                            <span>{message.body}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>            
    </main>
  )
}

export default Room
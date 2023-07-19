import { ID, Query } from "appwrite"
import { useEffect, useState } from "react"
import { Trash2 } from "react-feather"
import Header from "../components/Header"
import client, { COLLECTION_ID_MESSAGES, databases, DATABASE_ID } from "./appWriteConfig"


const Room = () => {
    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('');

    useEffect(() => {
        getMessages()

       const unsuscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

            if(response.events.includes('databases.*.collections.*.documents.*.create')){
                setMessages(prevState => [response.payload, ...prevState])
                console.log('evento creado')
            } else if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id ))
                console.log('evento eliminado')
            }
        });
        return () => {
            unsuscribe()
        }

    }, [])


    const handlesubmit = async(event) => {
        event.preventDefault()

        let payload = {
            body: messageBody,
        }

        const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), payload)

        //setMessages([response, ...messages])

        setMessageBody('')
    }

    const getMessages = async () =>{
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_MESSAGES,
          [
            Query.orderDesc("$createdAt"),
            
        ]
        );
        setMessages(response.documents)
    }
  
    const deleteMessage = async (messageID) => {

        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, messageID);

       //setMessages(messages.filter(message => message.$id !== messageID ))
        
    }

  return (
    <main className="container">
        <Header></Header>
            <div className="room--container">
                <form onSubmit={handlesubmit} id="message--form">
                    <div>
                        <textarea required maxLength='100' placeholder="Say something..." onChange={(event) => {setMessageBody(event.target.value)}} value={messageBody}>

                        </textarea>
                    </div>
                    <div className="send-btn--wrapper">
                        <input type='submit' value='Send' className="btn btn--secondary"></input>
                    </div>
                </form>
                <div>
                    {messages.map(message =>(
                        <div key={message.$id} className='message--wrapper'>
                            <div className="message--header">
                                <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                                <Trash2 onClick={() => deleteMessage(message.$id)} className='delete--btn'></Trash2>
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
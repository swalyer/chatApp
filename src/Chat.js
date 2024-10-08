import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore"; // Функции Firestore
import React, { useEffect, useState } from "react";
import { db, storage } from "./firebaseConfig"; // Экспортированные сервисы

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (file) {
      const fileRef = storage.ref(`files/${file.name}`);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();

      await addDoc(collection(db, "messages"), {
        text: message,
        fileUrl,
        timestamp: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, "messages"), {
        text: message,
        timestamp: serverTimestamp(),
      });
    }

    setMessage("");
    setFile(null);
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
            {msg.fileUrl && <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">Download file</a>}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

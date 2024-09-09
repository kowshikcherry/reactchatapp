import './App.css'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';
import EachMessage from './EachMessage';

const App = () => {
  const [chatList, setChatList] = useState([]);
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null); // Ref for emoji picker div
  const emojiButtonRef = useRef(null); // Ref for emoji button

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle emoji click
  const handleEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  // Scroll to bottom when chatList changes
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // Handle click outside the emoji picker and the emoji button
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the emoji picker and the emoji button
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowPicker(false); // Close emoji picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userList = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const randomNumber = Math.floor(Math.random() * userList.length);

  // Send message function
  const onSend = () => {
    // setText(prevText => prevText.trimStart());
    if (text.trim() !== ''){
      const currentTime = new Date().toLocaleTimeString();
      const newMessage = {
        id: uuidv4(),
        messege: text,
        currentTime:currentTime,
        randomUser: userList[randomNumber],
        randomNumber:randomNumber
      };
      setChatList((prevChatList) => [...prevChatList, newMessage]);
      setText('');
      setShowPicker(false); // Close emoji picker after sending the message
    }
  };

  // Send message on 'Enter' key press
  const onKeyDownFun = (event) => {
    setShowPicker(false)
    if (event.key === 'Enter') {
      onSend()
    }
  };

  // Toggle emoji picker and scroll to bottom
  const onClickForScrollAndPicker = () => {
    setShowPicker(!showPicker);
    // scrollToBottom();
  };


  const onSetText = (event) => {
    setText(event.target.value)
  }

  
  return (
    <div className='maindiv1'>
      <ul className='messagesUl'>
        {chatList.map(i => <EachMessage key={i.id} i={i} />)}
        <div ref={messagesEndRef}></div>
      </ul>

      <div className='inputandemojiDiv'>
        <button
          onClick={onClickForScrollAndPicker}
          className='emojibutton'
          ref={emojiButtonRef} // Reference to the emoji button
        >
          😊
        </button>
        <input
          className='inputelement'
          type="text"
          value={text}
          onChange={onSetText}
          onKeyDown={onKeyDownFun}
          placeholder="Type Message..."
        />
        <div className='sendButtonDiv'>
          {text.trim().length > 0 && <button className='sendbutton' onClick={onSend}>➤</button>}
        </div>
      </div>

      {showPicker && (
        <div className="emoji-picker" ref={emojiPickerRef}>
          <EmojiPicker onClick={scrollToBottom} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default App;

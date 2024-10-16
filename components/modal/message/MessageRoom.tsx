'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getChat } from '../../../api/chat/getChat';
import useLoggedInUserData from '../../../hooks/user/useLoggedInUserData';
import { ChatComponentProps } from '../../../constants/interface';
import CloseButtonIcon from '../../../public/assets/svg/close.svg';
import Image from 'next/image';
import ShopIcon from '../../../public/assets/svg/shop-icon.svg';
import UserActiveIcon from '../../../public/assets/svg/user-active-icon.svg';
import MessageRound from '../../../public/assets/svg/message-round.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import MessageIconIcon from '../../../public/assets/svg/message-icon-icon.svg';
import MessagePhotoIcon from '../../../public/assets/svg/message-photo-icon.svg';
import MessageFolderIcon from '../../../public/assets/svg/message-folder-icon.svg';
import { postImageChat } from '../../../api/chat/postImageChat';

interface ChatMessage {
  mention: [string];
  content: [string];
  messageType: any;
  sender: string;
  unreadUserCount: number;
}

interface ChatUserInfo {
  participant: string;
  profileUrl: string;
  isActive: boolean;
  isBusiness: boolean;
}

const ChatComponent = ({ clickCloseChatRoom, isChatModalMax }: ChatComponentProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState<any>(null);
  const [chatUserInfo, setChatUserInfo] = useState<ChatUserInfo[]>();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input

  const isChatRoomOpened = useSelector((state: RootState) => state.message.isChatRoomOpened);
  const activateChatRoomId = useSelector((state: RootState) => state.message.activateChatRoomId);

  const { userData } = useLoggedInUserData();
  const userNickName = userData?.data.nickname;

  // Handle file change when user selects a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Store the selected file
    }
  };

  const scrollToBottomAuto = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  const clickIconButton = (e: any) => {
    e.stopPropagation();
    console.log('icon 버튼 클릭...');
  };

  const clickPhotoButton = (e: any) => {
    e.stopPropagation();
    console.log('Photo 버튼 클릭...');

    if (!fileInputRef.current) {
      console.log('File input ref not found');
      return;
    }

    if (file && activateChatRoomId) {
      fileInputRef.current.click();
      postImageChat(file, activateChatRoomId); 
    } else {
      console.log('No file selected or chat room not active');
    }
  };

  const clickFolderButton = (e: any) => {
    e.stopPropagation();
    console.log('Folder 버튼 클릭...');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      console.log('끊음...');
    }

    const socket = new SockJS('http://localhost:8080/ws-stomp');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
    });

    const getBeforeChat = async (chatRoomId: string) => {
      try {
        const result = await getChat(chatRoomId);
        if (result) {
          setMessages(result.data.contents);
          setFirstUnreadMessageId(result.data.firstUnreadMessageId);
          setChatUserInfo(result.data.chatUserInfo);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBeforeChat(activateChatRoomId);

    stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');

      stompClient.subscribe(`/sub/chat/${activateChatRoomId}`, (message: Message) => {
        const receivedMessage: ChatMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    };

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [activateChatRoomId]);

  useEffect(() => {
    scrollToBottomAuto();
  }, [messages]);

  const sendMessage = () => {
    if (clientRef.current && inputMessage.trim()) {
      const messageDto = {
        content: [inputMessage],
        sender: userNickName,
        mention: [],
        messageType: 'TEXT',
      };

      clientRef.current.publish({
        destination: `/pub/chat/${activateChatRoomId}/message`,
        body: JSON.stringify(messageDto),
      });

      setInputMessage('');
    }
  };

  return (
    <div className='w-full h-full z-40 flex flex-col items-center justify-between border-l-[1px] border-t-[1px] border-mainPurple'>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="imageInput"
        ref={fileInputRef} // Use ref here
      />
      
      <div className={`${!isChatRoomOpened && 'hidden'} w-full z-40 flex items-center justify-between`}>
        <div className={`bg-lightPurple flex items-center px-[10px] rounded-l-[24px] z-20 flex-1 ${isChatModalMax ? 'h-[100px]' : 'h-[60px]'} top-0 ${!isChatModalMax && ' translate-y-[-1px]  translate-x-[-50px] border-l-[1px]  border-t-[1px] border-mainPurple'}`}>
          { !isChatModalMax && <MessageRound className='absolute translate-x-[19px] translate-y-[38px]' /> }
          { chatUserInfo && (
            <div className={`${isChatModalMax ? 'w-[62px] h-[62px]' : 'w-[42px] h-[42px]'} flex items-center justify-center border-[2px] border-mainPurple bg-white rounded-full p-[1px]`}>
              <Image
                src={chatUserInfo[0].profileUrl} 
                width={40} height={40} alt={'chatRoomImage'} 
                style={{objectFit: 'cover', width: '100%', height: '100%'}} 
                quality={100} 
                sizes='100vw' 
                className='rounded-full' 
              />
            </div>
          )}
          <div className='flex flex-col pl-[10px]'>
            <div className='flex items-center gap-[4px]'>
              { chatUserInfo && <span className={`font-[700] ${isChatModalMax ? 'text-[16px]' : 'text-[15px]'} `}>{chatUserInfo[0].participant}</span> }
              { chatUserInfo && chatUserInfo[0].isBusiness && <ShopIcon /> }
              { chatUserInfo && chatUserInfo[0].isActive && (
                <>
                  <span className='font-[500] text-[11px] text-textDarkPurple'>지금 활동 중</span>
                  <UserActiveIcon />
                </>
              )}
            </div>
            <div className=''>
              { chatUserInfo && chatUserInfo[0].isBusiness && (
                <span className={`font-[500] ${isChatModalMax ? 'text-[14px]' : 'text-[11px]'}  text-textDarkPurple`}>
                  운영중 09:00 ~ 18:00
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className='w-[30px] h-[20px] flex items-center justify-center'
          onClick={clickCloseChatRoom}
        >
          <CloseButtonIcon />
        </button>
      </div>
      
      <div className={`${!isChatRoomOpened && 'hidden'} w-full flex-1 py-[10px] z-40 flex flex-col gap-[13px] overflow-hidden overflow-y-scroll bg-lightPurple`}>
        {messages.map((message, index) => (
          <div key={index} className={`w-full  flex px-2`}>
            {message.sender === userNickName ? (
              <div className={`inline-block max-w-[60%] rounded-2xl break-words ml-auto bg-mainPurple`}>
                <p className={`py-1 px-2 font-[500] ${isChatModalMax ? 'text-[1rem]' : 'text-[0.625rem]'} text-white break-words`}>
                  {message.content[0]}
                </p>
              </div>
            ) : (
              <div className={`inline-block max-w-[60%] rounded-2xl break-words mr-auto bg-white`}>
                <p className={`py-1 px-2 font-[500] ${isChatModalMax ? 'text-[1rem]' : 'text-[0.625rem]'} text-black break-words`}>
                  {message.content[0]}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={`${!isChatRoomOpened && 'hidden'} w-full h-[126px] flex-col bg-white border-t-[1px]  border-mainPurple`}>
        <div className='flex items-center justify-between w-full h-[30px] px-[5px]'>
          <div className='flex gap-[6px]'>
            <button onClick={clickIconButton}>
              <MessageIconIcon />
            </button>
            <button onClick={clickPhotoButton}>
              <MessagePhotoIcon />
            </button>
            <button onClick={clickFolderButton}>
              <MessageFolderIcon />
            </button>
          </div>
          <div className='flex items-center'>
            <span className={`font-[400] text-[10px] ${inputMessage.length === 1000 ? 'text-red' : 'text-textDarkPurple'}`}>
              {inputMessage.length}
            </span>
            <span className='font-[400] text-[10px] text-textDarkPurple ml-[3px]'>/1000</span>
            <button 
              className='w-[60px] h-[20px] ml-[10px] flex items-center justify-center bg-mainPurple rounded-[30px]'
              onClick={sendMessage}
            >
              <span className='font-[600] text-[12px] text-white'>전송</span>
            </button>
          </div>
        </div>
        <div className='w-full h-[45px]'>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요."
            className='w-full h-full p-2 resize-none outline-none'
            style={{ border: 'none', height: '100%', boxSizing: 'border-box' }}
            maxLength={1000}
            rows={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
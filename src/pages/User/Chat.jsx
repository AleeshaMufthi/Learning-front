import { FaCamera, FaSearch, FaVideo } from "react-icons/fa";
import socket from "../../socket/SocketioClient";
import { useState, useEffect, useRef } from "react";
import { fetchAllMessagesAPI } from "../../api/user";
import { UserChat } from "../../socket/UserChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import '../../style/chat.css'


export const Chat = () => {

    // const student = useSelector((state) => state.user);
    const sender = useSelector((state) => state.user);

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const { instructors, studentMessages, setFetchChange } = UserChat();
    
    const [Instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState();
    const [typingStatus, setTypingStatus] = useState({})
    const [typingTimeout, setTypingTimeout] = useState(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showMediaOptions, setShowMediaOptions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([])
    const [audioStream, setAudioStream] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState({});
    const chatContainerRef = useRef(null)
    const [change, setChange] = useState(false)
    const messageContainerRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() =>{
        if (selectedInstructor) {
            socket.emit("joinedRoom", { sender, selectedInstructor })
        }
    }, [selectedInstructor])
    
    useEffect(() => {
        socket.on("messageRecieved", ({ messageData }) => {
            setMessages((prev) => [...prev, messageData]);
          });

        socket.on('userOnline', (sender) => {
            setOnlineUsers((prev) => ({ ...prev, [sender.userId]: 'online' }));
        })

        socket.on('userOffline', (sender) => {
            setOnlineUsers((prev) => ({ ...prev, [sender.userId]: 'offline' }));
        })

        socket.on('typing', (sender) => {
            console.log(typingTimeout)
            setTypingStatus((prevStatus) => ({
                ...prevStatus,
                [sender.userId]: true,
            }));
        })

        socket.on('stopTyping', (sender) => {
            setTypingStatus((prevStatus) => ({
                ...prevStatus,
                [sender.userId]: false,
            }));
        })

        return () => {
            socket.off("messageRecieved");
            socket.off("typing");
            socket.off("stopTyping");
            socket.off('userOnline');
            socket.off('userOffline');
        };

    }, [])
    

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, typingStatus]);

    const sendMessage = () => {
        if (message.trim() === '') {
            return;
        }
        
        setMessages((prev) => [...prev,{
            _id:'',
            sender: sender.userId,
            senderType: 'Users',
            recipient: selectedInstructor,
            recipientType: 'Tutors',
            message: message,
            type: "text",
            Time:  new Date().toLocaleTimeString([], {  hour: "2-digit",  minute: "2-digit",})}]);
        socket.emit('sendMessage', { sender, recipient: selectedInstructor, message, type:"text"})
        setChange(prevChange => !prevChange);
        setFetchChange(prevChange => !prevChange);
        setMessage('')
    }

    // useEffect(() => {
    //     socket.on("messageRecieved", ({ messageData }) => {
    //         setMessages((prev) => [...prev]);
    //     });

    //     return () => {
    //         socket.off('messageRecieved')
    //     }
    // }, [socket])
    

    useEffect(() => {
        if (instructors && instructors.length > 0) {
            setInstructors([...instructors]);
        }
    }, [instructors])

    console.log(instructors, 'instructorsssssssssssssssssss')

    const fetchAllMessages = async (instructorId) => {
        try {
            const response = await fetchAllMessagesAPI(instructorId);
            return response.data.data; 
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const instructorMessageTimestamps = {};
                
                studentMessages.forEach((message) => {
                    const senderId = message.sender._id;
                    
                    const recipientId = message.recipient._id;
                    
                    const messageTime = new Date(message.Time).getTime();
                    if (senderId === sender?._id) {
                        if (!instructorMessageTimestamps[recipientId] || messageTime > instructorMessageTimestamps[recipientId]) {
                            instructorMessageTimestamps[recipientId] = messageTime;
                        }
                    } else if (recipientId === sender?._id) {
                        if (!instructorMessageTimestamps[senderId] || messageTime > instructorMessageTimestamps[senderId]) {
                            instructorMessageTimestamps[senderId] = messageTime;
                        }
                    }
                });

                const updatedInstructors = instructors?.map((instructor) => ({
                    ...instructor,
                    latestMessageTime: instructorMessageTimestamps[instructor._id] || 0,
                }));
                const sortedInstructors = updatedInstructors.sort(
                    (a, b) => b.latestMessageTime - a.latestMessageTime
                );
                setInstructors(sortedInstructors);
                setSelectedInstructor(sortedInstructors[0]);

            } catch (error) {
                if (error?.data?.message === 'No messages found') {
                    setMessages({});
                }
            }
        };
        fetchData();
    }, [studentMessages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedInstructor) {
                try {
                    const instructorId = selectedInstructor._id;
                    const getAllMessages = await fetchAllMessages(instructorId);
                    console.log(getAllMessages, "getAlllllmessagessssssssssssssssssssssss")
                    setMessages(getAllMessages?.sortedData || []);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };
        fetchMessages();
    }, [selectedInstructor]);

    const onEmojiClick = (emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        socket.emit('typing', {
            roomId: [sender.email, selectedInstructor.email].sort().join("-"), 
            userId: sender.userId })
        setTypingTimeout(
            setTimeout(() => {
                socket.emit("stopTyping", {
                    roomId: [sender.email, selectedInstructor.email].sort().join("-"),
                    userId: sender.userId
                });
            }, 2000)
        );
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <>
            <div className="overflow-hidden fixed w-screen shadow-lg ">

                <div className='main mt-4 mb-5'>
                    <div className="flex flex-col lg:flex-row bg-gray-200 shadow-xl rounded-lg border-2 border-gray-300 h-screen sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl" style={{ height: '85%' }}>
                        <div className="sm:hidden md:flex flex-col border-r-2 lg:w-1/4 sm:max-w-screen-md lg:max-w-full">
                            <div className="relative w-full lg:w-full p-3 border-b-2 bg-buttonGreen">
                                <input
                                    type="text"
                                    className="w-full h-10 pl-10 pr-4 rounded-md mt-3 shadow focus:outline-none"
                                    placeholder="Search"
                                />
                                <div className="absolute inset-y-0 left-2 top-3 flex items-center pl-3 text-black pointer-events-none">
                                    <FaSearch />
                                </div>
                            </div>
                            {Instructors.length ? (
                                <div className="instructor-list flex-1 overflow-y-auto">
                                    {Instructors.map((instructor) => {
                                        return (
                                            <div key={instructor._id} className="flex w-full h-16 border-2 border-gray-700 justify-start items-start p-2" onClick={() => setSelectedInstructor(instructor)}>
                                                <div className="relative">
                                                    <img src={instructor.profileImage} className="w-10 h-10 rounded-full bg-black" alt={instructor.name} />
                                                    {onlineUsers[instructor._id] === 'online' && (
                                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-white"></span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="ml-4 text-xs font-semibold">{instructor.name}</span>
                                                    <div className="ml-4 flex flex-col">
                                                      
                                                    </div>
                                                    {typingStatus[sender._id] && (
                                                        <span className="text-sm text-black ml-2 mt-2">Typing...</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="flex justify-center text-zinc-700 font-semibold">No messages found!</p>
                            )}
                        </div>
                        {selectedInstructor ? (
                            <div className="chat-area flex flex-col w-full h-full">
                                <div className="chat-header flex justify-start items-center border-2 border-sky-100 shadow-md h-16 p-3 gap-5">
                                    {/* <img src={selectedInstructor?.profileImage} className="w-10 h-10 rounded-full bg-black" alt="" /> */}
                                    <img src="https://i.pinimg.com/236x/26/e6/23/26e6237651d3b543359b02f0d9cceaee.jpg" className="w-10 h-10 rounded-full bg-black" alt="" />
                                    <p>{selectedInstructor?.name}</p>
                                    {onlineUsers[selectedInstructor?._id] === 'online' && (
                                        <span className="top-10 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                    )}
                                    {typingStatus[selectedInstructor?._id] && (
                                        <div className="flex">
                                            <div className="typing-indicator">
                                                <div className="bubble"></div>
                                                <div className="bubble"></div>
                                                <div className="bubble"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div ref={messageContainerRef} className="chat-messages flex-1 overflow-y-auto bg-zinc-900">

{
                                        messages.map((data, index) => {
                                            
                                            const isSender = data.sender === sender.userId;
                                            
                                            return (
                                                <div key={index} className={`flex p-1 mb-2 ${isSender ? 'justify-end' : 'justify-start'} my-2`}>
                                                  
                                                    <div className={`inline-block px-2 py-1 rounded-lg shadow-md bg-lime-200 relative flex-col`}>
                                                        <span>{data?.message}</span>
                                                    
                                                        <span className="text-xs self-end ml-2">
                                                            {data.Time}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                    {typingStatus[selectedInstructor?._id] && (
                                    
                                        
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={selectedInstructor?.profileImage}
                                                            className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400"
                                                            alt="image"
                                                        />
                                                        <div className="flex items-center bg-lime-200 rounded-lg shadow-md px-2 py-1">
                                                            <span className="text-md font-semibold text-gray-950">
                                                                typing...
                                                            </span>
                                                            <div className="typing-indicator ml-2 flex items-center">
                                                                <div className="bubble"></div>
                                                                <div className="bubble"></div>
                                                                <div className="bubble"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                </div>
                                <div className="chat-footer flex items-center h-14 border-2 border-sky-200">
                                    <button
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="p-2 bg-sky-100 border-2 border-sky-200 transition-transform duration-300 hover:scale-110"
                                    >
                                        😊
                                    </button>
                                    {showEmojiPicker && (
                                        <div className="absolute bottom-16 z-10 bg-white shadow-lg rounded">
                                            <button
                                                onClick={() => setShowEmojiPicker(false)}
                                                className="text-red-500 p-1"
                                            >
                                                ✕
                                            </button>
                                            <Picker onEmojiClick={onEmojiClick} />
                                        </div>
                                    )}
                                    {showMediaOptions && (
                                        <div className="absolute flex justify-between items-center gap-5 bottom-16 z-10 bg-white shadow-lg rounded p-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, "image")}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="flex text-center p-1 cursor-pointer transition-transform duration-300 hover:scale-110"
                                            >
                                                <FaCamera />
                                            </label>
                        
                                            {/* <button
                                                onClick={isRecording ? stopRecording : startRecording}
                                                className="flex text-center p-1 cursor-pointer transition-transform duration-300 hover:scale-110"
                                            >
                                                <span className="text-sm font-semibold flex items-center">
                                                    {isRecording && <span className="text-red-500 mr-1">🔴</span>}
                                                    <FontAwesomeIcon icon={faMicrophone} />
                                                </span>
                                            </button> */}
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => handleFileUpload(e, "video")}
                                                className="hidden"
                                                id="video-upload"
                                            />
                                            <label
                                                htmlFor="video-upload"
                                                className="flex text-center p-1 cursor-pointer transition-transform duration-300 hover:scale-110"
                                            >
                                                <FaVideo />
                                            </label>
                                            <button
                                                onClick={() => setShowMediaOptions(false)}
                                                className="block w-full text-sm font-semibold p-2 text-zinc-600 mt-2 border-red-300 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setShowMediaOptions(!showMediaOptions)}
                                        className="p-3 bg-sky-100 border-2 border-sky-200 text-gray-500 transition-transform duration-300 hover:scale-110"
                                    >
                                        📷
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type your message"
                                        value={message}
                                        onChange={handleTyping}
                                        className="flex-1 p-2 border-2 border-sky-200 rounded-l-lg focus:outline-none"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="flex justify-center items-center font-semibold bg-green-900 text-center w-20 h-10 text-white rounded-md"                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-white">
                                <h1>Select a user to chat with</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}


import { FaCamera, FaSearch, FaVideo, FaPaperclip, FaAudible } from "react-icons/fa";
import socket from "../../socket/SocketioClient";
import { useState, useEffect, useRef } from "react";
import { fetchAllMessagesAPI } from "../../api/user";
import { UserChat } from "../../socket/UserChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import '../../style/chat.css'
import { handlefileUpload } from "../../utils/cloudinary";


export const Chat = () => {

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
    const [onlineUsers, setOnlineUsers] = useState({});
    const chatContainerRef = useRef(null)
    const [change, setChange] = useState(false)
    const messageContainerRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const [uploadedMedia, setUploadedMedia] = useState({}); 
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        if (selectedInstructor) {
            socket.emit("joinedRoom", { sender, selectedInstructor })
        }
    }, [selectedInstructor])
    
    useEffect(() => {
        socket.on("messageRecieved", ({ messageData }) => {
            setMessages((prev) => [...prev, messageData])
          });

        socket.on("userStatus", ({ email, status }) => {
            setOnlineUsers((prev) => ({ ...prev, [email]: status }));
          });

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
            socket.off("userStatus");
            socket.off("typing");
            socket.off("stopTyping");
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
    

    useEffect(() => {
        if (instructors && instructors.length > 0) {
            setInstructors([...instructors]);
        }
    }, [instructors])

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
                    setMessages(getAllMessages?.sortedData || []);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };
        fetchMessages();
    }, [selectedInstructor]);

    const onEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
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

    const handleFileUpload = async (e, type) => {
      const file = e.target.files?.[0];
      if (!file) return;
          try {
            setLoading(true); 
              const formData = new FormData();
              formData.append("file", file);
              formData.append('upload_preset', 'brain-booster');

              const upload = await handlefileUpload(formData);
              console.log(upload, 'uploadddddddddd');
              
              const mediaUrl = upload.url;
              console.log(mediaUrl, 'media url');
              
              setUploadedMedia((prev) => ({ ...prev, [type]: mediaUrl }));

              setMessages((prev) => [...prev,{
                _id:'',
                sender: sender.userId,
                senderType: 'Users',
                recipient: selectedInstructor,
                recipientType: 'Tutors',
                message: mediaUrl,
                type: type,
                Time:  new Date().toLocaleTimeString([], {  hour: "2-digit",  minute: "2-digit",})}]);
              
              socket.emit('sendMessage', { sender, recipient: selectedInstructor, message: mediaUrl, type });

          } catch (error) {
              console.log(error)
          } finally{
            setLoading(false);
          }
  };

    return (
        <>
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        <div className="flex-1 flex flex-col lg:flex-row bg-gray-200 shadow-xl rounded-lg border-2 border-gray-300 h-full sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white border-r border-gray-300 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {Instructors.length ? (
              Instructors.map((instructor) => (
                <div
                  key={instructor._id}
                  className="flex items-center p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedInstructor(instructor)}
                >
                  <div className="relative">
                    {/* <img src={instructor.profileImage} className="w-12 h-12 rounded-full object-cover" alt={instructor.name} /> */}
                    <img src="https://i.pinimg.com/236x/ad/57/b1/ad57b11e313616c7980afaa6b9cc6990.jpg" className="w-12 h-12 rounded-full object-cover" alt={instructor.name} />
                    {onlineUsers[instructor.email] === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-semibold text-gray-800">{instructor.name}</p>
                    {typingStatus[instructor._id] && (
                      <p className="text-sm text-gray-500">Typing...</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No instructors found!</p>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          {selectedInstructor ? (
            <>
              <div className="flex items-center p-4 border-b border-gray-200 bg-white">
                {/* <img src={selectedInstructor.profileImage} className="w-10 h-10 rounded-full object-cover" alt={selectedInstructor.name} /> */}
                <img src="https://img.freepik.com/premium-photo/beautiful-british-girl-white-sweater_146105-51507.jpg?semt=ais_hybrid" className="w-10 h-10 rounded-full object-cover" alt={selectedInstructor.name} />
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">{selectedInstructor.name}</p>
                  {onlineUsers[selectedInstructor.email] === 'online' && (
                    <p className="text-sm text-green-500">Online</p>
                  )}
                </div>
                {typingStatus[selectedInstructor._id] && (
                  <div className="ml-auto flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Typing</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900">
                {messages.map((data, index) => {
                  const isSender = data.sender === sender.userId
                  return (
                   
                    <div key={index} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${isSender ? 'bg-green-500 text-white' : 'bg-lime-200 text-gray-800'}`}>

                  
                       
                        {data.type === "text" ? (
                        <p>{data.message}</p>
                        ) : data.type === "image" ? (
                          <img src={data.message} alt="uploaded" className="w-full max-w-sm" />
                        ) : data.type === "video" ? (
                          <video controls className="w-full max-w-md" src={data.message} type="video">
                        Your browser does not support the video tag.
                        </video>
                        ) : data.type === "audio" ? (
                        <audio controls src={data.message} type="audio">
                      Your browser does not support the audio element.
                      </audio>
                      ) : (
                     <p>Unsupported file type</p>
                      )}
                        <p className="text-xs mt-1 text-right">{data.Time}</p>
                      </div>
                    </div>
                  )
                })}
                {typingStatus[selectedInstructor._id] && (
                  <div className="flex items-center gap-2">
                    {/* <img
                      src={selectedInstructor.profileImage}
                      className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400"
                      alt="Instructor"
                    /> */}
                    <img src="https://img.freepik.com/premium-photo/beautiful-british-girl-white-sweater_146105-51507.jpg?semt=ais_hybrid" className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400" alt={selectedInstructor.name} />
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
              {loading && (
                      <div className="flex items-center justify-center mt-2">
                        <div className="w-5 h-5 border-2 border-t-2 border-green-600 rounded-full animate-spin"></div>
                        <span className="ml-2 text-green-950 font-bold">Uploading...</span>
                      </div>
              )}
              <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-full"
                  >
                    😊
                  </button>
                  <button
                    onClick={() => setShowMediaOptions(!showMediaOptions)}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-full"
                  >
                    <FaPaperclip />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={handleTyping}
                    className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Send
                  </button>
                </div>
                {showEmojiPicker && (
                    <div className="absolute bottom-20 right-4 z-10">
                        <div className="relative">
                            <button
                                onClick={() => setShowEmojiPicker(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                             Cancel   {/* <FaTimes /> */}
                            </button>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    </div>
                )}
                {showMediaOptions && (
                  <div className="absolute bottom-20 left-4 z-10 bg-white shadow-lg rounded-lg p-4 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "image")}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      <FaCamera className="text-gray-500" />
                      <span>Upload Image</span>
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, "video")}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      <FaVideo className="text-gray-500" />
                      <span>Upload Video</span>
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileUpload(e, "audio")}
                      className="hidden"
                      id="audio-upload"
                    />
                    <label
                      htmlFor="audio-upload"
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      <FaAudible className="text-gray-500" />
                      <span>Upload Audio</span>
                    </label>
                    <button
                      onClick={() => setShowMediaOptions(false)}
                      className="w-full text-center p-2 text-red-500 hover:bg-red-100 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select an instructor to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
        </>

    )
}


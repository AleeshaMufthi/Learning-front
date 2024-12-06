import { FaSearch, FaUser, FaPaperclip, FaVideo, FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TutorChat } from "../../socket/TutorChat";
import { useRef, useState, useEffect } from "react";
import socket from "../../socket/SocketioClient";
import { fetchTutorMessagesAPI } from "../../api/tutor";
import { getTimeFromDateTime } from "../../socket/date";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import '../../style/chat.css'

export const Chat = () => {

    const instructor = useSelector((state) => state.tutor)
    const sender = useSelector((state) => state.tutor);
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    // const [sender, setSender] = useState()
    const [selectedStudent, setSelectedStudent] = useState()
    const { students, instMessages, setFetchChange } = TutorChat()
    const [Students, setStudents] = useState([])
    
    const [typingStatus, setTypingStatus] = useState({})
    const [typingTimeout, setTypingTimeout] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showMediaOptions, setShowMediaOptions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [change, setChange] = useState(false)
    const messageContainerRef = useRef(null);
    const chatContainerRef = useRef(null)
    
useEffect(()=>{
    if(selectedStudent){
        socket.emit("joinedRoom", {instructor, selectedStudent})
       }
}, [selectedStudent])

    useEffect(() => {
       socket.on("messageRecieved", ({messageData}) => {
        console.log(messageData,'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        
        setMessages((prev) => [...prev, messageData]);
      });

    socket.on('userOnline', (sender) => {
        setOnlineUsers((prev) => ({ ...prev, [sender.tutorId]: 'online' }));
    })

    socket.on('userOffline', (sender) => {
        setOnlineUsers((prev) => ({ ...prev, [sender.tutorId]: 'offline' }));
    })

    socket.on('typing', (sender) => {
        setTypingStatus((prevStatus) => ({
            ...prevStatus,
            [sender.tutorId]: true,
        }));
    })

    socket.on('stopTyping', (sender) => {
        setTypingStatus((prevStatus) => ({
            ...prevStatus,
            [sender.tutorId]: false,
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
            sender: instructor.tutorId,
            senderType: 'Tutors',
            recipient:selectedStudent,
            recipientType: 'Users',
            message: message,
            type: 'text',
            Time:  new Date().toLocaleTimeString([], {  hour: "2-digit",  minute: "2-digit",})}]);
        socket.emit('sendMessage', { sender: instructor, recipient: selectedStudent, message, type: "text"})
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
        if (students && students?.length > 0) {
            setStudents([...students])
        }
    }, [students])
    

    useEffect(() => {
        const sinc = async () => {
            try {
                const studentMessageTimestamps = {};
                
                instMessages.forEach((message) => {
                    const senderId = message.sender._id;
                    const recipientId = message.recipient._id;
                    const messageTime = new Date(message.Time).getTime();
                    if (senderId === instructor._id) {
                        if (!studentMessageTimestamps[recipientId] || messageTime > studentMessageTimestamps[recipientId]) {
                            studentMessageTimestamps[recipientId] = messageTime;
                        }
                    } else if (recipientId === instructor._id) {
                        if (!studentMessageTimestamps[senderId] || messageTime > studentMessageTimestamps[senderId]) {
                            studentMessageTimestamps[senderId] = messageTime;
                        }
                    }
                });
                const updatedInstructors = students?.map((student) => ({
                    ...student,
                    latestMessageTime: studentMessageTimestamps[student._id] || 0,
                }));
                const sortedStudents = updatedInstructors.sort(
                    (a, b) => b.latestMessageTime - a.latestMessageTime
                );

                setStudents(sortedStudents)
                setSelectedStudent(sortedStudents[0])
            }
            catch (error) {
                if (error.data === 'No messages found') {
                    setMessages({})
                }
                console.log(error)
            }
        }
        sinc()
    }, [students, change]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedStudent) {
                try {
                    const instructorId = selectedStudent._id;
                    
                    const getAllMessages = await fetchTutorMessagesAPI(instructorId);
                    
                    setMessages(getAllMessages.data.data);
                } catch (error) {
                    if (error?.data?.message === 'No messages found') {
                        setMessages({});
                    }
                    
                }
            }
        };
        fetchMessages();
    }, [selectedStudent, change]);
    
    const onEmojiClick = (emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        socket.emit('typing', {
            roomId: [instructor.email, selectedStudent.email].sort().join("-"), 
            userId: sender.tutorId })
        setTypingTimeout(
            setTimeout(() => {
                socket.emit("stopTyping", {
                    roomId: [instructor.email, selectedStudent.email].sort().join("-"),
                    userId: sender.tutorId
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
            <div className="">
                <div className="content  flex flex-col">
                 
                    <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row mt-3 bg-gray-200 shadow-xl rounded-lg border-2 border-gray-300 sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl h-screen " style={{ height: '60%' }}>
                        <div className="sm:hidden md:flex flex-col border-r-2  lg:w-1/4 sm:max-w-screen-md lg:max-w-full">
                            <div className="relative w-full p-3 border-b-2 bg-buttonGreen">
                                <input
                                    type="text"
                                    className="w-full h-10 pl-10 pr-4 rounded-md mt-3 shadow focus:outline-none"
                                    placeholder="Search"
                                />
                                <div className="absolute inset-y-0 left-2 top-3 flex items-center pl-3 text-black pointer-events-none ">
                                    <FaSearch />
                                </div>
                            </div>
                            {Students.length ? (
                                Students?.map((student) => {
                                    
                                    return (
                                        <div key={student._id} className="flex w-full h-16 border-2 border-gray-300 justify-start items-start p-3" onClick={() => setSelectedStudent(student)}>
                                            {student?.profileImage ? (
                                                <div className="relative">
                                                    <img src={student.profileImage} className="w-10 h-10 rounded-full bg-black" alt={student?.name} />
                                                    {onlineUsers[student?._id] === 'online' && (
                                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-white"></span>
                                                    )}

                                                </div>
                                            ) : (
                                                <p className="flex justify-center items-center bg-zinc-800 w-10 h-10 text-md text-white rounded-full"><FaUser size={20} /></p>
                                            )}
                                            <div className="flex flex-col ml-4">
                                                <span className=" text-xs font-semibold">{student.name}</span>
                                               
                                                {typingStatus[selectedStudent._id] && (
                                                    <div className="flex">
                                                        <img src={student.profileImage} className="w-10 h-10 rounded-full bg-black" alt={student?.name} />
                                                        <span className="text-xs font-semibold text-gray-500 ml-10">
                                                            Typing...
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className=" flex justify-center text-zinc-700 font-semibold">No messages found !</p>
                            )}
                        </div>
                        {selectedStudent ? (
                            <div className=" flex flex-col justify-between border-2 w-full h-screen overflow-hidden">
                             
                                <div className="flex justify-start items-center border-2 border-sky-100 shadow-md h-16 p-3 gap-5">
                                    {selectedStudent?.profileImage ? (
                                        <div className="relative">
                                            <img src={selectedStudent.profileImage} className="w-12 h-12 rounded-full bg-black" alt={selectedStudent.name} />
                                            {onlineUsers[selectedStudent?._id] === 'online' && (
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-white"></span>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="flex justify-center items-center bg-zinc-800 w-10 h-10 text-md text-white rounded-full">
                                            <FaUser size={20} />
                                        </p>
                                    )}
                                    <p className="text-sm font-semibold">{selectedStudent?.name}</p>
                                    {typingStatus[selectedStudent?._id] && (

                                        <div className="flex">
                                            <div className="typing-indicator">
                                                <div className="bubble"></div>
                                                <div className="bubble"></div>
                                                <div className="bubble"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div ref={messageContainerRef} className="border-2  flex flex-col-reverse w-full h-full bg-zinc-900 overflow-y-auto">
                              
                                </div>


                                {
                                        messages.map((data, index) => {
                                            
                                            
                                            const isSender = data.sender == sender.tutorId; 
                                            
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

                                <div className="flex items-center h-14 border-2 border-sky-200 px-2 ">
                                    <button
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="p-2 bg-sky-100 border-2 border-sky-200 transition-transform duration-300 hover:scale-110"
                                    >
                                        😊
                                    </button>
                                    {showEmojiPicker && (
                                        <div className="absolute bottom-20 z-10 bg-white shadow-lg rounded">
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
                                        <div className="absolute flex justify-between items-center gap-5 bottom-20 z-10 bg-white shadow-lg rounded p-1">
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
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                onChange={(e) => handleFileUpload(e, "audio")}
                                                className="hidden"
                                                id="audio-upload"
                                            />
                                            <button
                                                onClick={isRecording ? stopRecording : startRecording}
                                                className="flex text-center p-1 cursor-pointer transition-transform duration-300 hover:scale-110"
                                            >
                                                <span className="text-sm font-semibold flex items-center">
                                                    {isRecording && <span className="text-red-500 mr-1">🔴</span>}
                                                    <FontAwesomeIcon icon={faMicrophone} />
                                                </span>
                                            </button>
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
                                        <FaPaperclip />
                                    </button>
                                    <input
                                        onChange={handleTyping}
                                        value={message}
                                        type="text"
                                        className="w-full h-full p-2 rounded-md shadow focus:outline-none"
                                        placeholder="Enter the message......"
                                    />
                                    <button
                                        className="flex justify-center items-center font-semibold bg-green-900 text-center w-24 h-full text-white"
                                        onClick={() => sendMessage(selectedStudent)}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <div className="flex justify-center ml-96 font-semibold text-xl items-center">
                                <p>No message to show</p>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

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



export const Chat = () => {

    const instructor = useSelector((state) => state.tutor)
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState({})
    const [sender, setSender] = useState()
    const [selectedStudent, setSelectedStudent] = useState()
    const { students, instMessages, setFetchChange } = TutorChat()
    const [Students, setStudents] = useState([])
    
    const [typingStatus, setTypingStatus] = useState({})
    const [typingTimeout, setTypingTimeout] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showMediaOptions, setShowMediaOptions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([])
    const [audioStream, setAudioStream] = useState(null)
    const [change, setChange] = useState(false)
    const messageContainerRef = useRef(null);

    useEffect(() => {
        if (students && students?.length > 0) {
            setStudents([...students])
        }
    }, [students])

    

    useEffect(() => {
        const sinc = async () => {
            try {
                const studentMessageTimestamps = {};
                console.log(instMessages, "instmessagessssss");
                
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
        console.log(change)
    }, [students, change]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedStudent) {
                try {
                    const instructorId = selectedStudent._id;
                    const getAllMessages = await fetchTutorMessagesAPI(instructorId);
                    setMessages(getAllMessages);
                } catch (error) {
                    if (error?.data?.message === 'No messages found') {
                        setMessages({});
                    }
                    
                }
            }
        };
        fetchMessages();
    }, [selectedStudent, change]);

    // useEffect(() => {

    //     // const token = Cookies.get('InstructorAccessToken')

    //     // socket.emit('authenticate', token)

    //     socket.on('Authorized', (user) => {
    //         setSender(user)
    //         students?.forEach((student) => {
    //             const room = `private-${student._id}-${user._id}`
    //             socket.emit('joinRoom', room)
    //         })
    //         socket.on('userOnline', (data) => {
    //             setOnlineUsers((prev) => ({ ...prev, [data.userId]: 'online' }));
    //         });
    //         socket.on('userOffline', (data) => {
    //             setOnlineUsers((prev) => ({ ...prev, [data.userId]: 'offline' }));
    //         });
    //     })
    //     socket.on('privateMessage', (message) => {
    //         setMessages((prevMessages) => {
    //             const newMessage = {
    //                 text: message.message,
    //                 CurrentUser: message?.senderId === sender?._id,
    //                 Time: getTimeFromDateTime(message.Time),
    //                 TimeforSorting: new Date(message.Time),
    //                 type: message.type
    //             }
    //             const updatedMessages = [...prevMessages['Messages'] || [], newMessage]
    //             setChange(prevChange => !prevChange);
    //             setFetchChange(prevChange => !prevChange);
    //             return {
    //                 ...prevMessages,
    //                 ['Messages']: updatedMessages
    //             }
    //         })
    //     })
        
    //     socket.on('typing', (data) => {
    //         setTypingStatus((prevStatus) => ({
    //             ...prevStatus,
    //             [data.userId]: true,
    //         }));
    //     });
    //     socket.on('stopTyping', (data) => {
    //         setTypingStatus((prevStatus) => ({
    //             ...prevStatus,
    //             [data.userId]: false,
    //         }));
    //     });
    //     socket.on('Unauthorized', (error) => {
    //        console.log('socket io unauthorized');
           
    //     })

    //     return () => {
    //         socket.off('Authorized')
    //         socket.off('Unauthorized')
    //         socket.off('privateMessage')
    //     }

    // }, [students, setSender, setMessages, socket, change])

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, typingStatus]);

    const sendMessage = (recipient) => {
        console.log(typingTimeout)
        if (message.trim() === '') {
            return
        }
        const type = 'text'
        const text = message
        const room = `private-${recipient._id}-${sender._id}`
        socket.emit('privateMessage', { type, sender, recipient, text, room })
        setChange(prevChange => !prevChange);
        setFetchChange(prevChange => !prevChange);
        setMessage('')
    }
    const handleTyping = (e) => {
        setMessage(e.target.value)
        const room = `private-${selectedStudent._id}-${sender?._id}`
        socket.emit('typing', { userId: sender?._id, room: room })
        setTypingTimeout(
            setTimeout(() => {
                socket.emit("stopTyping", {
                    userId: sender?._id,
                    room: room,
                });
            }, 2000)
        );
    }

    const onEmojiClick = (emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };
    const handleFileUpload = async (event) => {
        let file;
        if (event instanceof Blob) {
            file = event;
        } else {
            file = event.target.files?.[0];
        }
        if (file) {
            try {

                const formData = new FormData();
                formData.append("file", file);
                formData.append('upload_preset', 'vedaByte');

                const recipient = selectedStudent
                const room = `private-${selectedStudent?._id}-${sender?._id}`;
                socket.emit('privateMessage', { type, sender, recipient, text, room });

            } catch (error) {
                console.log(error)
            } finally {

            }

        }
    };

    useEffect(() => {
        if (!isRecording && audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
            handleFileUpload(audioBlob, "audio");
            setAudioChunks([]);
        }
    }, [isRecording, audioChunks]);

    const startRecording = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setAudioChunks((prev) => [...prev, event.data]);
                    }
                };
                recorder.start();
                setMediaRecorder(recorder);
                setAudioStream(stream);
                setIsRecording(true);
            })
            .catch((error) => {
                console.error("Error accessing microphone:", error);
            });
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
                setAudioStream(null);
            }
        }
    };
    const getMessagesForStudent = (studentId) => {
        if (Array.isArray(messages.Messages)) {
            return instMessages.filter((message) => message?.recipient?._id === studentId || message?.sender?._id === studentId);
        } else {
            console.error('messages.Messages is not an array:', messages.Messages);
            return [];
        }
    };

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
                                    const messagesForStudent = getMessagesForStudent(student._id);
                                    const lastMessage = messagesForStudent[messagesForStudent.length - 1];
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
                                                {lastMessage ? (
                                                    <>
                                                        <span className="text-xs text-green-900 font-semibold">
                                                            last message : {lastMessage?.type === 'text' ? `${lastMessage?.message.substring(0, 6)}...` : 'File'}
                                                        </span>
                                                        <span className="text-xs text-gray-700 font-semibold">
                                                            {new Date(lastMessage?.Time).toLocaleString()}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-500">No messages</span>
                                                )}
                                                {typingStatus[sender?._id] && (
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
                                {/* Header Section */}
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

                                {/* Message Display Area */}
                                <div ref={messageContainerRef} className="border-2  flex flex-col-reverse w-full h-full bg-zinc-900 overflow-y-auto">
                                    {Object.keys(messages).length > 0 ? (
                                        Object.keys(messages).map((userId, index) => (
                                            <div key={index}>
                                                {messages[userId].map((msg, idx) => (
                                                    <div key={idx} className={`flex p-1 mb-2 ${msg.CurrentUser ? 'justify-end' : 'justify-start'} items-center gap-1`}>
                                                        {msg.CurrentUser === false && (
                                                            <img src={selectedStudent?.profileImage} className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400" alt="" />
                                                        )}
                                                        <div className={`inline-block px-2 py-1 rounded-lg shadow-md bg-lime-200 relative flex-col`}>
                                                            {msg?.type === "text" && <span>{msg?.text}</span>}

                                                            {msg?.type === "image" && (
                                                                <img src={msg?.text} alt="Sent image" className="w-40 h-40 object-cover rounded" />
                                                            )}
                                                            {msg?.type === "video" && (
                                                                <video controls className="w-40 h-40 rounded">
                                                                    <source src={msg?.text} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                            {msg?.type === "audio" && (
                                                                <audio controls className="w-40">
                                                                    <source src={msg?.text} type="audio/mpeg" />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            )}
                                                            <span className="text-xs text-gray-500 self-end ml-2">
                                                                {msg.Time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {typingStatus[selectedStudent?._id] && (
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={selectedStudent?.profileImage}
                                                            className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400"
                                                            alt=""
                                                        />
                                                        <div className="flex items-center bg-lime-200 rounded-lg shadow-md px-2 py-1">
                                                            <span className="text-md font-semibold text-gray-950">
                                                                Typing
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
                                        ))
                                    ) : (
                                        <div className="flex justify-center items-center text-lime-100 h-full">
                                            <h1>No messages</h1>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Section */}
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

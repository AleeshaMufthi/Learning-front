import SimplePeer from "simple-peer";
import socket from "../../socket/SocketioClient";
import React, { useEffect, useRef, useState } from 'react';
import ProfileLayout from "../../components/tutor/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";

const VideoMeet = () => {
  const myVideoRef = useRef();
  const peerVideoRef = useRef();
  const connectionRef = useRef();
  const [stream, setStream] = useState(null);
  const [userId, setUserId] = useState('');
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [incominCallInfo, setIncominCallInfo] = useState({})

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        myVideoRef.current.srcObject = mediaStream;
      }).catch((error) => console.error('Error accessing media devices:', error));

    socket.on('incomingCall', handleIncomingCall);
    socket.on('callEnded', destroyConnection);

    return () => {
      socket.off("incomingCall", handleIncomingCall);
      socket.off("callEnded", destroyConnection)
    };
  }, []);

  const handleIncomingCall = ({ from, signalData }) => {
    setIncominCallInfo({ isSomeoneCalling: true, from, signalData });
  }

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
      }
    }
  };

  const initiateCall = () => {
    if (userId) {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream:stream,
      });

      peer.on('signal', (signalData) => {
        socket.emit('initiateCall', { userId, signalData, myId: socket?.id }); //initiating call
      });

      peer.on('stream', (remoteStream) => {
        peerVideoRef.current.srcObject = remoteStream;
      });

      socket.on('callAccepted', (signal) => {
        setIsCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } else {
      alert('enter user id call initiate a call')
    }
  };

  const answerCall = () => {
    setIsCallAccepted(true);

    const peer = new SimplePeer({ initiator: false, trickle: false, stream: stream, 
      config:{
        iceServers:[
          {
            urls:"stun:stun.l.google.com:19302"
          }
        ]
      }
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: incominCallInfo.from });
    });

    peer.on('stream', (currentStream) => {
      peerVideoRef.current.srcObject = currentStream;
    });

    peer.signal(incominCallInfo.signalData);

    connectionRef.current = peer;
  }

  const endCall = () => {
    socket.emit('endCall', { to: incominCallInfo.from });
    destroyConnection();
  }

  const destroyConnection = () => {
    connectionRef.current.destroy();
    window.location.reload();
  }
  return (
     <ProfileLayout tutor>
    <div className="flex flex-col item-center">
      <h2 className='text-center text-lg font-semibold'>Video Calling</h2>

      <div className="flex flex-col w-72 gap-4 mt-4">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="p-2 border rounded-lg border-gray-400"
        />
        <button onClick={initiateCall} className='p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700'>Call user</button>
      </div>

      <section className='m-4 text-sm'>My ID: <u><i>{socket?.id}</i></u></section>

      <div className='flex flex-row gap-4 m-4 mb-8'>
        <div>
          <h3 className='text-center text-md font-medium'>My Video</h3>
          <video ref={myVideoRef} autoPlay playsInline muted className='w-72 h-48 rounded-lg border border-gray-300' />
        </div>

        {isCallAccepted &&
          <div>
            <h3 className='text-center text-md font-medium'>Peer Video</h3>
            <video ref={peerVideoRef} autoPlay playsInline className="w-72 h-48 rounded-lg border border-gray-300" />
          </div>
        }
      </div>

      <div className="flex gap-4 mb-8">
          <button onClick={toggleAudio} className="p-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700">
            {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          </button>
          <button onClick={toggleVideo} className="p-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700">
            {isVideoMuted ? 'Unmute Video' : 'Mute Video'}
          </button>
        </div>

      {isCallAccepted ?
        <button className='p-2 rounded-lg bg-red-600 text-white hover:bg-red-700' onClick={endCall}>End Call</button>
        :
        (incominCallInfo?.isSomeoneCalling) &&
        <div className='flex flex-col mb-8'>
          <section className="m-4 p-4 bg-gray-100 rounded-md shadow-lg flex items-center space-x-4">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-6 h-6 text-green-500"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15.75 6.75v-3A2.25 2.25 0 0013.5 1.5h-3A2.25 2.25 0 008.25 3.75v3m7.5 0H8.25m7.5 0a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25"
    />
  </svg>
  <div>
    {/* <p className="text-lg font-semibold text-gray-800">{incominCallInfo?.from}</p> */}
    <p className="text-lg font-semibold text-gray-800">Student</p>
    <p className="text-sm text-gray-500">is calling</p>
  </div>
</section>

          {/* <section className='m-4'><u>{incominCallInfo?.from}</u> is calling</section> */}
          <button onClick={answerCall} className='p-2 rounded-lg bg-green-600 text-white hover:bg-green-700'>Answer call</button>
        </div>
      }
    </div>
    </ProfileLayout>
  );
}

export default VideoMeet


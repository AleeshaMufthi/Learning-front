import SimplePeer from "simple-peer";
import socket from "../../socket/SocketioClient";
import React, { useEffect, useRef, useState } from 'react';

const VideoMeet = () => {
  const myVideoRef = useRef();
  const peerVideoRef = useRef();
  const connectionRef = useRef();
  const [stream, setStream] = useState(null);
  const [userId, setUserId] = useState('');
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [incominCallInfo, setIncominCallInfo] = useState({})

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

    const peer = new SimplePeer({ initiator: false, trickle: false, stream: stream });

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

      {isCallAccepted ?
        <button className='p-2 rounded-lg bg-red-600 text-white hover:bg-red-700' onClick={endCall}>End Call</button>
        :
        (incominCallInfo?.isSomeoneCalling) &&
        <div className='flex flex-col mb-8'>
          <section className='m-4'><u>{incominCallInfo?.from}</u> is calling</section>
          <button onClick={answerCall} className='p-2 rounded-lg bg-green-600 text-white hover:bg-green-700'>Answer call</button>
        </div>
      }
    </div>
  );
}

export default VideoMeet


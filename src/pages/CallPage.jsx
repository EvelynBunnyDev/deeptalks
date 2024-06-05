import React from "react";

import { useUserStatus } from "../contexts/userCallContext";

export function IncomingCallWrapper(props) {
  const { initiateCallStatus, incomingCallStatus, callAcceptedStatus } = useUserStatus();

  const InitiateCallDebug = 0; // set to 1 to test the initiate call window
  const IncomingDebug = 0; // set to 1 to test the incoming call window
  const CallAcceptedDebug = 0; // set to 1 to test the call accepted window

  return (
    <div>
      {(IncomingDebug === 1 || (incomingCallStatus === 1 && callAcceptedStatus === 0)) && (
        <>
          <CallBackground />
          <IncomingCallWindow acceptCall={() => { }} rejectCall={() => { }} info={null}/>
        </>
      )}
      {(InitiateCallDebug ===1 || (initiateCallStatus === 1 && callAcceptedStatus === 0)) && (
        <>
          <CallBackground />
          <InitiateCallWindow rejectCall={() => { }} info={null}/>
        </>
      )}
      {(CallAcceptedDebug === 1 || callAcceptedStatus === 1) && (
        <>
          <CallBackground />
          <CallAcceptedWindow closeWindow={() => {}} info={null}/>
        </>
      )}

      {props.children}
    </div>
  );
}

export function IncomingCallWindow(props) {
  return (
    <div className='incoming-call'
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1001,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <h1>Incoming Call</h1>
      <button onClick={props.acceptCall}>Accept</button>
      <button onClick={props.rejectCall}>Reject</button>
    </div>
  );
}

export function InitiateCallWindow(props) {
  return (
    <div className='initiate-call'
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1001,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <h1>Calling...</h1>
      <button onClick={props.rejectCall}>Cancel</button>
    </div>
  );
}

export function CallAcceptedWindow(props) {
  return (
    <div className='call-accepted'
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1001,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <h1>Call Accepted</h1>
      <h2>Meeting Link: {props.info}</h2>
      <button onClick={props.closeWindow}>Close</button>
    </div>
  );
}

export function CallBackground() {
  return (
    <div className='transparent-background'
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    ></div>
  );
}
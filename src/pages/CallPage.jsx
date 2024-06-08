import React from "react";

import Api from "../models/Api.js";
import Auth from "../models/Auth.js";

export const CallContext = React.createContext({});

const DELAY = 5000;

export function IncomingCallWrapper(props) {
  const [status, setStatus] = React.useState(null);
  const [invite, setInvite] = React.useState(null);
  const [other, setOther] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  const setCallStatus = (s, u) => {
    setStatus(s);
    setOther(u);
  };

  React.useEffect(() => {
    let timer;
    (async () => {
      const me = await Auth.check();
      if (!me) return;
      const poll = async () => {
        const { invites } = await Api.req("GET", "/invites");
        for (const i of invites) {
          if (i.status === "pending") {
            if (i.sender_id === me._id) {
              setStatus("init");
              setInvite(i._id);
              setOther(i.recipient);
            } else {
              setStatus("incoming");
              setInvite(i._id);
              setOther(i.sender);
            }
          } else if (i.status === "accept") {
            setStatus("accept");
            setInvite(i._id);
            setOther(i.sender_id === me._id ? i.recipient : i.sender);
            setUrl(i.url);
          }
          break;
        }
        timer = setTimeout(poll, DELAY);
      };
      poll();
    })();
    return () => timer && clearTimeout(timer);
  }, []);

  const handleDecline = async () => {
    await Api.req("POST", `/invites/${invite}/decline`);
    setCallStatus(null);
    setInvite(null);
    setOther(null);
    setUrl(null);
  };

  const handleAccept = async () => {
    const { url } = await Api.req("POST", `/invites/${invite}/accept`);
    setCallStatus("accept");
    setUrl(url);
  };

  const handleDone = async () => {
    await Api.req("POST", `/invites/${invite}/done`);
    setCallStatus(null);
    setInvite(null);
    setOther(null);
    setUrl(null);
  };

  return (
    <div>
      {status && <>
        <CallBackground />
        {status === "init" && <div className='initiate-call'
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
          }}>
          <h1>Calling {other}...</h1>
          <button onClick={handleDecline}>Cancel</button>
        </div>}
        {status === "incoming" && <div className='incoming-call'
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
          }}>
          <h1>Incoming Call from {other}...</h1>
          <button onClick={handleAccept}>Accept</button>
          <button style={{ marginLeft: "0.5em" }} onClick={handleDecline}>Decline</button>
        </div>}
        {status === "accept" && <div className='call-accepted'
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
          }}>
          <h1>Call with {other}</h1>
          <h2>Meeting Link: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></h2>
          <button onClick={handleDone}>Done</button>
        </div>}
      </>}
      <CallContext.Provider value={[status, setCallStatus]}>
        {props.children}
      </CallContext.Provider>
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
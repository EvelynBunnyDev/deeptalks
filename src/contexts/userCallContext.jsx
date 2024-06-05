import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context object with a default empty state
const UserStatusContext = createContext();

// Provider component that wraps your app and provides the user status state
export const UserStatusProvider = ({ children }) => {
  const [initiateCallStatus, setInitiateCallStatus] = useState(0); 
  const [incomingCallStatus, setIncomingCallStatus] = useState(0); //@Gene incoming call status 1 = yes, 0 = no incoming call
  const [callAcceptedStatus, setCallAcceptedStatus] = useState(0);

  // upodate from the server the incoming call status every 5 seconds
  useEffect(() => {
    const intervalIncoming = setInterval(() => {
      // fetch the status from the server
      // setIncomingCallStatus(status);
    }, 2000); // @Gene: status fetched every 2 seconds
    return () => clearInterval(intervalIncoming);
  }, []);
  
  // upodate from the server the call accepted status every 2 seconds
  useEffect(() => {
    const intervalAcceptance = setInterval(() => {
      // if there is no incoming call or no call initiated, do nothing
      if (incomingCallStatus === 0 && initiateCallStatus === 0) {
        return;
      }

      // @TODO: fetch the status from the server
      // Do something here to fetch the status from the server
      // dummy data
      let responseStatus = 0;

      // If accepted
      if (responseStatus === 1) {
        setCallAcceptedStatus(1); // this will render the call page
      } else {
        setInitiateCallStatus(0);
        setIncomingCallStatus(0); 
        setCallAcceptedStatus(0); 
      }

      
    }, 2000); // @Gene: status fetched every 2 seconds
    return () => clearInterval(intervalAcceptance);
  }, []);

  // Provide the current status and the function to update it
  return (
    <UserStatusContext.Provider value={{ 
      initiateCallStatus, setInitiateCallStatus, 
      incomingCallStatus, setIncomingCallStatus ,
      callAcceptedStatus, setCallAcceptedStatus
    }}>
      {children}
    </UserStatusContext.Provider>
  );
};

// Custom hook to use the user status context
export const useUserStatus = () => {
  const context = useContext(UserStatusContext);
  if (context === undefined) {
    throw new Error('useUserStatus must be used within a UserStatusProvider');
  }
  return context;
};

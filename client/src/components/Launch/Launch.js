import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';

const Launch = () => {

  useEffect(() => {
    SMART.authorize({
      clientId: process.env.REACT_APP_CLIENT_ID,
      scope: "launch patient/*.* openid profile",
      redirectUri: "./",
    });
  }, [])

  return (
    <div>Launching...</div>
  );
}

export default Launch;
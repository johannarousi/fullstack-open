import React from "react";

const Notifications = ({ message }) => {
  if (message.msg === null && message.errormsg === null) {
    return null;
  }
  if (message.msg !== null) {
    return <div className="message">{message.msg}</div>;
  }
  return <div className="error">{message.errormsg}</div>;
};
export default Notifications;

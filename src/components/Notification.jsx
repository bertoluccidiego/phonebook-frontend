function Notification({ message, error }) {
  const notificationColor = error
    ? 'red'
    : 'green';

  const notificationStyle = {
    backgroundColor: 'lightgrey',
    color: notificationColor,
    border: `3px solid ${notificationColor}`,
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
}

export default Notification;

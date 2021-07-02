import '../styles/Message.css';

function Message(props) {
    return (
        <div className="Message"><span>{props.children}</span></div>
    );
};

export default Message;

import './Button.css';

export default props => {
    return (
        <a className="Button" style={{backgroundColor: props.color}}>
            <span>{props.children}</span>
        </a>
    );
};

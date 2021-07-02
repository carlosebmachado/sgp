import '../styles/Button.css';

function Button(props) {
    return (
        <button className="Button" onClick={() => {props.onClick(props.param)}} style={{backgroundColor: props.color || "var(--color-normal)"}}>
            {props.children}
        </button>
    );
};

export default Button;

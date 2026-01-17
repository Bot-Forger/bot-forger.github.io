import './button.css';

export default function Button(props) {
    return (
        <div 
            className='button'
            onClick={props.onClick}
            disabled={props.disabled}
            style={props.style}
        >
            {props.children}
        </div>
    )
}
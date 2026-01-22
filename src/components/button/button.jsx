import './button.css';

export default function Button(props) {
    return (
        <div 
            className='button'
            onClick={props.onClick}
            disabled={props.disabled}
            style={props.style}
            id={props.id}
        >
            {props.children}
        </div>
    )
}
export default function Button(props) {
    return (
        <div 
            className='editor-button'
            onClick={props.onClick}
            disabled={props.disabled}
            style={props.style}
        >
            {props.children}
        </div>
    )
}
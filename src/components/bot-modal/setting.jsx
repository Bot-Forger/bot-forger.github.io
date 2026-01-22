function Setting (props) {
    return (
        <div className="bot-setting">
            <span>{props.name}</span>
            <input
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
            {props.desc &&
                <p>{props.desc}</p>
            }
        </div>
    );
}

export default Setting;
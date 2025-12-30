function OptionsItem (props) {
    return (
        <div className="command-options">
            <p>
                Name
                <input
                    type="text"
                    placeholder="Enter a name"
                    value={props.name}
                    onChange={v => props.onUpdate('name', v.target.value)}
                />
            </p>
            <p>
                Description
                <input
                    type="text"
                    placeholder="Enter a description"
                    value={props.description}
                    onChange={v => props.onUpdate('description', v.target.value)}
                />
            </p>
            <p>
                Type
                <select
                    value={props.type}
                    onChange={v => props.onUpdate('type', Number(v.target.value))}
                >
                    <option value={3}>Text</option>
                    <option value={10}>Number</option>
                    <option value={5}>True/False</option>
                    <option value={6}>Member</option>
                    <option value={7}>Channel</option>
                    <option value={8}>Role</option>
                    <option value={11}>Attachment</option>
                </select>
            </p>
            <p>
                Required
                <input
                    type="checkbox"
                    checked={props.required}
                    onChange={v => props.onUpdate('required', v.target.checked)}
                />
            </p>
            <button onClick={props.onDelete}>delete option</button>
        </div>
    )
}

export default OptionsItem;
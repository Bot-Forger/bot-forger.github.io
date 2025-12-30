import OptionsItem from './options-item';

function CommandsItem (props) {

    const handleOptionAdd = () => {
        props.onUpdate('options', [
            ...props.options,
            {
                type: 3,
                name: '',
                description: '',
                required: false,
            }
        ]);
    };

    const handleOptionDelete = index => {
        props.onUpdate('options', props.options.filter((_, i) => i !== index));
    };

    const handleOptionChange = (index, attr, value) => {
        const options = [ ...props.options ];
        options[index][attr] = value;
        props.onUpdate('options', options);
    };

    return (
        <div className='commands-item'>
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
                NSFW
                <input
                    type="checkbox"
                    checked={props.NSFW}
                    onChange={v => props.onUpdate('NSFW', v.target.checked)}
                />
            </p>
            <details>
                <summary>Options</summary>
                {
                    props.options.map((option, i) => 
                        <OptionsItem
                            key={i}
                            name={option.name}
                            description={option.description}
                            type={option.type}
                            required={option.required}
                            onUpdate={(a, v) => handleOptionChange(i, a, v)}
                            onDelete={() => handleOptionDelete(i)}
                        />
                    )
                }
                <button
                    className='options-add'
                    onClick={handleOptionAdd}
                >Add option</button>
            </details>
            <button
                className='commands-delete'
                onClick={props.onDelete}
            >Delete command</button>

        </div>
    )
}

export default CommandsItem;
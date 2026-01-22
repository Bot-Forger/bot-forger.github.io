import { useState } from 'react';
import ThemeStore from '../../lib/stores/theme';

import './preferences.css';

function DropdownSetting (props) {
    return (
        <div className='preference-option'>
            <label>{props.label}</label>
            <select
                value={props.value}
                onChange={props.onChange}
            >
                {props.children}
            </select>
        </div>
    );
}

function Preferences () {
    const [theme, setTheme] = useState(ThemeStore.getTheme());

    const handleSetTheme = t => {
        ThemeStore.setTheme(t.target.value);
        setTheme(t.target.value);
    };

    return (
        <div className='preferences'>
            <h1>Preferences</h1>
            
            <DropdownSetting label='Theme' value={theme} onChange={handleSetTheme}>
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
            </DropdownSetting>
        </div>
    );
}

export default Preferences;
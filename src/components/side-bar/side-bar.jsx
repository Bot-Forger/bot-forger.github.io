import { Resizable } from 're-resizable';

import './side-bar.css';

function SideBar (props) {
    return (
        <Resizable
            defaultSize={{
                width: 200,
                height: '100%'
            }}
            minWidth={160}
            maxWidth={240}
            enable={{ right: true }}
        >
            <div className='side-bar'>
                <button onClick={() => props.onPageSelect('bots')}>My Bots</button>
                <button onClick={() => props.onPageSelect('preferences')}>Preferences</button>
            </div>
        </Resizable>
    )
}

export default SideBar;
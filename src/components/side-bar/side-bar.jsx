import './side-bar.css';

function SideBar (props) {
    return (
        <div className='side-bar'>
            <button onClick={() => props.onPageSelect('bots')}>My Bots</button>
            <button onClick={() => props.onPageSelect('preferences')}>Preferences</button>
        </div>
    );
}

export default SideBar;
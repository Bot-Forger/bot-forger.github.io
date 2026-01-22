import MenuBar from '../menu-bar/menu-bar.jsx';
import Button from '../button/button.jsx';

function NavBar () {
    return (
        <MenuBar>
            <Button onClick={() => location.href = '/'}>Home</Button>
            <Button onClick={() => location.href = '/editor'}>Editor</Button>
            {/* More items will probably be added in the future */}
        </MenuBar>
    );
}

export default NavBar;
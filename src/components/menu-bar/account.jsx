import Button from '../button/button.jsx';
import DropdownMenu from './dropdown.jsx';

function AccountManagement (props) {
    return (
        <DropdownMenu
            label={props.username}
            icon={props.avatarURL}
            rtl={true}
            style={{
                top: 'calc(100% + 0.3rem)'
            }}
        >
            <Button onClick={() => location.href = '/dashboard'}>Dashboard</Button>
            <Button onClick={props.onSignOut}>Sign out</Button>
        </DropdownMenu>
    );
}
export default AccountManagement;
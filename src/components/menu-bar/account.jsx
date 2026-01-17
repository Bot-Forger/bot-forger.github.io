import Button from '../button/button.jsx';
import DropdownMenu from './dropdown.jsx';

function AccountManagement (props) {
    return (
        <DropdownMenu
            label={props.username}
            icon={props.avatarURL}
            rtl={true}
            style={{ padding: 5 }}
        >
            <Button onClick={() => location.href = '/dashboard'}>Dashboard</Button>
            <Button onClick={props.onSignOut}>Sign out</Button>
        </DropdownMenu>
    )
}
export default AccountManagement;
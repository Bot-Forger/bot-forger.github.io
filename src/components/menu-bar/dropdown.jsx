import { useState, useEffect, useRef } from 'react';
import Button from '../button/button';
import DropdownCaret from './dropdown-caret.svg';

function DropdownMenu (props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClick = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        };

        document.addEventListener('pointerup', handleClick, true);
        return () => document.removeEventListener('pointerup', handleClick, true);
    }, []);

    return (
        <div ref={dropdownRef} className='dropdown-container'>
            <Button onClick={() => setIsOpen(!isOpen)} style={props.style}>
                {props.icon && 
                    <img
                        src={props.icon}
                        width={25}
                        height={25}
                        className='button-icon'
                    />
                }
                {props.label}
                <img
                    src={DropdownCaret}
                    style={{ paddingLeft: '6px', verticalAlign: 'middle' }}
                    width={10}
                    height={10}
                />
            </Button>
            {isOpen && (
                <div
                    className='menu-bar-dropdown'
                    mode={props.rtl ? 'left' : 'right'}
                >
                    {props.children}
                </div>
            )}
        </div>
    )
}

export default DropdownMenu;
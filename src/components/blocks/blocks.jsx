import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark';

import toolboxXML from './make-toolbox.js';
import WorkspaceManager from '../../lib/workspace-manager';
import ThemeStore from '../../lib/stores/theme';
import renderer from './renderer.js';

import './patches.js';
import './blocks.css';

import './category-blocks/tests.js';
import './category-blocks/text.js';
import './category-blocks/lists.js';
import './category-blocks/events.js';
import './category-blocks/messages.js';
import './category-blocks/members.js';
import './category-blocks/emojis.js';
import './category-blocks/stickers.js';
import './category-blocks/invites.js';
import './category-blocks/webhooks.js';
import './category-blocks/channels.js';

function Blocks () {
    const blocklyDiv = useRef(null);

    useEffect(() => {
        const toolboxDom = Blockly.utils.xml.textToDom(toolboxXML);
        const darkMode = ThemeStore.getTheme() === 'dark';

        Blockly.blockRendering.register('customRenderer', renderer);

        const workspace = Blockly.inject(blocklyDiv.current, {
            toolbox: toolboxDom,
            trashcan: true,
            scrollbars: true,
            renderer: 'customRenderer',
            zoom: {
                controls: true,
                wheel: true,
                startScale: 0.8,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2,
                pinch: true
            },
            grid: {
                spacing: 20,
                length: 3,
                colour: darkMode ? '#252525' : '#ebebeb',
                snap: false
            },
            theme: darkMode ? DarkTheme : Blockly.Themes.Classic
        });

        window.Blockly = Blockly;
        
        const handleThemeChange = theme => {
            if (theme === 'dark') {
                workspace.setTheme(DarkTheme);
                workspace.grid.line1.setAttribute('stroke', '#252525');
                workspace.grid.line2.setAttribute('stroke', '#252525');
            } else if (theme === 'light') {
                workspace.setTheme(Blockly.Themes.Classic);
                workspace.grid.line1.setAttribute('stroke', '#ebebeb');
                workspace.grid.line2.setAttribute('stroke', '#ebebeb');
            }
            
            // Fix hats getting their hat property removed
            // I'm fairly certain this is a bug with Blockly but who knows
            for (const block of workspace.blockDB.values()) {
                if (block.hasOwnProperty('hat')) {
                    block.hat = 'cap';
                }
            }
        };

        ThemeStore.on('themeChange', handleThemeChange);
        WorkspaceManager.attachWorkspace(workspace);

        // Remove the wierd border between the workspace and the editor bar
        setTimeout(() => {
            document.querySelector('.blocklyMainBackground').style.stroke = 'none';
        });

        return () => {
            WorkspaceManager.detatchWorkspace();
            ThemeStore.off('themeChange', handleThemeChange);
            workspace.dispose();
        };
    }, []);

    return (
        <div
            ref={blocklyDiv}
            style={{
                width: "100vw",
                flex: 1
            }}
        />
    );
};

export default Blocks;
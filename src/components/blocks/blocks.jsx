import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark';

import toolboxXML from './make-toolbox.js';
import WorkspaceManager from '../../lib/workspace-manager';
import ThemeStore from '../../lib/stores/theme';
import renderer from './renderer.js';

import './patches.js';
import './blocks.css';

import './category-blocks/tests.js'
import './category-blocks/events.js';
import './category-blocks/messages.js';
import './category-blocks/members.js';
import './category-blocks/emojis.js';
import './category-blocks/stickers.js';
import './category-blocks/invites.js';
import './category-blocks/webhooks.js';
import './category-blocks/channels.js';

const BlocklyWorkspace = () => {
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
                workspace.setGrid
            } else if (theme === 'light') {
                workspace.setTheme(Blockly.Themes.Classic);
            }
        };

        ThemeStore.on('themeChange', handleThemeChange);

        WorkspaceManager.attachWorkspace(workspace);

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
                height: "96vh",
            }}
        />
    )
};

export default BlocklyWorkspace;
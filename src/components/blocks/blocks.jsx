import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import DarkTheme from '@blockly/theme-dark';

import toolboxXML from '../../lib/make-toolbox.js';
import WorkspaceManager from '../../lib/workspace-manager';
import ThemeStore from '../../lib/stores/theme';
import renderer from '../../lib/renderer.js';

import '../../lib/duplicate-on-drag.js';
import './blocks.css';

import.meta.glob('../../lib/blocks/*.js', { eager: true });

import registerVariableToolbox from '../../lib/blocks/variables.js';
import registerEventToolbox from '../../lib/blocks/events.js';
import registerFunctionsToolbox from '../../lib/blocks/functions.js';

function Blocks () {
    const blocklyDiv = useRef(null);

    Blockly.VerticalFlyout.prototype.getFlyoutScale = () => 0.8;

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
                spacing: 25,
                length: 3,
                colour: darkMode ? '#404040' : '#d0d0d0',
                snap: false
            },
            theme: darkMode ? DarkTheme : Blockly.Themes.Classic
        });

        window.Blockly = Blockly;
        window.workspace = workspace;
        
        const handleThemeChange = theme => {
            if (theme === 'dark') {
                workspace.setTheme(DarkTheme);
                workspace.grid.line1.setAttribute('stroke', '#404040');
                workspace.grid.line2.setAttribute('stroke', '#404040');
            } else if (theme === 'light') {
                workspace.setTheme(Blockly.Themes.Classic);
                workspace.grid.line1.setAttribute('stroke', '#d0d0d0');
                workspace.grid.line2.setAttribute('stroke', '#d0d0d0');
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

        registerVariableToolbox(workspace);
        registerEventToolbox(workspace);
        registerFunctionsToolbox(workspace);

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
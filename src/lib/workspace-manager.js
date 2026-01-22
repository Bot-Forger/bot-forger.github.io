import * as Blockly from 'blockly/core';

import { EventEmitter } from 'events';

import serialize from './serialize';
import deserializeToWorkspace from './deserialize';

class WorkspaceManager extends EventEmitter {
    constructor() {
        super();

        this.workspace = null;
        this.saveDirty = false;
    }
    onBeforeUnload (event) {
        console.log(this.saveDirty);
        if (this.saveDirty) {
            event.preventDefault();
            event.returnValue = '';
        }
    }
    onWorkspaceChanged (event) {
        if (!event.isUiEvent && !this.saveDirty){
            this.saveDirty = true;
            console.log('evil')
            this.emit('saveDirty');
            console.log(event);
        }
    }
    attachWorkspace (workspace) {
        this.workspace = workspace;
        this.workspace.addChangeListener(e => this.onWorkspaceChanged(e));
        window.addEventListener('beforeunload', e => this.onBeforeUnload(e));
        this.emit('attached');
    }
    detatchWorkspace () {
        this.workspace.removeChangeListener(e => this.onWorkspaceChanged(e));
        window.removeEventListener('beforeunload', e => this.onBeforeUnload(e));
        this.workspace = null;
    }
    async loadWorkspaceFromJSON (json) {
        Blockly.Events.disable();
        try {
            deserializeToWorkspace(json, this.workspace);

            // TODO: A better way to do this
            this.saveDirty = false;
            setTimeout(() => this.emit('save'), 1000);
        } catch (e) {
            console.warn('Failed to load workspace from file', e);
        } finally {
            Blockly.Events.enable();
        }
    }
    saveWorkspaceToJSON () {
        return serialize(this.workspace);
    }
};

export default new WorkspaceManager;
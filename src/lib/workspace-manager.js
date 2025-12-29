import { EventEmitter } from 'events';

import serialize from './serialize';
import deserializeToWorkspace from './deserialize';

class WorkspaceManager extends EventEmitter {
    constructor() {
        super();

        this.workspace = null;
        this.saveDirty = false;

        // Check if resaving files without redownloading is supported (Chromium based browsers only).
        this.supportsFSAccess = 'showOpenFilePicker' in window && 'FileSystemFileHandle' in window;
        this.fileHandle = null;
    }
    onBeforeUnload (event) {
        console.log(this.saveDirty);
        if (this.saveDirty) {
            event.preventDefault();
            event.returnValue = '';
        }
    }
    onWorkspaceChanged (event) {
        if (!event.isUiEvent) this.saveDirty = true;
    }
    attachWorkspace (workspace) {
        this.workspace = workspace;
        this.workspace.addChangeListener(e => this.onWorkspaceChanged(e));
        window.addEventListener('beforeunload', e => this.onBeforeUnload(e));
    }
    detatchWorkspace () {
        this.workspace.removeChangeListener(e => this.onWorkspaceChanged(e));
        window.removeEventListener('beforeunload', e => this.onBeforeUnload(e));
        this.workspace = null;
    }
    openFile (accept) {
        return new Promise(async (resolve, reject) => {
            if (this.supportsFSAccess) {
                const fileHandles = await window.showOpenFilePicker({
                    multiple: false,
                    types: [{
                        description: "Bot Forger Files",
                        accept: { 'text/json': ['.botf'] }
                    }]
                });
                this.fileHandle = fileHandles[0];
                resolve(await this.fileHandle.getFile());
            } else {
                const i = document.createElement('input');
                i.type = 'file';
                i.accept = accept;

                i.onchange = e => {
                    if (e.target.files.length > 0) {
                        resolve(e.target.files[0]);
                    } else {
                        resolve('');
                    }
                }

                i.click();
                i.remove();
            }
        });
    }
    saveFile (fileName, blob) {
        if (this.fileHandle) {
            this.fileHandle.createWritable()
                .then(writable => 
                    writable.write(blob)
                    .then(() => writable.close()));
        } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
            a.remove();
        }
        this.saveDirty = false;
    }
    async loadWorkspaceFromFile () {
        const openedFile = await this.openFile('*.botf');

        try {
           const json = JSON.parse(await openedFile.text());
           deserializeToWorkspace(json, this.workspace);
        } catch (e) {
            console.warn('Failed to load workspace from file', e);
        }
    }
    async saveWorkspaceToFile (fileName) {
        const serialized = JSON.stringify(serialize(this.workspace));
        this.saveFile(fileName, new Blob([serialized]));
    }
};

export default new WorkspaceManager;
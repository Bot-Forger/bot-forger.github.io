class FileManager {
    constructor () {
        // Check if resaving files without redownloading is supported (Chromium based browsers only).
        this.supportsFSAccess = 'showOpenFilePicker' in window && 'FileSystemFileHandle' in window;
        this.fileHandle = null;
    }
    loadFile (accept) {
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
    saveFile (fileName, data) {
        const blob = new Blob([data]);
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
    }
    async saveFileAs (fileName, data) {
        if (this.supportsFSAccess) {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: "Bot Forger files",
                    accept: { "text/json": [".botf"] }
                }]
            });

            const writable = await handle.createWritable();
            await writable.write(data);
            await writable.close();
            this.fileHandle = handle;
        } else {
            const blob = new Blob([data]);
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
            a.remove();
        }
    }
}

export default new FileManager;
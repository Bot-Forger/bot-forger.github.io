import * as Blockly from 'blockly';

const categoryColor = "#c7b04b";

Blockly.Blocks['stickers_all'] = {
    init: function() {
        this.appendDummyInput().appendField('all stickers in server');
        this.appendValueInput('SERVER').setCheck('Server');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['stickers_find'] = {
    init: function() {
        this.appendValueInput('SERVER').setCheck('Server').appendField('find sticker in server');
        this.appendValueInput('SEARCH')
            .setCheck('String')
            .appendField('with')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID']
            ]))
        this.setInputsInline(true);
        this.setOutput(true, 'Sticker');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['stickers_getAttribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID'],
                ['server', 'SERVER'],
                ['author', 'AUTHOR'],
                ['gif/image URL', 'URL']
            ]), 'ATTR')
            .appendField('of sticker');
        this.appendValueInput('STICKER').setCheck('Sticker');
        this.setInputsInline(true);
        this.setOutput('String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['stickers_create'] = {
    init: function() {
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('create sticker in server');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('name:');
        this.appendValueInput('URL')
            .setCheck('String')
            .appendField('image/gif URL:');
        this.appendDummyInput()
            .appendField('output sticker:')
            .appendField(new Blockly.FieldCheckbox('FALSE', v => {this.returns_ = v; this.updateShape_();}), 'RETURNS');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(false);
    },
    mutationToDom: function () {
        const container = document.createElement('mutation');
        container.setAttribute('returns', this.returns_);
        return container;
    },
    domToMutation: function (xmlElement) {
        this.returns_ = xmlElement.getAttribute('returns') || 'FALSE';
        this.updateShape_();
        this.getField('RETURNS')?.setValue(this.returns_);
    },
    updateShape_: function () {
        if (this.returns_ === 'TRUE') {
            if (this.previousConnection && this.previousConnection.isConnected()) {
                this.previousConnection.disconnect();
            }
            if (this.nextConnection && this.nextConnection.isConnected()) {
                this.nextConnection.disconnect();
            }
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true, 'Sticker');
        } else {
            if (this.outputConnection && this.outputConnection.isConnected()) {
                this.outputConnection.disconnect();
            }
            this.setOutput(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        }
    }
}

Blockly.Blocks['stickers_rename'] = {
    init: function() {
        this.appendValueInput('STICKER')
            .setCheck('Sticker')
            .appendField('rename sticker');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('to');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['stickers_delete'] = {
    init: function() {
        this.appendValueInput('STICKER')
            .setCheck('Sticker')
            .appendField('delete sticker');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}
import * as Blockly from 'blockly';

const categoryColor = "#e0c138";

Blockly.Blocks['emojis_all'] = {
    init: function() {
        this.appendDummyInput().appendField('all emojis in server');
        this.appendValueInput('SERVER').setCheck('Server');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['emojis_find'] = {
    init: function() {
        this.appendValueInput('SERVER').setCheck('Server').appendField('find emoji in server');
        this.appendValueInput('SEARCH')
            .setCheck('String')
            .appendField('with')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID']
            ]), 'TYPE')
        this.setInputsInline(true);
        this.setOutput(true, 'Emoji');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['emojis_getAttribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID'],
                ['server', 'SERVER'],
                ['gif/image URL', 'URL']
            ]), 'ATTR')
            .appendField('of emoji');
        this.appendValueInput('EMOJI').setCheck('Emoji');
        this.setInputsInline(true);
        this.setOutput('String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['emojis_isAnimated'] = {
    init: function() {
        this.appendValueInput('EMOJI')
            .setCheck('Emoji')
            .appendField('is emoji');
        this.appendDummyInput().appendField('animated?');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['emojis_create'] = {
    init: function() {
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('create emoji in server');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('name:');
        this.appendValueInput('URL')
            .setCheck('String')
            .appendField('image/gif URL:');
        this.appendDummyInput()
            .appendField('output emoji:')
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
            this.setOutput(true, 'Emoji');
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

Blockly.Blocks['emojis_rename'] = {
    init: function() {
        this.appendValueInput('EMOJI')
            .setCheck('Emoji')
            .appendField('rename emoji');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('to');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['emojis_delete'] = {
    init: function() {
        this.appendValueInput('EMOJI')
            .setCheck('Emoji')
            .appendField('delete emoji');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}
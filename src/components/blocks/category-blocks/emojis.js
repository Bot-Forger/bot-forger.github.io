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
            ]))
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
                ['author', 'AUTHOR'],
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
            .appendField('with name');
        this.appendValueInput('URL')
            .setCheck('String')
            .appendField('and image/gif URL');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
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
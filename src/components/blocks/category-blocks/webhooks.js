import * as Blockly from 'blockly';

const categoryColor = "#5d3535";

Blockly.Blocks['webhooks_create'] = {
    init: function() {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('create webhook in channel');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('with name');
        this.appendValueInput('AVATAR')
            .setCheck('String')
            .appendField('and avatar URL');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(true, 'Webhook');
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['webhooks_fetch'] = {
    init: function() {
        this.appendValueInput('ID')
            .setCheck('String')
            .appendField('fetch webhook with id');
        this.appendValueInput('TOKEN')
            .setCheck('String')
            .appendField('and token');
        this.setColour(categoryColor);
        this.setOutput(true, 'Webhook');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['webhooks_getAttribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID'],
                ['token', 'TOKEN'],
                ['creator', 'CREATOR'],
            ]), 'ATTR')
            .appendField('of webhook');
        this.appendValueInput('WEBHOOK').setCheck('Webhook');
        this.setInputsInline(true);
        this.setOutput(true, 'String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['webhooks_send'] = {
    init: function() {
        this.appendValueInput('WEBHOOK')
            .setCheck('Webhook')
            .appendField('send message with webhook');
        this.appendValueInput('MESSAGE')
            .setCheck('String')
            .appendField('with content');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['webhooks_edit'] = {
    init: function() {
        this.appendValueInput('WEBHOOK')
            .setCheck('Webhook')
            .appendField('edit webhook');
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['avatar URL', 'AVATAR']
            ]), 'ATTR')
            .appendField('to');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['webhooks_delete'] = {
    init: function() {
        this.appendValueInput('WEBHOOK')
            .setCheck('Webhook')
            .appendField('delete webhook');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}
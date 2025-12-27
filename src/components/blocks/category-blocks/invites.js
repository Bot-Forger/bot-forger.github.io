import * as Blockly from 'blockly';

const categoryColor = "#734242";

Blockly.Blocks['invites_all'] = {
    init: function() {
        this.appendDummyInput().appendField('all invites for server');
        this.appendValueInput('SERVER').setCheck('Server');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['invites_allChannel'] = {
    init: function() {
        this.appendDummyInput().appendField('all invites for channel');
        this.appendValueInput('CHANNEL').setCheck('Channel');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['invites_getAttribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['url', 'URL'],
                ['channel', 'CHANNEL'],
                ['author', 'AUTHOR']
            ]), 'ATTR')
            .appendField('of invite');
        this.appendValueInput('INVITE').setCheck('Invite');
        this.setInputsInline(true);
        this.setOutput('String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['invites_fetch'] = {
    init: function() {
        this.appendValueInput('URL')
            .setCheck('String')
            .appendField('fetch invite from URL');
        this.setInputsInline(true);
        this.setOutput(true, 'Invite');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['invites_create'] = {
    init: function() {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('create invite for channel');
        this.appendValueInput('USES')
            .setCheck('Number')
            .appendField('with max uses');
        this.setInputsInline(true);
        this.setOutput(true, 'Invite');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['invites_delete'] = {
    init: function() {
        this.appendValueInput('INVITE')
            .setCheck('Invite')
            .appendField('delete invite');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}
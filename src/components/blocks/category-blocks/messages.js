import * as Blockly from 'blockly';

const categoryColor = "#2d9528";

Blockly.Blocks['messages_sendMessage'] = {
    init: function () {
        this.returns_ = 'FALSE';
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('send message in channel');
        this.appendValueInput('CONTENT')
            .appendField('content:');
        this.appendValueInput('ATTACHMENTS')
            .setCheck('List')
            .appendField('attachments:');
        this.appendValueInput('EPHEMERAL')
            .setCheck('Boolean')
            .appendField('ephemeral:');
        this.appendDummyInput()
            .appendField('output message:')
            .appendField(new Blockly.FieldCheckbox('FALSE', v => {this.returns_ = v; this.updateShape_();}), 'RETURNS');
        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(false);
        this.setColour(categoryColor);
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
            this.setOutput(true, 'Message');
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

Blockly.Blocks['messages_getAttribute'] = {
    init: function () {
        this.appendValueInput('MESSAGE').setCheck('Message')
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['content', 'CONTENT'],
                ['channel', 'CHANNEL'],
                ['server', 'SERVER'],
                ['author', 'AUTHOR'],
                ['creation date', 'DATE']
            ]), 'ATTR')
            .appendField('from message');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
    }
}

Blockly.Blocks['messages_delete'] = {
    init: function () {
        this.appendDummyInput().appendField('delete message');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);

    }
}

Blockly.Blocks['messages_pin'] = {
    init: function () {
        this.appendValueInput('MESSAGE')
            .setCheck('Message')
            .appendField(new Blockly.FieldDropdown([
                ['pin', 'PIN'],
                ['unpin', 'UNPIN']
            ]), 'ACTION')
            .appendField('message');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['messages_isPinned'] = {
    init: function () {
        this.appendValueInput('MESSAGE').setCheck('Message').appendField('is');
        this.appendDummyInput().appendField('pinned?');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
    }
}

Blockly.Blocks['messages_react'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['react', 'REACT'],
                ['unreact', 'UNREACT']
            ]), 'ACTION')
            .appendField('to');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.appendValueInput('REACTION').setCheck('String').appendField('with');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['messages_removeAllReactions'] = {
    init: function () {
        this.appendValueInput('MESSAGE').setCheck('Message').appendField('remove all reactions from');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['messages_reactions'] = {
    init: function () {
        this.appendDummyInput().appendField('get all reactions of');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'List');
    }
}

Blockly.Blocks['messages_hasReaction'] = {
    init: function () {
        this.appendDummyInput().appendField('does');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.appendValueInput('REACTION').setCheck('String').appendField('have reaction');
        this.appendDummyInput().appendField("?");
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
    }
}
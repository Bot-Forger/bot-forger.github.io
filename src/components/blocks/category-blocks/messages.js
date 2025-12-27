import * as Blockly from 'blockly';

const categoryColor = "#2d9528";

Blockly.Blocks['messages_send_config'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ephemeral')
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'EPHEMERAL');

    this.setColour(categoryColor);
  }
};

Blockly.Extensions.registerMutator('messages_send_config', {
    saveExtraState: function() {
        return {
            ephemeral: this.ephemeral_
        };
    },
    loadExtraState: function(state) {
        this.ephemeral = state.ephemeral ?? false;
    }
}, null, []);

Blockly.Blocks['messages_sendMessage'] = {
    init: function() {
        this.addIcon(new Blockly.icons.MutatorIcon([], this));
        this.appendDummyInput().appendField('send message in channel');
        this.appendValueInput('CHANNEL').setCheck('String');
        this.appendValueInput('CONTENT').setCheck('String').appendField('with content');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput('Message');

        this.ephemeral_ = false;
    },
    compose: function(containerBlock) {
        this.ephemeral_ = containerBlock.getFieldValue('EPHEMERAL') === 'TRUE';
        
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('messages_send_config');
        containerBlock.initSvg();
        containerBlock.setFieldValue(this.ephemeral_, 'EPHEMERAL');
        return containerBlock;
    },
    extensions: ['messages_send_config']
}

Blockly.Blocks['messages_getAttribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['content', 'CONTENT'],
                ['channel', 'CHANNEL'],
                ['server', 'SERVER'],
                ['author', 'AUTHOR'],
                ['creation date', 'DATE']
            ]), 'ATTR')
            .appendField('from message');
        this.appendValueInput('MESSAGE').setCheck('String');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput('String');
    }
}

Blockly.Blocks['messages_delete'] = {
    init: function() {
        this.appendDummyInput().appendField('delete message');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
        
    }
}

Blockly.Blocks['messages_pin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['pin', 'PIN'],
                ['unpin', 'UNPIN']
            ]), 'ACTION')
            .appendField('message to channel');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['messages_isPinned'] = {
    init: function() {
        this.appendValueInput('MESSAGE').setCheck('Message').appendField('is');
        this.appendDummyInput().appendField('pinned?');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
    }
}

Blockly.Blocks['messages_react'] = {
    init: function() {
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
    init: function() {
        this.appendValueInput('MESSAGE').setCheck('Message').appendField('remove all reactions from');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['messages_reactions'] = {
    init: function() {
        this.appendDummyInput().appendField('get all reactions of');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'List');
    }
}

Blockly.Blocks['messages_hasReaction'] = {
    init: function() {
        this.appendDummyInput().appendField('does');
        this.appendValueInput('MESSAGE').setCheck('Message');
        this.appendValueInput('REACTION').setCheck('String').appendField('have reaction');
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
    }
}
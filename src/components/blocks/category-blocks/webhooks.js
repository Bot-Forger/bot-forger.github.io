import * as Blockly from 'blockly';

const categoryColor = "#6243ac";

Blockly.Blocks['webhooks_create'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('create webhook in channel');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('name:');
        this.appendValueInput('AVATAR')
            .setCheck('String')
            .appendField('avatar URL:');
        this.appendDummyInput()
            .appendField('output webhook:')
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
            this.setOutput(true, 'Webhook');
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

Blockly.Blocks['webhooks_fetch'] = {
    init: function () {
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
    init: function () {
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
    init: function () {
        this.appendValueInput('WEBHOOK')
            .setCheck('Webhook')
            .appendField('send message with webhook');
        this.appendValueInput('CONTENT')
            .setCheck('String')
            .appendField('with content');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['webhooks_edit'] = {
    init: function () {
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
    init: function () {
        this.appendValueInput('WEBHOOK')
            .setCheck('Webhook')
            .appendField('delete webhook');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}
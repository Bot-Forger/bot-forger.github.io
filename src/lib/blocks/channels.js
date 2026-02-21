import * as Blockly from 'blockly';

const categoryColor = "#435cac";

Blockly.Blocks['channels_all'] = {
    init: function () {
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('all channels in server');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['channels_find'] = {
    init: function () {
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('find channel in server');
        this.appendValueInput('SEARCH')
            .setCheck('String')
            .appendField('with')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID']
            ]), 'TYPE')
        this.setInputsInline(true);
        this.setOutput(true, 'Channel');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['channels_getAttribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID'],
                ['server', 'SERVER'],
                ['topic', 'TOPIC'],
                ['slowmode seconds', 'SLOWMODE'],
                ['url', 'URL']
            ]), 'ATTR')
            .appendField('of channel');
        this.appendValueInput('CHANNEL').setCheck('Channel');
        this.setInputsInline(true);
        this.setOutput('String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['channels_canSend'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('can send in channel');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['channels_create'] = {
    init: function () {
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('create channel in server');
        this.appendValueInput('CATEGORY')
            .setCheck('String')
            .appendField('in category ID');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('and name');
        this.appendDummyInput()
            .appendField('set type to')
            .appendField(new Blockly.FieldDropdown([
                ['text', 'TEXT'],
                ['voice', 'VOICE'],
                ['announcements', 'ANNOUNCEMENTS'],
                ['forum', 'FORUM'],
                ['stage', 'STAGE'],
                ['category', 'CATEGORY']
            ]), 'TYPE');
        this.appendDummyInput()
            .appendField('output channel:')
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
            this.setOutput(true, 'Channel');
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

Blockly.Blocks['channels_move'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('move channel');
        this.appendValueInput('CATEGORY')
            .setCheck('String')
            .appendField('to category ID');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['channels_rename'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('rename channel');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('to');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['channels_delete'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('delete channel');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['channels_setTopic'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('set topic of channel');
        this.appendValueInput('TOPIC')
            .setCheck('String')
            .appendField('to');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['channels_setSlowmode'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('set slowmode of channel');
        this.appendValueInput('SECONDS')
            .setCheck('Number')
            .appendField('to seconds');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['channels_purge'] = {
    init: function () {
        this.appendValueInput('MESSAGES')
            .setCheck('Number')
            .appendField('purge');
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('messages in channel');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['channels_type'] = {
    init: function () {
        this.appendValueInput('CHANNEL')
            .setCheck('Channel')
            .appendField('start typing in channel');
        this.appendValueInput('SECONDS')
            .setCheck('Number')
            .appendField('for');
        this.appendDummyInput().appendField('seconds');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
    }
}
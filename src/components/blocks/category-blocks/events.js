import * as Blockly from 'blockly';
import { DuplicateOnDrag } from '../duplicate-on-drag.js';

const categoryColor = "#ffbf00";

Blockly.Blocks['events_whenBroadcastRecieved'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('when')
            .appendField(new Blockly.FieldVariable(
                'message1', null,  ['Broadcast'], 'Broadcast'
            ), 'BROADCAST')
            .appendField('is recieved');
        this.setNextStatement(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_broadcast'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('broadcast')
            .appendField(new Blockly.FieldVariable(
                'message1', null,  ['Broadcast'], 'Broadcast'
            ), 'BROADCAST');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks['events_whenStarted'] = {
    init: function() {
        this.appendDummyInput().appendField("when bot starts");
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_message'] = {
    init: function() {
        this.appendDummyInput().appendField('message');
        this.setColour(categoryColor);
        this.setOutput('String');

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
}

Blockly.Blocks['events_reaction'] = {
    init: function() {
        this.appendDummyInput().appendField('reaction');
        this.setColour(categoryColor);
        this.setOutput('String');

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
}

Blockly.Blocks['events_member'] = {
    init: function() {
        this.appendDummyInput().appendField('member');
        this.setColour(categoryColor);
        this.setOutput('String');

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
}

Blockly.Blocks['events_messageEvent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when message")
            .appendField(new Blockly.FieldDropdown([
                ['created', 'CREATE'],
                ['updated', 'UPDATE'],
                ['deleted', 'DELETE']
            ]), 'EVENT');
        this.appendValueInput('MESSAGE').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_messageReactionEvent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when reaction")
            .appendField(new Blockly.FieldDropdown([
                ['added', 'ADD'],
                ['removed', 'REMOVE'],
                ['bulk removed', 'BULK_REMOVE'],
                ['removed by moderator', 'MOD_REMOVE']
            ]), 'EVENT');
        this.appendValueInput('MESSAGE').setCheck('String');
        this.appendValueInput('REACTION').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_memberStatusEvent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('when member')
            .appendField(new Blockly.FieldDropdown([
                ['joins', 'JOIN'],
                ['leaves', 'LEAVE']
            ]), 'EVENT');
        this.appendValueInput('MEMBER').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_memberBanEvent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when member")
            .appendField(new Blockly.FieldDropdown([
                ['banned', 'BAN'],
                ['unbanned', 'UNBAN']
            ]), 'EVENT');
        this.appendValueInput('MEMBER').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}

export default function registerEventToolbox (workspace) {
    workspace.registerButtonCallback('ADD_GLOBAL_BROADCAST', () => {
        const name = prompt('New broadcast name:')?.trim();
        if (!name) return;
        workspace.variableMap.createVariable(name, 'Broadcast');
    });
}
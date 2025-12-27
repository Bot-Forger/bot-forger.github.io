import * as Blockly from 'blockly';
import { DuplicateOnDrag } from '../patches.js';

const categoryColor = "#e59e19";

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

Blockly.Blocks['events_timeoutseconds'] = {
    init: function() {
        this.appendDummyInput().appendField('seconds');
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

Blockly.Blocks['events_messagePinEvent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when message")
            .appendField(new Blockly.FieldDropdown([
                ['pinned', 'PIN'],
                ['unpinned', 'UNPIN']
            ]), 'EVENT');
        this.appendValueInput('MESSAGE').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_memberJoin'] = {
    init: function() {
        this.appendDummyInput().appendField('when member joins');
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

Blockly.Blocks['events_memberKick'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when member kicked")
        this.appendValueInput('MEMBER').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['events_memberTimeoutEvent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when member")
            .appendField(new Blockly.FieldDropdown([
                ['timed out', 'TIME'],
                ['untimed out', 'UNTIME']
            ]), 'EVENT');
        this.appendValueInput('MEMBER').setCheck('String');
        this.appendValueInput('TIME').setCheck('String');
        this.setColour(categoryColor);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.hat = 'cap';
    }
}
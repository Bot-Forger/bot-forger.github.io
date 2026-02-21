import * as Blockly from 'blockly';
import DuplicateOnDrag from '../duplicate-on-drag.js';

const categoryColor = '#ffab19';

Blockly.Blocks['controls_wait'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('SECONDS')
            .appendField('wait');
        this.appendDummyInput()
            .appendField('seconds');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks['controls_repeat'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('REPEAT')
            .setCheck('Number')
            .appendField('repeat');
        this.appendStatementInput('DO');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_forever'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('forever');
        this.appendStatementInput('DO');
        this.setPreviousStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_if'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('VALUE')
            .setCheck('Boolean')
            .appendField('if');
        this.appendDummyInput()
            .appendField('then');
        this.appendStatementInput('THEN');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_if_else'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('VALUE')
            .setCheck('Boolean')
            .appendField('if');
        this.appendDummyInput()
            .appendField('then');
        this.appendStatementInput('THEN');
        this.appendDummyInput()
            .appendField('else');
        this.appendStatementInput('ELSE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_inline_if_else'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('OP')
            .setCheck('Boolean')
            .appendField('if');
        this.appendValueInput('THEN')
            .appendField('then');
        this.appendValueInput('ELSE')
            .appendField('else');
        this.setOutput(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_waitUntil'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('VALUE')
            .setCheck('Boolean')
            .appendField('wait until');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_while'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('CONDITION')
            .setCheck('Boolean')
            .appendField('while');
        this.appendStatementInput('DO');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_try'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('try to do');
        this.appendStatementInput('TRY');
        this.appendValueInput('ERROR')
            .appendField('if a block errors');
        this.appendStatementInput('CATCH');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks['controls_try_error'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput().appendField('error');
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
}

Blockly.Blocks['controls_error'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('MESSAGE')
            .appendField('throw error');
        this.setPreviousStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['controls_stop'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('stop')
            .appendField(new Blockly.FieldDropdown([
                ['bot', 'BOT'],
                ['this script', 'SCRIPT']
            ]), 'STOP');
        this.setPreviousStatement(true);
        this.setInputsInline(true);
    }
}
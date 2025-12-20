import * as Blockly from 'blockly';

const categoryColors = {
    // Events: "#e59e19"
    Tests: "#14e3a2"
};

Blockly.Blocks['string_shadow'] = {
    init: function() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "TEXT");
        this.setOutput(true, "String");
        this.setColour(160);
    }
}

Blockly.Blocks['tests_block1'] = {
    init: function() {
        this.appendDummyInput().appendField("Block 1");
        this.appendValueInput('INPUT').appendField('Input');
        this.appendValueInput('INPUT2').appendField('Input2');
        this.appendValueInput('INPUT3').setCheck('Boolean').appendField('Input3');
        this.setColour(categoryColors.Tests);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        
    }
}

Blockly.Blocks['tests_block2'] = {
    init: function() {
        this.appendDummyInput().appendField("Block 2");
        this.appendValueInput('INPUT').appendField('Input');
        this.appendValueInput('INPUT2').appendField('Input2');
        this.appendValueInput('INPUT3').setCheck('Boolean').appendField('Input3');
        this.setColour(categoryColors.Tests);
        this.setInputsInline(true);
        this.setOutput("String");
    }
}

Blockly.Blocks['tests_block3'] = {
    init: function() {
        this.appendDummyInput().appendField("Block 3");
        this.appendValueInput('INPUT').appendField('Input');
        this.appendValueInput('INPUT2').appendField('Input2');
        this.appendValueInput('INPUT3').setCheck('Boolean').appendField('Input3');
        this.setColour(categoryColors.Tests);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
    }
}

Blockly.Blocks['tests_block4'] = {
    init: function() {
        this.appendDummyInput().appendField("Block 3");
        this.appendValueInput('INPUT').appendField('Input');
        this.appendValueInput('INPUT2').appendField('Input2');
        this.appendValueInput('INPUT3').setCheck('Boolean').appendField('Input3');
        this.setColour(categoryColors.Tests);
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.hat = 'cap';
    }
}

Blockly.Blocks['tests_block5'] = {
    init: function() {
        this.appendDummyInput().appendField("Block 3");
        this.appendValueInput('INPUT').appendField('Input');
        this.appendValueInput('INPUT2').appendField('Input2');
        this.appendValueInput('INPUT3').setCheck('Boolean').appendField('Input3');
        this.appendStatementInput('INPUT4');
        this.setColour(categoryColors.Tests);
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setPreviousStatement(true);

    }
}
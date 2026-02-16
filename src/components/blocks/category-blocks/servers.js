import * as Blockly from 'blockly';

const categoryColor = "#e0c138";

Blockly.Blocks['servers_joined'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('all servers joined');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['servers_find'] = {
    init: function () {
        this.appendValueInput('SEARCH')
            .setCheck('String')
            .appendField('find server with')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['id', 'ID']
            ]), 'TYPE')
        this.setInputsInline(true);
        this.setOutput(true, 'Server');
        this.setColour(categoryColor);
    }
}


Blockly.Blocks['servers_getAttribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['name', 'NAME'],
                ['description', 'DESCRIPTION'],
                ['id', 'ID'],
                ['owner ID', 'OWNER'],
                ['member count', 'MEMBERS'],
                ['icon URL', 'ICON'],
                ['banner URL', 'BANNER'],
                ['creation date', 'CREATION']
            ]), 'ATTR')
            .appendField('of server');
        this.appendValueInput('SERVER').setCheck('Server');
        this.setInputsInline(true);
        this.setOutput('String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['servers_isVerified'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('is server');
        this.appendDummyInput()
            .appendField('verified?');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['servers_leave'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('SERVER')
            .setCheck('Server')
            .appendField('leave server');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
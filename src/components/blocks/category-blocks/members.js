import * as Blockly from 'blockly';

const categoryColor = "#437bc5";

Blockly.Blocks['members_thisBot'] = {
    init: function () {
        this.appendDummyInput().appendField('this bot as a member');
        this.setOutput(true, 'Member');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_all'] = {
    init: function () {
        this.appendDummyInput().appendField('all members in server');
        this.appendValueInput('SERVER').setCheck('Server');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_find'] = {
    init: function () {
        this.appendValueInput('SERVER').setCheck('Server').appendField('find member in server');
        this.appendValueInput('SEARCH')
            .setCheck('String')
            .appendField('with')
            .appendField(new Blockly.FieldDropdown([
                ['username', 'USERNAME'],
                ['user id', 'USERID']
            ]), 'TYPE')
        this.setInputsInline(true);
        this.setOutput(true, 'Member');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_getAttribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown([
                ['username', 'USERNAME'],
                ['user ID', 'ID'],
                ['server nickname', 'SERVER_NICK'],
                ['display name', 'DISPLAY'],
                ['avatar URL', 'AVATAR'],
                ['banner URL', 'BANNER'],
            ]), 'ATTR')
            .appendField('of member');
        this.appendValueInput('MEMBER').setCheck('Member');
        this.setInputsInline(true);
        this.setOutput('String');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_isBot'] = {
    init: function () {
        this.appendValueInput('MEMBER').setCheck('Member').appendField('is member');
        this.appendDummyInput().appendField('a bot?');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_ban'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['ban', 'BAN'],
                ['unban', 'UNBAN']
            ]), 'TYPE');
        this.appendValueInput('MEMBER')
            .setCheck('Member')
            .appendField('member');
        this.appendValueInput('REASON')
            .setCheck('String')
            .appendField('with reason');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_timeout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['timeout', 'TIME'],
                ['untimeout', 'UNTIME']
            ]), 'TYPE');
        this.appendValueInput('MEMBER')
            .setCheck('Member')
            .appendField('member');
        this.appendValueInput('SECONDS')
            .setCheck('Number')
            .appendField('for seconds')
        this.appendValueInput('REASON')
            .setCheck('String')
            .appendField('with reason');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_kick'] = {
    init: function () {
        this.appendValueInput('MEMBER')
            .setCheck('Member')
            .appendField('kick member');
        this.appendValueInput('REASON')
            .setCheck('String')
            .appendField('with reason');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(categoryColor);
    }
}

Blockly.Blocks['members_isTimed'] = {
    init: function () {
        this.appendValueInput('MEMBER').setCheck('Member').appendField('is member');
        this.appendDummyInput()
            .appendField('timed out?');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setColour(categoryColor);
    }
}
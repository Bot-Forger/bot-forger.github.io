import * as Blockly from 'blockly';

const categoryColor = '#59c059';

Blockly.Blocks['operators_arithmetic'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('NUM1')
            .setCheck('Number');
        this.appendValueInput('NUM2')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown([
                ['+', 'ADD'],
                ['-', 'SUBTRACT'],
                ['*', 'MULTIPLY'],
                ['/', 'DIVIDE']
            ]), 'OPERATION');
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_compare'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('OP1');
        this.appendValueInput('OP2')
            .appendField(new Blockly.FieldDropdown([
                ['=', 'EQUALS'],
                ['≠', 'NOTEQUALS'],
                ['<', 'LESSTHAN'],
                ['≤', 'LESSTHANOREQUAL'],
                ['>', 'GREATERTHAN'],
                ['≥', 'GREATERTHANOREQUAL']
            ]), 'COMPARE');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
        this.updateShape_();
    },
    updateShape_: function () {
        const comparison = this.getFieldValue('COMPARE');
        const isStringComparison = comparison === 'EQUALS';
        const requiredTypes = isStringComparison ? ['String', 'Number'] : ['Number'];
        const shadowType = isStringComparison ? 'string_shadow' : 'math_number';
        const op1 = this.getInput('OP1');
        const op2 = this.getInput('OP2');

        if (!op1 || !op2) return;

        [op1, op2].forEach(input => {
            const target = input.connection && input.connection.targetBlock();
            let keepShadow = false;
            let preserved = null;

            if (target && target.isShadow()) {
                const check = target.outputConnection && target.outputConnection.check_;
                if ((!check || check.some(t => requiredTypes.includes(t))) && target.type === shadowType) keepShadow = true;
                else {
                    preserved = target.getFieldValue('NUM') || target.getFieldValue('TEXT') || null;
                    target.unplug(false);
                    target.dispose(false);
                }
            } else if (target) {
                const check = target.outputConnection && target.outputConnection.check_;
                if (check && !check.some(t => requiredTypes.includes(t))) target.unplug(true);
            }

            input.setCheck(requiredTypes);

            if (!keepShadow) {
                input.setShadowDom(null);
                const shadow = document.createElement('shadow');
                shadow.setAttribute('type', shadowType);
                const field = document.createElement('field');
                field.setAttribute('name', isStringComparison ? 'TEXT' : 'NUM');
                if (preserved !== null) field.textContent = preserved;
                shadow.append(field);
                input.setShadowDom(shadow);
            }
        });
    },
    onchange: function (e) {
        if (e.type !== Blockly.Events.BLOCK_CHANGE || e.name !== 'COMPARE') return;
        this.updateShape_();
    }
}

Blockly.Blocks['operators_operation'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('OP1')
            .setCheck('Boolean');
        this.appendValueInput('OP2')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown([
               ['and', 'AND'],
               ['or', 'OR'] 
            ]), 'OPERATION');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_not'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('OP')
            .setCheck('Boolean')
            .appendField('not');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_boolean'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['true', 'TRUE'],
                ['false', 'FALSE']
            ]), 'BOOL');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_random'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('MIN')
            .appendField('pick random');
        this.appendValueInput('MAX')
            .appendField('to');
        this.setOutput(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_isEvenOrOdd'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('NUM');
        this.appendDummyInput()
            .appendField('is')
            .appendField(new Blockly.FieldDropdown([
                ['even', 'EVEN'],
                ['odd', 'ODD']
            ]), 'TYPE');
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_round'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('NUM')
            .appendField('round');
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_mod'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('NUM1');
        this.appendValueInput('NUM2')
            .appendField('mod');
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_of'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('NUM')
            .appendField(new Blockly.FieldDropdown([
                ['abs', 'ABS'],
                ['floor', 'FLOOR'],
                ['ceiling', 'CEILING'],
                ['sqrt', 'SQRT'],
                ['sin', 'SIN'],
                ['cos', 'COS'],
                ['tan', 'TAN'],
                ['asin', 'ASIN'],
                ['acos', 'ACOS'],
                ['atan', 'ATAN'],
                ['log', 'LOG']
            ]), 'TYPE')
            .appendField('of');
        this.setOutput(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['operators_null'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('null');
        this.setOutput(true, null);
    }
}

Blockly.Blocks['operators_pi'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('pi');
        this.setOutput(true, 'Number');
    }
}
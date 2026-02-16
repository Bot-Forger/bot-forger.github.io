import * as Blockly from 'blockly';

const categoryColor = '#e53935';

Blockly.Blocks['dictionaries_create'] = {
    init: function () {
        this.setColour(categoryColor);
        this.setOutput(true, 'Dictionary');
        this.setInputsInline(true);

        this.itemCount_ = 1;

        this.updateShape_();
    },
    mutationToDom: function() {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    updateShape_: function () {
        if (!this.getInput('LABEL')) {
            this.appendDummyInput('LABEL')
                .appendField('create dictionary with');
        }
        if (this.getInput('DECREASE')) {
            this.removeInput('DECREASE');
        }
        if (this.getInput('INCREASE')) {
            this.removeInput('INCREASE');
        }

        for (let i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('KEY' + i)) {
                const keyInput = this.appendValueInput('KEY' + i);
                const keyShadow = Blockly.utils.xml.createElement('shadow');
                keyShadow.setAttribute('type', 'string_shadow');
                const keyField = Blockly.utils.xml.createElement('field');
                keyField.setAttribute('name', 'TEXT');
                keyShadow.appendChild(keyField);
                keyInput.connection.setShadowDom(keyShadow);
            }

            if (!this.getInput('COLON' + i)) {
                this.appendDummyInput('COLON' + i)
                    .appendField(':');
            }
            
            if (!this.getInput('VALUE' + i)) {
                const valueInput = this.appendValueInput('VALUE' + i);
                const valueShadow = Blockly.utils.xml.createElement('shadow');
                valueShadow.setAttribute('type', 'string_shadow');
                const valueField = Blockly.utils.xml.createElement('field');
                valueField.setAttribute('name', 'TEXT');
                valueShadow.appendChild(valueField);
                valueInput.connection.setShadowDom(valueShadow);
            }
            
            if (i < this.itemCount_ - 1 && !this.getInput('COMMA' + i) && this.itemCount_ > 1) {
                this.appendDummyInput('COMMA' + i)
                    .appendField(',  ');
            }
        }
        
        for (let i = this.itemCount_; this.getInput('KEY' + i); i++) {
            this.removeInput('KEY' + i);
            this.removeInput('COLON' + i);
            this.removeInput('VALUE' + i);
            if (this.getInput('COMMA' + i)) {
                this.removeInput('COMMA' + i);
            }
        }

        this.appendDummyInput('DECREASE')
            .appendField(new Blockly.FieldImage(
                '/icons/editor/caret-left.svg',
                16, 16, 'remove list item',
                this.decrease_.bind(this)
            ));
        this.appendDummyInput('INCREASE')
            .appendField(new Blockly.FieldImage(
                '/icons/editor/caret-right.svg',
                16, 16, 'add list item',
                this.increase_.bind(this)
            ));
    },
    increase_: function () {
        if (this.itemCount_ > 9) return;
        this.itemCount_++;
        this.updateShape_();
    },
    decrease_: function () {
        if (this.itemCount_ < 2) return;
        this.itemCount_--;
        this.updateShape_();
    }
}

Blockly.Blocks['dictionaries_empty'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('empty dictionary');
        this.setOutput(true, 'Dictionary');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['dictionaries_get'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('KEY')
            .appendField('get item');
        this.appendValueInput('DICTIONARY')
            .setCheck('Dictionary')
            .appendField('in');
        this.setOutput('String');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['dictionaries_set'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('KEY')
            .appendField('set item');
        this.appendValueInput('VALUE')
            .appendField('to');
        this.appendValueInput('DICTIONARY')
            .setCheck('Dictionary')
            .appendField('in');
        this.setOutput(true, 'Dictionary');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['dictionaries_delete'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('KEY')
            .appendField('delete item');
        this.appendValueInput('DICTIONARY')
            .setCheck('Dictionary')
            .appendField('in');
        this.setOutput(true, 'Dictionary');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['dictionaries_values'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['keys', 'KEYS'],
                ['values', 'VALUES']
            ]), 'VALUE');
        this.appendValueInput('DICTIONARY')
            .setCheck('Dictionary')
            .appendField('of');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['dictionaries_length'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('DICTIONARY')
            .setCheck('Dictionary')
            .appendField('length of');
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['dictionaries_isEmpty'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('DICTIONARY')
            .setCheck('Dictionary')
            .appendField('is');
        this.appendDummyInput()
            .appendField('empty');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
    }
}
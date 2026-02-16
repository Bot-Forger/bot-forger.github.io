import * as Blockly from 'blockly';

const categoryColor = "#58a69c";

Blockly.Blocks['text_asText'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .setCheck(null);
        this.appendDummyInput()
            .appendField('as text');
        this.setColour(categoryColor);
        this.setTooltip('Returns the input as text.');
        this.setOutput(true, 'String');
    }
};

Blockly.Blocks['text_join'] = {
    init: function () {
        this.setColour(categoryColor);
        this.setInputsInline(true);
        this.setOutput(true, 'String');

        this.itemCount_ = 2;
        this.messageList = ["apple", "banana", "pear", "orange", "mango", "strawberry", "pineapple", "grape", "kiwi", "watermelon"];
        this.updateShape_();

    },

    mutationToDom: function() {
        const container = document.createElement('mutation');
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
                .appendField('join');
        }

        if (this.getInput('DECREASE')) {
            this.removeInput('DECREASE');
        }

        if (this.getInput('INCREASE')) {
            this.removeInput('INCREASE');
        }

        for (let i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                const shadow = document.createElement('shadow');
                shadow.setAttribute('type', 'string_shadow');

                const field = document.createElement('field');
                field.setAttribute('name', 'TEXT');
                field.textContent = this.messageList[i] || '..';
                shadow.append(field);

                this.appendValueInput('ADD' + i).connection.setShadowDom(shadow);
            }
        }
        for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
            this.removeInput('ADD' + i);
        }

        this.appendDummyInput('DECREASE')
            .appendField(new Blockly.FieldImage(
                '/icons/editor/caret-left.svg',
                16, 16, 'add join',
                this.decrease_.bind(this)
            ));

        this.appendDummyInput('INCREASE')
            .appendField(new Blockly.FieldImage(
                '/icons/editor/caret-right.svg',
                16, 16, 'remove join',
                this.increase_.bind(this)
            ));
    },

    increase_: function () {
        if (this.itemCount_ > 19) return;
        this.itemCount_++;
        this.updateShape_();
    },

    decrease_: function () {
        if (this.itemCount_ < 3) return;
        this.itemCount_--;
        this.updateShape_();
    }
}


Blockly.Blocks['text_toCase'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck("String");
        this.appendDummyInput()
            .appendField('to')
            .appendField(new Blockly.FieldDropdown([
                ['lower', 'LOWER'],
                ['UPPER', 'UPPER'],
            ]), 'CASE')
            .appendField('case');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
    }
};

Blockly.Blocks['text_length'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('length of');
        this.setColour(categoryColor);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['text_contains'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('does text');
        this.appendValueInput('SUB')
            .setCheck('String')
            .appendField('include');
        this.appendDummyInput()
            .appendField("?");
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_startsEnds'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('does text');
        this.appendValueInput('SUB')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown([
                ['start', 'STARTS'],
                ['end', 'ENDS']
            ]), 'MODE')
            .appendField("with");
        this.appendDummyInput()
            .appendField("?");
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_lettersFrom'] = {
    init: function () {
        this.appendValueInput('START')
            .setCheck('Number')
            .appendField('letters #');
        this.appendValueInput('END')
            .setCheck('Number')
            .appendField('to #');
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('of text');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_replace'] = {
    init: function () {
        this.appendValueInput('FROM')
            .setCheck('String')
            .appendField('replace');
        this.appendValueInput('TO')
            .setCheck('String')
            .appendField('with');
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('in text');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_charAt'] = {
    init: function () {
        this.appendValueInput('INDEX')
            .setCheck('Number')
            .appendField('letter #');
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('in text');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_indexOf'] = {
    init: function () {
        this.appendValueInput('SUB')
            .setCheck('String')
            .appendField('index of');
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('in text');
        this.setColour(categoryColor);
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
};


Blockly.Blocks['text_newLine'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('new line');
        this.setOutput(true, 'String');
    }
}
import * as Blockly from 'blockly';
import { DuplicateOnDrag } from '../duplicate-on-drag.js';

const categoryColor = '#e53935';

Blockly.Blocks['lists_create'] = {
    init: function () {
        this.setColour(categoryColor);
        this.setOutput(true, 'List');
        this.setInputsInline(true);

        this.itemCount_ = 2;

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
                .appendField('create list with');
        }
        if (this.getInput('DECREASE')) {
            this.removeInput('DECREASE');
        }
        if (this.getInput('INCREASE')) {
            this.removeInput('INCREASE');
        }

        for (let i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                const input = this.appendValueInput('ADD' + i);
                const shadow = Blockly.utils.xml.createElement('shadow');
                shadow.setAttribute('type', 'string_shadow');
                const field = Blockly.utils.xml.createElement('field');
                field.setAttribute('name', 'TEXT');
                shadow.appendChild(field);
                input.connection.setShadowDom(shadow);
            }
        }
        for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
            this.removeInput('ADD' + i);
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

Blockly.Blocks['lists_repeat'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('repeat');
        this.appendValueInput('REPEAT')
            .setCheck('Number')
            .appendField('times');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_empty'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField('empty list');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_get'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('ITEM')
            .appendField('get item');
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('in');
        this.setOutput('String');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_add'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('ITEM')
            .appendField('add item');
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('to');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_set'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('ITEM')
            .appendField('set item');
        this.appendValueInput('VALUE')
            .appendField('to');
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('in');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_delete'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('ITEM')
            .appendField('delete item');
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('in');
        this.setOutput(true, 'List');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_isEmpty'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('is');
        this.appendDummyInput()
            .appendField('empty');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
    }
}

Blockly.Blocks['lists_length'] = {
    init: function () {
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('length of');
        this.setColour(categoryColor);
        this.setInputsInline(true);
        this.setOutput('Number');
    }
};

Blockly.Blocks['lists_join'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('join');
        this.appendValueInput('DELIMITER')
            .setCheck('String')
            .appendField('by');
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['lists_forEach'] = {
    init: function () {
        this.appendValueInput('ITEM')
            .appendField('for each');
        this.appendValueInput('INDEX');
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('in');
        this.appendStatementInput('DO');
        this.setColour(categoryColor);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['lists_forEach_item'] = {
    init: function () {
        this.appendDummyInput().appendField('item');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
};

Blockly.Blocks['lists_forEach_index'] = {
    init: function () {
        this.appendDummyInput().appendField('index');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
}

Blockly.Blocks['lists_filter'] = {
    init: function () {
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('filter list');
        this.appendValueInput('ITEM')
            .appendField('by');
        this.appendValueInput('INDEX');
        this.appendValueInput('FILTER')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldImage("/icons/editor/arrow.svg", 24, 24, '*'));
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'List');
    }
};

Blockly.Blocks['lists_filter_item'] = {
    init: function () {
        this.appendDummyInput().appendField('item');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
};

Blockly.Blocks['lists_filter_index'] = {
    init: function () {
        this.appendDummyInput().appendField('index');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
};

Blockly.Blocks['lists_map'] = {
    init: function () {
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('map list');
        this.appendValueInput('ITEM')
            .appendField('by');
        this.appendValueInput('INDEX');
        this.appendValueInput('OUTPUT')
            .appendField(new Blockly.FieldImage("/icons/editor/arrow.svg", 24, 24, '*'));
        this.setInputsInline(true);
        this.setColour(categoryColor);
        this.setOutput(true, 'List');
    }
};

Blockly.Blocks['lists_map_item'] = {
    init: function () {
        this.appendDummyInput().appendField('item');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
};

Blockly.Blocks['lists_map_index'] = {
    init: function () {
        this.appendDummyInput().appendField('index');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
};
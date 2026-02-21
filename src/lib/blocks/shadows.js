import * as Blockly from 'blockly';

Blockly.Blocks['string_shadow'] = {
    init: function() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "TEXT");
        this.setOutput(true, "String");
    }
}
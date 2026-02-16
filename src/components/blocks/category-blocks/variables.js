import * as Blockly from 'blockly/core';

const categoryColor = "#ff8c1a";

Blockly.Blocks['var_get'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable(''), 'VAR');
        this.setOutput(true, null);
    }
}

Blockly.Blocks['var_set'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('VALUE')
            .appendField('set')
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField('to');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks['var_change'] = {
    init: function () {
        this.setColour(categoryColor);
        this.appendValueInput('VALUE')
            .setCheck('Number')
            .appendField('change')
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField('by');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

export default function registerVariableToolbox (workspace) {
    workspace.registerButtonCallback('ADD_GLOBAL_VARIABLE', () => {
        const name = prompt('New variable name:')?.trim();
        if (!name) return;
        workspace.variableMap.createVariable(name);
    });
    workspace.registerToolboxCategoryCallback('GLOBAL_VARIABLES', function () {
        const variables = workspace.getAllVariables().filter(v => v.type === '');
        const xmlList = [];

        const button = Blockly.utils.xml.createElement("button");
        button.setAttribute("text", "Create variable");
        button.setAttribute("callbackKey", "ADD_GLOBAL_VARIABLE");
        xmlList.push(button);

        if (Object.keys(variables).length === 0) return xmlList;

        const valueShadow = Blockly.utils.xml.createElement("value");
        valueShadow.setAttribute("name", "VALUE");
        const shadow = Blockly.utils.xml.createElement("shadow");
        shadow.setAttribute("type", "math_number");
        const field = Blockly.utils.xml.createElement("field");
        field.setAttribute("name", "NUM");
        field.textContent = "0";
        shadow.appendChild(field);
        valueShadow.appendChild(shadow);

        
        const set = Blockly.utils.xml.createElement("block");
        set.setAttribute("type", "var_set");
        const setVarField = Blockly.utils.xml.createElement("field");
        setVarField.setAttribute("name", "VAR");
        setVarField.textContent = variables[0].name;
        set.appendChild(setVarField);
        set.appendChild(valueShadow.cloneNode(true));
        xmlList.push(set);
        
        const change = Blockly.utils.xml.createElement("block");
        change.setAttribute("type", "var_change");
        const changeVarField = Blockly.utils.xml.createElement("field");
        changeVarField.setAttribute("name", "VAR");
        changeVarField.textContent = variables[0].name;
        change.appendChild(changeVarField);
        change.appendChild(valueShadow.cloneNode(true));
        xmlList.push(change);
        
        

        for (const variable of variables) {
            const get = Blockly.utils.xml.createElement("block");
            get.setAttribute("type", "var_get");
            const varField = Blockly.utils.xml.createElement("field");
            varField.setAttribute("name", "VAR");
            varField.textContent = variable.name;
            get.appendChild(varField);
            xmlList.push(get);
        }

        return xmlList;
    });
}
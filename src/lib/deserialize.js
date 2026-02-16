import * as Blockly from 'blockly/core';

const deserializeInput = (input, blocks) => {
    const obj = Object.create(null);

    if (input.shadow) {
        obj.shadow = { id: Blockly.utils.idGenerator.genUid() };
        
        switch (input.shadow[0]) {
            case 'string':
                obj.shadow.type = 'string_shadow';
                obj.shadow.fields = { TEXT: input.shadow[1] };
                break;
            case 'number':
                obj.shadow.type = 'math_number';
                obj.shadow.fields = { NUM: input.shadow[1] };
                break;
            case 'bool':
                obj.shadow.type = 'logic_boolean';
                obj.shadow.fields = { BOOL: input.shadow[1] ? 'TRUE' : 'FALSE' };
                break;
            default:
                obj.shadow.type = input.shadow[0];
                obj.shadow.fields = input.shadow[1];
        }
    }

    if (input.block) {
        obj.block = deserializeBlock(blocks[input.block], input.block, blocks);
    }
    return obj;
};

const deserializeBlock = (block, id, blocks) => {
    const obj = Object.create(null);

    obj.id = id;
    obj.x = block.x || 0;
    obj.y = block.y || 0;
    obj.type = block.type;
    if (block.inputs) {
        obj.inputs = {};
        for (const [name, input] of Object.entries(block.inputs)) {
            obj.inputs[name] = deserializeInput(input, blocks);
        }
    }
    if (block.fields) {
        obj.fields = block.fields;
    }
    if (block.comment) {
        obj.icons = { comment: block.comment };
    }
    if (block.next) {
        obj.next = { block: deserializeBlock(blocks[block.next], block.next, blocks) };
    }
    if (block.extraState) {
        obj.extraState = block.extraState;
    }

    return obj;
}

const deserializeVariables = (variables, type = '') => {
    const array = [];
    for (const [id, name] of Object.entries(variables)) {
        array.push({ id, name, type });
    }
    return array;
}

const deserializeToWorkspace = (json, workspace) => {
    const array = [];

    for (const [id, block] of Object.entries(json.blocks || {})) {
        if (!block.topLevel) continue;
        array.push(deserializeBlock(block, id, json.blocks))
    }

    console.log(json);
    console.log(array);
    Blockly.serialization.workspaces.load({
        blocks: {
            blocks: array,
            languageVersion: 0
        },
        variables: [
            ...deserializeVariables(json.variables || {}),
            ...deserializeVariables(json.broadcasts || {}, 'Broadcast')
        ]
    }, workspace);
};

export default deserializeToWorkspace;
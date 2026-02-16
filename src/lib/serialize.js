import * as Blockly from 'blockly/core';

const serializeInput = (input, blocks) => {
    const obj = Object.create(null);

    if (input.shadow) {
        switch (input.shadow.type) {
            case 'string_shadow':
                obj.shadow = ['string', input.shadow.fields.TEXT || ''];
                break;
            case 'math_number':
                obj.shadow = ['number', input.shadow.fields.NUM || 0];
                break;
            case 'logic_boolean':
                console.log(input.shadow.fields.BOOL);
                obj.shadow = ['bool', input.shadow.fields.BOOL === 'TRUE'];
                break;
            default:
                obj.shadow = [input.shadow.type, input.shadow.fields];
        }
    }

    if (input.block) {
        obj.block = serializeBlock(input.block, blocks, false);
    }
    
    return obj;
};

const serializeBlock = (block, blocks, topLevel) => {
    const obj = Object.create(null);

    obj.type = block.type;
    if (block.x) obj.x = block.x;
    if (block.y) obj.y = block.y;
    if (block.next?.block) obj.next = serializeBlock(block.next.block, blocks, false);
    if (block.inputs) {
        obj.inputs = {};
        for (const [name, input] of Object.entries(block.inputs)) {
            obj.inputs[name] = serializeInput(input, blocks);
        }
    }
    if (block.fields) obj.fields = block.fields;
    if (block.icons?.comment) obj.comment = block.icons?.comment;
    if (block.extraState) obj.extraState = block.extraState;
    if (topLevel) obj.topLevel = true;
    blocks[block.id] = obj;

    return block.id;
};

const serializeVariables = variables => {
    const obj = Object.create(null);
    obj.variables = {};
    obj.broadcasts = {};
    for (const variable of variables) {
        if (variable.type === 'Broadcast') {
            obj.broadcasts[variable.id] = variable.name;
        } else {
            obj.variables[variable.id] = variable.name;
        }
    }
    return obj;
};

const serialize = workspace => {
    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    console.log(workspaceState);
    const obj = Object.create(null);
    const serializedVariables = serializeVariables(workspaceState.variables || []);

    obj.blocks = {};
    obj.variables = serializedVariables.variables;
    obj.broadcasts = serializedVariables.broadcasts;

    if (!workspaceState.blocks) {
        console.log('no blocks');
        return obj;
    }

    for (const block of workspaceState.blocks.blocks) {
        serializeBlock(block, obj.blocks, true);
    }

    console.log(obj);
    return obj;
};

export default serialize;
import * as Blockly from 'blockly/core';

const serializeInput = (input, blocks) => {
    const obj = Object.create(null);

    if (input.shadow) {
        if (input.shadow.type === 'string_shadow') {
            obj.shadow = ['string', input.shadow.fields.TEXT || ''];
        } else if (input.shadow.type === 'math_number') {
            obj.shadow = ['number', input.shadow.fields.NUM || 0];
        } else {
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
    if (topLevel) obj.topLevel = true;
    blocks[block.id] = obj;

    return block.id;
};

const serialize = workspace => {
    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    console.log(workspaceState);
    const obj = Object.create(null);

    obj.blocks = {};

    for (const block of workspaceState.blocks.blocks) {
        serializeBlock(block, obj.blocks, true);
    }

    return obj;
};

export default serialize;
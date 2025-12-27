import * as Blockly from 'blockly/core';

const deserializeInput = (input, blocks) => {
    const obj = Object.create(null);

    if (input.shadow) {
        obj.shadow = { id: Blockly.utils.idGenerator.genUid() };
        if (input.shadow[0] === 'string') {
            obj.shadow.type = 'string_shadow';
            obj.shadow.fields = { TEXT: input.shadow[1] };
        } else if (input.shadow[0] === 'number') {
            obj.shadow.type = 'math_number';
            obj.shadow.fields = { NUM: input.shadow[1] };
        } else {
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

    return obj;
}

const deserializeToWorkspace = (json, workspace) => {
    const array = [];

    for (const [id, block] of Object.entries(json.blocks)) {
        if (!block.topLevel) continue;
        array.push(deserializeBlock(block, id, json.blocks))
    }

    console.log(json);
    console.log(array);
    Blockly.serialization.workspaces.load({
        blocks: {
            blocks: array,
            languageVersion: 0
        }
    }, workspace);
};

export default deserializeToWorkspace;
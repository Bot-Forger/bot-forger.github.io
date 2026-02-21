import * as Blockly from "blockly";

const categoryColor = "#ff6680";

const ARG_BLOCK_TYPE = "FunctionsArgumentBlock";

class CustomChecker extends Blockly.ConnectionChecker {
  canConnect(a, b, isDragging, opt_distance) {
    if (!isDragging) {
      return super.canConnect(a, b, isDragging, opt_distance);
    }

    /** @type {Blockly.BlockSvg} */
    const existing = b.targetConnection && b.targetConnection.getSourceBlock();

    if (
      existing &&
      ((existing.type === "functions_argument_block" && existing.isShadow()) ||
        existing?.outputConnection?.getCheck()?.includes("DuplicateShadowType"))
    ) {
      return false;
    }

    return super.canConnect(a, b, isDragging, opt_distance);
  }
}

Blockly.registry.register(
  Blockly.registry.Type.CONNECTION_CHECKER,
  "CustomChecker",
  CustomChecker,
  true,
);

class FunctionDuplicateOnDrag {
  constructor(block) {
    this.block = block;
    this.originalStart_ = null;
  }

  isMovable() {
    return true;
  }

  startDrag(e) {
    const ws = this.block.workspace;

    try {
      this.originalStart_ = this.block.getRelativeToSurfaceXY();
    } catch (_) {
      this.originalStart_ = null;
    }

    let typeToCreate = this.block.type;
    if (this.block.argType_ === "statement") {
      typeToCreate = "functions_statement_argument_block";
    }

    let data = this.block.toCopyData();
    if (data?.blockState) {
      data.blockState.type = typeToCreate;
    } else {
      data.blockState = { type: typeToCreate };
    }

    if (this.block.mutationToDom) {
      const mutation = this.block.mutationToDom();
      if (mutation) {
        data.blockState.extraState = mutation.outerHTML;
      }
    }

    this.copy = Blockly.clipboard.paste(data, ws);
    this.baseStrat = new Blockly.dragging.BlockDragStrategy(this.copy);
    this.copy.setDragStrategy(this.baseStrat);
    this.baseStrat.startDrag(e);
  }

  drag(e) {
    try {
      if (this.originalStart_) {
        const cur = this.block.getRelativeToSurfaceXY();
        const dx = this.originalStart_.x - cur.x;
        const dy = this.originalStart_.y - cur.y;
        if (dx || dy) this.block.moveBy(dx, dy);
      }
    } catch (_) {}
    this.baseStrat.drag(e);
  }

  endDrag(e) {
    this.baseStrat?.endDrag(e);
  }

  revertDrag(e) {
    this.copy?.dispose();
  }
}

function typeToBlocklyCheck(type) {
  return (
    {
      string: "String",
      number: "Number",
      boolean: "Boolean",
      list: "List",
      dictionary: "Dictionary",
    }[type] || null
  );
}

function findDuplicateArgNames(types, names) {
  const used = {};
  const duplicates = [];

  for (let i = 0; i < types.length; i++) {
    const key = types[i] + ":" + names[i];
    if (!names[i]) continue;

    if (used[key]) duplicates.push(i);
    else used[key] = true;
  }
  return duplicates;
}

function isValidIdentifier(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name);
}

Blockly.Blocks["functions_argument_block"] = {
  init() {
    if (!this.argType_) this.argType_ = "string";
    if (!this.argName_) this.argName_ = "arg";

    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);
    this.appendDummyInput().appendField(
      new Blockly.FieldLabel(this.argName_),
      "ARG_NAME",
    );

    this.setOutput(true, null);
    this.setMovable(true);
    this.setDeletable(true);

    setTimeout(() => {
      if (this.setDragStrategy && this.isShadow()) {
        this.setDragStrategy(new FunctionDuplicateOnDrag(this));
      }
    });
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("type", this.argType_ || "string");
    container.setAttribute("name", this.argName_ || "arg");
    return container;
  },

  domToMutation: function (xmlElement) {
    const type = xmlElement.getAttribute("type") || "string";
    const name = xmlElement.getAttribute("name") || "arg";
    this.updateType_(type);
    this.updateName_(name);
  },

  updateType_: function (type) {
    this.argType_ = type;
    if (type === "statement") {
      this.setOutputShape(3);
      this.setOutput(true, ARG_BLOCK_TYPE);
    } else {
      const outputType = typeToBlocklyCheck(type) || "String";
      this.setOutput(true, outputType);
    }
  },

  updateName_: function (name) {
    this.argName_ = name;
    if (this.getField("ARG_NAME")) {
      this.setFieldValue(name, "ARG_NAME");
    } else {
      this.appendDummyInput().appendField(
        new Blockly.FieldLabel(name),
        "ARG_NAME",
      );
    }
  },
};

Blockly.Blocks["functions_statement_argument_block"] = {
  init() {
    if (!this.argName_) this.argName_ = "arg";

    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);
    this.appendDummyInput().appendField(
      new Blockly.FieldLabel(this.argName_),
      "ARG_NAME",
    );

    this.setNextStatement(true, "default");
    this.setPreviousStatement(true, "default");
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("name", this.argName_ || "arg");
    return container;
  },

  domToMutation: function (xmlElement) {
    const name = xmlElement.getAttribute("name") || "arg";
    this.updateName_(name);
  },

  updateName_: function (name) {
    this.argName_ = name;
    if (this.getField("ARG_NAME")) {
      this.setFieldValue(name, "ARG_NAME");
    } else {
      this.appendDummyInput().appendField(
        new Blockly.FieldLabel(name),
        "ARG_NAME",
      );
    }
  },
};

Blockly.Blocks["functions_definition"] = {
  init: function () {
    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);
    this.setTooltip("Function definition with a variable number of inputs.");
    this.setInputsInline(true);

    this.functionId_ = Blockly.utils.idGenerator.genUid();
    this.functionName_ = "My function"; // This should be replaced later
    this.itemCount_ = 0;
    this.argTypes_ = [];
    this.argNames_ = [];
    this.blockShape_ = "statement";
    this.returnTypes_ = [];

    this.setMutator(
      new Blockly.icons.MutatorIcon(["functions_args_generic"], this),
    );
    
    this.updateShape_();
    setTimeout(() => this.updateShape_());
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("functionid", this.functionId_);
    container.setAttribute("items", String(this.itemCount_));
    container.setAttribute("shape", this.blockShape_ || "statement");

    for (let i = 0; i < this.itemCount_; i++) {
      const item = Blockly.utils.xml.createElement("item");
      item.setAttribute("type", this.argTypes_[i]);
      item.setAttribute("name", this.argNames_[i]);
      container.appendChild(item);
    }

    return container;
  },

  domToMutation: function (xmlElement) {
    const items = xmlElement.getAttribute("items");
    this.itemCount_ = items ? parseInt(items, 10) : 0;
    this.argTypes_ = [];
    this.argNames_ = [];

    const children = [...xmlElement.children].filter(
      (n) => n.tagName.toLowerCase() === "item",
    );
    for (let i = 0; i < children.length; i++) {
      this.argTypes_[i] = children[i].getAttribute("type");
      this.argNames_[i] = children[i].getAttribute("name");
    }

    while (this.argTypes_.length < this.itemCount_)
      this.argTypes_.push("label");
    while (this.argNames_.length < this.itemCount_) this.argNames_.push("text");

    this.functionId_ =
      xmlElement.getAttribute("functionid") ||
      Blockly.utils.idGenerator.genUid();
    this.blockShape_ = xmlElement.getAttribute("shape") || "statement";
    this.updateShape_();
  },

  saveExtraState: function () {
    return {
      functionId: this.functionId_,
      functionName: this.functionName_,
      itemCount: this.itemCount_,
      argTypes: this.argTypes_,
      argNames: this.argNames_,
      shape: this.blockShape_,
      returnTypes: this.returnTypes_,
    };
  },

  loadExtraState: function (state) {
    this.functionId_ = state.functionId || Blockly.utils.idGenerator.genUid();
    this.functionName_ = state.functionName || "My function";
    this.itemCount_ = state.itemCount || 0;
    this.argTypes_ = state.argTypes || [];
    this.argNames_ = state.argNames || [];
    this.blockShape_ = state.shape || "statement";
    this.returnTypes_ = state.returnTypes || [];
    this.updateShape_();
  },

  

  createDefaultArgBlock_: function (type, name = "arg") {
    Blockly.Events.disable();

    let block;
    try {
      const ws = this.workspace;
      block = ws.newBlock("functions_argument_block");
      block.setShadow(true);
      block.setEditable(false);
      block.updateType_(type);
      block.updateName_(name);

      if (ws?.rendered) {
        block.initSvg();
        block.render();
      }
    } catch (_) {}

    Blockly.Events.enable();
    return block;
  },

  updateShape_: function () {
    Blockly.Events.disable();
    let savedBody = null;

    const bodyInput = this.getInput("BODY");
    if (bodyInput && bodyInput.connection?.targetConnection) {
      savedBody = bodyInput.connection.targetConnection;
    }

    if (bodyInput) this.removeInput("BODY");
    if (this.getInput("EMPTY")) this.removeInput("EMPTY");
    if (this.getInput("SHAPE")) this.removeInput("SHAPE");

    [...this.inputList].forEach((input) => {
      const connection = input.connection?.targetConnection;
      if (connection) connection.getSourceBlock()?.dispose(false);
      this.removeInput(input.name);
    });

    this.appendDummyInput()
      .appendField('define function')
      .appendField(new Blockly.FieldTextInput(this.functionName_, this.updateName_.bind(this)));

    for (let i = 0; i < this.itemCount_; i++) {
      const type = this.argTypes_[i];
      const name = this.argNames_[i];

      if (type === "label") {
        this.appendDummyInput().appendField(new Blockly.FieldLabel(name));
      } else {
        const input = this.appendValueInput(name).setCheck(
          typeToBlocklyCheck(type),
        );

        try {
          const shadow = Blockly.utils.xml.createElement("shadow");
          shadow.setAttribute("type", "functions_argument_block");
          const mutation = Blockly.utils.xml.createElement("mutation");
          mutation.setAttribute("type", type);
          mutation.setAttribute("name", name || "arg");
          shadow.appendChild(mutation);
          const field = Blockly.utils.xml.createElement("field");
          field.setAttribute("name", "ARG_NAME");
          field.textContent = name || "arg";
          shadow.appendChild(field);
          input.connection.setShadowDom(shadow);
          if (!input.connection.targetConnection && this.workspace?.rendered) {
            try { input.connection.respawnShadow_(); } catch (_) {}
          }
        } catch (_) {}
      }
    }


    const newBody = this.appendStatementInput("BODY").setCheck("default");
    if (savedBody) {
      try {
        newBody.connection.connect(savedBody);
      } catch (e) {}
    }
    Blockly.Events.enable();
  },

  decompose: function (workspace) {
    const containerBlock = workspace.newBlock("functions_args_container");
    if (workspace.rendered) containerBlock.initSvg();
    let connection = containerBlock.getInput("STACK").connection;

    for (let i = 0; i < this.itemCount_; i++) {
      const type = this.argTypes_[i] || "label";
      const name = this.argNames_[i] || "text";
      const itemBlock = workspace.newBlock("functions_args_generic");
      itemBlock.setFieldValue(type, "ARG_TYPE");
      itemBlock.setFieldValue(name, "ARG_NAME");
      if (workspace.rendered) itemBlock.initSvg();
      itemBlock.valueConnection_ = null;

      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }

    containerBlock.setFieldValue(this.blockShape_, "SHAPEMENU");

    return containerBlock;
  },

  compose: function (containerBlock) {
    const newTypes = [];
    const newNames = [];

    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    while (itemBlock) {
      if (!(itemBlock.isInsertionMarker && itemBlock.isInsertionMarker())) {
        const type = itemBlock.getFieldValue("ARG_TYPE");
        const name = itemBlock.getFieldValue("ARG_NAME");
        newTypes.push(type);
        newNames.push(name);
      }
      itemBlock = itemBlock.getNextBlock();
    }

    const dups = findDuplicateArgNames(newTypes, newNames);

    const invalid = [];
    for (let i = 0; i < newTypes.length; i++) {
      const type = newTypes[i];
      const name = newNames[i];
      if (type !== "label") {
        if (!isValidIdentifier(name)) {
          invalid.push(i);
        }
      }
    }

    itemBlock = containerBlock.getInputTargetBlock("STACK");
    let index = 0;
    while (itemBlock) {
      if (!(itemBlock.isInsertionMarker && itemBlock.isInsertionMarker())) {
        if (dups.includes(index)) {
          itemBlock.setWarningText(
            "This argument name is already used for this type.",
          );
        } else if (invalid.includes(index)) {
          itemBlock.setWarningText("This argument name is not a valid.");
        } else {
          itemBlock.setWarningText(null);
        }

        index++;
      }
      itemBlock = itemBlock.getNextBlock();
    }

    const newBlockShape =
      containerBlock.getFieldValue("SHAPEMENU") || "statement";

    if (dups.length > 0 || invalid.length > 0) return;

    this.itemCount_ = newTypes.length;
    this.argTypes_ = newTypes;
    this.argNames_ = newNames;
    this.blockShape_ = newBlockShape;

    this.updateShape_();
  },

  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 0;
    while (itemBlock) {
      if (!(itemBlock.isInsertionMarker && itemBlock.isInsertionMarker())) {
        const key = this.argTypes_[i] + "_" + this.argNames_[i];
        const input = this.getInput(key);
        itemBlock.valueConnection_ =
          input && input.connection && input.connection.targetConnection;
        i++;
      }
      itemBlock = itemBlock.getNextBlock();
    }
  },

  updateReturnState_: function () {
    const body = this.getInputTargetBlock("BODY");
    const types = new Set();

    function walk(block) {
      if (!block) return;

      if (block?.childBlocks_?.length > 0) block?.childBlocks_.forEach(walk);

      if (block.type === "functions_return") {
        const val = block.getInputTargetBlock("VALUE");
        const checks = val?.outputConnection?.check;
        if (checks !== undefined) {
          (Array.isArray(checks) ? checks : [checks]).forEach((t) =>
            types.add(t),
          );
        }
      }

      walk(block.getNextBlock());
    }
    walk(body);

    if (types.size === 0) this.returnTypes_ = [];
    else this.returnTypes_ = [...types];
  },

  onchange: function (e) {
    if (e.isUiEvent || e.isBlank) return;
    if (e.blockId && e.blockId !== this.id) return;
    const type = e.type;
    const relevant =
      type === Blockly.Events.BLOCK_CHANGE ||
      type === Blockly.Events.BLOCK_MUTATE;
    if (!relevant) return;

    this.workspace.updateFunctionCalls(this);
  },

  updateName_: function (n) {
    const name = n.trim();
    this.functionName_ = name.length < 1 ? 'My function' : name;
    this.workspace.updateFunctionCalls(this);
    return this.functionName_;
  }
};

Blockly.Blocks["functions_args_container"] = {
  init: function () {
    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);
    this.appendDummyInput().appendField("arguments");
    this.appendStatementInput("STACK");
    this.appendDummyInput()
      .appendField("shape")
      .appendField(
        new Blockly.FieldDropdown([
          [
            {
              src: "/icons/editor/statement.svg",
              width: 98 * 0.6,
              height: 57 * 0.6,
              alt: "A block with top and bottom connections",
            },
            "statement",
          ],
          [
            {
              src: "/icons/editor/terminal.svg",
              width: 98 * 0.6,
              height: 48 * 0.6,
              alt: "A block with only a top connection",
            },
            "terminal",
          ],
        ]),
        "SHAPEMENU",
      );
    this.contextMenu = false;
  },
};

Blockly.Blocks["functions_args_generic"] = {
  init() {
    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);

    this.appendDummyInput()
      .appendField("argument")
      .appendField(
        new Blockly.FieldDropdown([
          ["label", "label"],
          ["text", "string"],
          ["number", "number"],
          ["boolean", "boolean"],
          ["list", "list"],
          ["dictionary", "dictionary"],
          ["statement", "statement"],
        ]),
        "ARG_TYPE",
      )
      .appendField(new Blockly.FieldTextInput("arg"), "ARG_NAME");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
    this.valueConnection_ = null;
  },
};

Blockly.Blocks["functions_call"] = {
  init: function () {
    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);
    this.setInputsInline(true);

    this.functionId_ = null;
    this.functionName_ = null;
    this.blockShape_ = null;
    this.argTypes_ = [];
    this.argNames_ = [];
    this.previousArgTypes_ = [];
    this.previousArgNames_ = [];
    this.returnTypes_ = [];

    this.updateShape_();
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("functionid", this.functionId_);
    container.setAttribute("functionname", this.functionName_);
    container.setAttribute("items", this.argTypes_.length);
    container.setAttribute("shape", this.blockShape_ || "statement");
    container.setAttribute(
      "returntypes",
      JSON.stringify(this.returnTypes_ || []),
    );

    for (let i = 0; i < this.argTypes_.length; i++) {
      const item = Blockly.utils.xml.createElement("item");
      item.setAttribute("type", this.argTypes_[i]);
      item.setAttribute("name", this.argNames_[i]);
      container.appendChild(item);
    }

    return container;
  },

  domToMutation: function (xmlElement) {
    this.functionId_ = xmlElement.getAttribute("functionid");
    this.functionName_ = xmlElement.getAttribute("functionname");
    this.blockShape_ = xmlElement.getAttribute("shape") || "statement";
    this.previousArgTypes_ = [...this.argTypes_];
    this.previousArgNames_ = [...this.argNames_];
    this.argTypes_ = [];
    this.argNames_ = [];

    this.returnTypes_;
    try {
      this.returnTypes_ = JSON.parse(
        xmlElement.getAttribute("returntypes") || "[]",
      );
    } catch {
      this.returnTypes_ = [];
    }

    const items = parseInt(xmlElement.getAttribute("items") || "0", 10);
    for (let i = 0; i < items; i++) {
      const item = xmlElement.children[i];
      this.argTypes_[i] = item.getAttribute("type");
      this.argNames_[i] = item.getAttribute("name");
    }

    this.updateShape_();
  },

  matchDefinition: function (defBlock) {
    this.functionId_ = defBlock.functionId_;
    this.functionName_ = defBlock.functionName_;
    this.previousArgTypes_ = [...this.argTypes_];
    this.previousArgNames_ = [...this.argNames_];
    this.argTypes_ = [...defBlock.argTypes_];
    this.argNames_ = [...defBlock.argNames_];
    this.blockShape_ = defBlock.blockShape_;
    this.returnTypes_ = [...defBlock.returnTypes_];

    const gesture = this.workspace?.currentGesture_;
    if (gesture && gesture.isDragging && gesture.isDragging()) {
      setTimeout(() => {
        if (!this.isDeadOrDying()) {
          this.updateShape_();
          if (defBlock.workspace.rendered) this.render();
        }
      }, 100);
      return;
    }

    this.updateShape_();
    if (defBlock.workspace.rendered) this.render();
  },

  updateShape_: function () {
    Blockly.Events.disable();
    console.log('okiierpe');

    const shape = this.blockShape_ || "statement";
    const nextConn = this.nextConnection;
    const prevConn = this.previousConnection;
    const outputConn = this.outputConnection;
    const returnTypes = this.returnTypes_ || [];

    if (returnTypes?.length > 0) {
      if (prevConn && prevConn.isConnected()) {
        prevConn.disconnect();
      }
      if (nextConn && nextConn.isConnected()) {
        nextConn.disconnect();
      }

      this.setPreviousStatement(false);
      this.setNextStatement(false);
      this.setOutput(true, returnTypes);
      this.blockShape_ = "output";
    } else {
      if (outputConn && outputConn.isConnected()) {
        outputConn.disconnect();
      }

      if (shape === "statement") {
        this.setPreviousStatement(true, "default");
        this.setNextStatement(true, "default");
        this.setOutput(false);
        this.blockShape_ = "statement";
      } else if (shape === "terminal") {
        if (nextConn && nextConn.isConnected()) {
          try { nextConn.disconnect(); } catch (_) {}
        }

        this.setNextStatement(false);
        this.setPreviousStatement(true, "default");
        this.setOutput(false);
        this.blockShape_ = "terminal";
      }
    }

    const oldConnections = {};

    [...this.inputList].forEach((input) => {
      if (input.connection){
        const connection = input.connection;
        const targetBlock = connection.targetBlock();
        
        if (targetBlock && connection.targetConnection) {
          oldConnections[input.name] = connection.shadowState ? {
            shadow: {
              type: connection.shadowState.type,
              id: connection.shadowState.id,
              value: this.workspace.getBlockById(connection.shadowState.id)?.inputList[0].fieldRow[0].value_
            },
            targetBlock: targetBlock
          } : {
            targetBlock: targetBlock
          };
        }
      }
      this.removeInput(input.name);
    });

    this.appendDummyInput("EMPTY").appendField(this.functionName_);

    for (let i = 0; i < this.argTypes_.length; i++) {
      const type = this.argTypes_[i];
      const name = this.argNames_[i];

      if (!type || !name) continue;

      if (type === "label") {
        this.appendDummyInput().appendField(name);
        continue;
      }

      let input;
      const key = type + "_" + name;
      if (type === "statement") {
        input = this.appendStatementInput(key).setCheck("default");
      } else {
        input = this.appendValueInput(key).setCheck(typeToBlocklyCheck(type));
      }

      if (oldConnections[key]) {
        const shadow = oldConnections[key].shadow;
        if (shadow) {
          const shadowDom = document.createElement('shadow');
          shadowDom.setAttribute("type", shadow.type);

          const fieldDom = document.createElement("field");
          fieldDom.setAttribute("name", shadow.type === 'string_shadow' ? 'TEXT' : 'NUM');
          fieldDom.textContent = shadow.value ?? '';
          shadowDom.append(fieldDom);

          input.connection.setShadowDom(shadowDom);
        }
        if (oldConnections[key].targetBlock && oldConnections[key].targetBlock.id !== shadow?.id) {
          const targetBlock = oldConnections[key].targetBlock;

          if (targetBlock && 
              !targetBlock.isDeadOrDying() && 
              targetBlock.outputConnection &&
              !targetBlock.outputConnection.targetConnection) {
            try {
              input.connection.connect(targetBlock.outputConnection);
            } catch (_) {
            }
          }
        }
      } else if (type === 'string' || type === 'number') {
        const shadowDom = document.createElement('shadow');
          shadowDom.setAttribute("type", type === 'string' ? 'string_shadow' : 'math_number');

          const fieldDom = document.createElement("field");
          fieldDom.setAttribute("name", type === 'string' ? 'TEXT' : 'NUM');
          shadowDom.append(fieldDom);

          input.connection.setShadowDom(shadowDom);
      }
    }
    Blockly.Events.enable();
  },
};

Blockly.Blocks["functions_return"] = {
  init() {
    this.setStyle("procedure_blocks");
    this.setColour(categoryColor);
    this.appendValueInput("VALUE").appendField("return");
    this.setPreviousStatement(true, "default");
    this.setNextStatement(false);
    this.setInputsInline(true);
  },

  update_() {
    const def = this.getSurroundParent();
    if (def && def.type === "functions_definition") {
      def.updateReturnState_();
      def.workspace.updateFunctionCalls(def);
      return;
    }
    
    const ws = this.workspace;
    if (ws) {
      const defs = ws
        .getTopBlocks(false)
        .filter(b => b.type === "functions_definition");
      for (const d of defs) {
        try { d.updateReturnState_(); } catch (_) {}
        try { ws.updateFunctionCalls(d); } catch (_) {}
      }
    }
  },

  onchange(e) {
    if (e.isUiEvent || e.isBlank) return;

    this.update_();
  },
};

export default function registerFunctionsToolbox (workspace) {
    workspace.updateFunctionCalls = def => {
      // Don't update if there's an active gesture (drag, click, etc)
      if (workspace.currentGesture_) {
        return;
      }

      Blockly.Events.disable();
      const functionId = def.functionId_;
      for (const block of workspace.getAllBlocks(false)) {
        if (block.type !== 'functions_call' || block.functionId_ !== functionId) continue;

        block.matchDefinition(def);
      }
      Blockly.Events.enable();
    };
    workspace.registerToolboxCategoryCallback('FUNCTIONS_CATEGORY', function () {
        const xmlList = [];

        const block = document.createElement("block");
        block.setAttribute("type", "functions_definition");
        xmlList.push(block);

        const blockReturnValue = document.createElement("value");
        blockReturnValue.setAttribute("name", "VALUE");
        blockReturnValue.innerHTML =
            '<shadow type="string_shadow"><field name="TEXT">name</field></shadow>';

        const blockReturn = document.createElement("block");
        blockReturn.setAttribute("type", "functions_return");
        blockReturn.appendChild(blockReturnValue);
        xmlList.push(blockReturn);

        const sep = document.createElement("sep");
        sep.setAttribute("gap", "50");
        xmlList.push(sep);

        const defs = workspace
            .getTopBlocks(false)
            .filter(b => b.type === "functions_definition");

        defs.forEach(defBlock => {
            const block = document.createElement("block");
            block.setAttribute("type", "functions_call");

            const mutation = document.createElement("mutation");
            mutation.setAttribute("functionId", defBlock.functionId_);
            mutation.setAttribute("functionName", defBlock.functionName_);
            mutation.setAttribute("shape", defBlock.blockShape_);
            mutation.setAttribute("items", defBlock.argTypes_.length);
            mutation.setAttribute(
                "returntypes",
                JSON.stringify(defBlock.returnTypes_ || []),
            );

            for (let i = 0; i < defBlock.argTypes_.length; i++) {
                const item = document.createElement("item");
                const type = defBlock.argTypes_[i]
                item.setAttribute("type", type);
                item.setAttribute("name", defBlock.argNames_[i]);

                mutation.appendChild(item);

                if (type === 'string' || type === 'number') {
                    const value = document.createElement("value");
                    const key = type + "_" + defBlock.argNames_[i];
                    value.setAttribute("name", key);
                    const shadow = document.createElement("shadow");
                    shadow.setAttribute("type", type === 'string' ? "string_shadow" : "math_number");
                    
                    if (type === 'string') {
                        const field = document.createElement("field");
                        field.setAttribute("name", "TEXT");
                        shadow.append(field);
                    }
                    
                    value.append(shadow);
                    block.append(value);
                }
            }

            block.appendChild(mutation);
            xmlList.push(block);
        });

        return xmlList;
    });
}
import * as Blockly from 'blockly/core';

Blockly.VerticalFlyout.prototype.getFlyoutScale = () => 0.8;

export class DuplicateOnDrag {
  constructor(block) {
    this.block = block;
  }

  isMovable() {
    return true;
  }

  startDrag(e) {
    const ws = this.block.workspace;

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
    
    this.baseStrat.drag(e);
  }

  endDrag(e) {
    this.baseStrat?.endDrag(e);
  }

  revertDrag(e) {
    this.copy?.dispose();
  }
}
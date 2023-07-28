import { Instruction } from "./SignalWireML";

export class Section {
    private actions: any[];

    constructor() {
        this.actions = [];
    }

    getActions(): any[] {
        return this.actions;
    }

    addInstruction<Type extends Instruction>(instruction: Type): Type {
        this.actions.push(instruction);
        return instruction;
    }
}
import { Instruction } from "./SignalWireMLTypes";

export class Section {
    private name: string;
    private actions: any[];

    constructor(name: string) {
        this.name = name;
        this.actions = [];
    }

    getName(): string {
        return this.name;
    }

    getActions(): any[] {
        return this.actions;
    }

    addInstruction<Type extends Instruction>(instruction: Type): Type {
        this.actions.push(instruction);
        return instruction;
    }
}
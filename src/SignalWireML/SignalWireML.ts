import YAML from "yaml";
import { Section } from "./Section";


export class SignalWireML {
    private readonly sections: { [key: string]: any[] };

    constructor() {
        this.sections = {};
    }

    addSection(name: string | Section): Section {
        if (name instanceof Section) {
            // Is Section, no need to instanciate a new Section Object
            this.sections[name.getName()] = name.getActions();
            return name;
        } else {
            const section = new Section(name);
            this.sections[name] = section.getActions();
            return section;
        }
    }

    toJSON(): string {
        return JSON.stringify({ sections: this.sections }, null, 4);
    }

    toYAML(): string {
        return YAML.stringify({ sections: this.sections });
    }
}

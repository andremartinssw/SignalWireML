import {describe, expect, test} from '@jest/globals';
import { SignalWireML } from '../src/SignalWireML';
import YAML from "yaml";

describe('SignalWireML', () => {
  test('Adding a section', () => {
    const swml = new SignalWireML();
    const section = swml.addSection('test');
    expect(section.getName()).toBe('test');
  });

  test('Adding instructions to a section', () => {
    const swml = new SignalWireML();
    const section = swml.addSection('test');
    section.addInstruction('answer');
    const actions = section.getActions();
    expect(actions).toContain('answer');
  });

  test('Exporting as JSON', () => {
    const swml = new SignalWireML();
    swml.addSection('test').addInstruction('answer');
    const json = swml.toJSON();
    
    expect(JSON.parse(json)).toEqual({
        "sections": {
            "test": [
                "answer"
            ]
        }
    });
  });

  test('Exporting as YAML', () => {
    const swml = new SignalWireML();
    swml.addSection('test').addInstruction('answer');
    const yaml = swml.toYAML();

    expect(yaml).toEqual(YAML.stringify({
        "sections": {
            "test": [
                "answer"
            ]
        }
    }));
  });
});

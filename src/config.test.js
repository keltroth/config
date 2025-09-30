import { expect, test } from 'vitest';
import { config } from './config.js';

test('Config is loaded', () => {
    expect(config.get('rootdir')).not.toBeNull();
});

test('Loads configTest as 12', () => {
    expect(config.get('configTest')).toEqual(12);
});

test('Loads deep.object as obj', () => {
    expect(config.get('deep.obj')).toEqual('obj');
});

test('Should override deep.object.value as 159 vs 123', () => {
    expect(config.get('deep.obj.value')).toEqual(159);
});
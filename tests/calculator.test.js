const calculator = require('../src/calculator');

describe('Calculator Tests', () => {

    test('should add numbers', () => {
        expect(calculator.add(2, 3)).toBe(5);
    });

    test('should subtract numbers', () => {
        expect(calculator.subtract(5, 2)).toBe(3);
    });

    test('should multiply numbers', () => {
        expect(calculator.multiply(3, 4)).toBe(12);
    });

    test('should divide numbers', () => {
        expect(calculator.divide(10, 2)).toBe(5);
    });

    test('should throw error when dividing by zero', () => {
        expect(() => {
            calculator.divide(10, 0);
        }).toThrow("Division by zero");
    });

});
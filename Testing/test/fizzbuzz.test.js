const fizBuzz = require('../fizzbuzz');

describe('FizzBuzz', () => {
    it('Should return a error, if the input type is not a number', () => {
        expect(() => { fizBuzz.fizBuzz('a') }).toThrow();
    });

    it('Should return a FizzBuzz', () => {
        expect(fizBuzz.fizBuzz(15)).toEqual('FizzBuzz');
    });

    it('Should return a Fiz', () => {
        expect(fizBuzz.fizBuzz(3)).toEqual('Fizz');
    });

    it('Should return a Buzz', () => {
        expect(fizBuzz.fizBuzz(5)).toEqual('Buzz');
    });

    it('Should return a input', () => {
        expect(fizBuzz.fizBuzz(1)).toBe(1);
    });
});
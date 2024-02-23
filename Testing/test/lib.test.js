const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('Absolute - Number Testing', () => {
    it('Absolute - Positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('Absolute - Negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('Adsolute - Zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('Greetings! - String Testing', () => {
    it('Vaild Name', () => {
        const ans = lib.greet('Sri');
        expect(ans).toMatch(/Sri/);
        expect(ans).toContain('Sri');
    });
});

describe('Currency - Array Testing', () => {
    it('Currencies', () => {
        const result = lib.currency();
        
        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too Specific
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('AUD')
        expect(result[2]).toBe('EUR')

        //Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('Product - Object Testing', () => {
    it('Products', () => {
        const result = lib.product(1);

        //Too Specific
        expect(result).toEqual({ id: 1, price: 10});

        //Proper way
        expect(result).toMatchObject({ id: 1, price: 10 });

        //Ideal way
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('price', 10);
    });
});

describe('User - Exception Testing', () => {
    it('Valid username', () => {
        const result = lib.user('Harini');
        expect(result).toMatchObject({ username: 'Harini' });
        expect(result.id).toBeGreaterThan(0);
    });

    it('Invalid username', () => {
        const invaildUsername = [null, undefined, NaN, '', false];
        invaildUsername.forEach(a => {
            expect(() => { lib.user(a) }).toThrow();
        });
    });
});

describe('Mock Function', () => {
    it('Should be apply 10% discount', () => {
        db.getCustomer = function(id){
            console.log('Fake Mock Fuction Test');
            return { id: id, points: 11 };
        }

        const order = { id: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('Fake Function', () => {
    it('Should return a Notify', () => {
        // db.getCustomer = function(customerId){
        //     console.log('Fake Function to Notify');
        //     return { id: customerId, email: 'magic@yahoo.in' };
        // }

        // let mailSent = false;
        // mail.send = function(email, message){
        //     mailSent = true;
        // }

        // lib.notifyCustomer({ id: 1 });
        // expect(mailSent).toBe(true);

        db.getCustomer = jest.fn().mockReturnValue({ email: 'magic@yahoo.in'});
        mail.send  = jest.fn();

        lib.notifyCustomer({ id: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('magic@yahoo.in');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
})
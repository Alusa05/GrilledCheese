const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { JSDOM } = require('jsdom');

describe('Grilled Cheese Recipe Page', () => {
    let document;

    before(async () => {
        const filePath = path.join(__dirname, '../Index.html');
        const html = fs.readFileSync(filePath, 'utf-8');
        const dom = new JSDOM(html);
        document = dom.window.document;
    });

    it('should have a heading for ingredients', () => {
        const heading = document.querySelector('h2');
        expect(heading).to.not.be.null;
        expect(heading.textContent.trim()).to.equal('Grilled Cheese Ingredients');
    });

    it('should have an unordered list', () => {
        const ul = document.querySelector('ul');
        expect(ul).to.not.be.null;
    });

    it('should list 2 slices of bread, 4 slices of cheese, and 1 tbsp of butter', () => {
        const listItems = [...document.querySelectorAll('ul > li')].map(li => li.textContent.trim());
        console.log(listItems); // Add this line to see the output
        expect(listItems).to.include('2 slices of bread');
        expect(listItems.some(item => item.includes('4 slices of cheese'))).to.be.true;
        expect(listItems).to.include('1 tbsp Butter');
    });

    it('should have a nested list for cheese types', () => {
        const cheeseList = document.querySelector('ul > li:nth-child(2) > ul'); 
        expect(cheeseList).to.not.be.null;
        const cheeses = [...cheeseList.querySelectorAll('li')].map(li => li.textContent.trim());
        expect(cheeses).to.include('Cheddar');
        expect(cheeses).to.include('Mozzarella');
    });
    it('should have an ordered list of instructions', () => {
        const ol = document.querySelector('ol');
        expect(ol).to.not.be.null;
        const steps = [...ol.querySelectorAll('li')].map(li => li.textContent.trim());
        expect(steps).to.deep.equal([
            'Spread butter on bread and frying pan',
            'Place bread in frying pan and fry',
            'Add cheese on top of bread',
            'Cover with second slice of bread',
            'Turn over and fry for 2 minutes'
        ]);
    });
});

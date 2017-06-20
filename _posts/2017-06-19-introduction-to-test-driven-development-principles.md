---
layout: post
title: Basic Introduction to Test-Driven Development for JavaScript
excerpt_separator: <!--more-->
date: 2017-06-19 08:04:00
---
A great friend (an incredibly talented developer) and I were drinking some excellent whiskey recently, and we got to talking about junior developers starting on teams where TDD is well-established.  There is a huge amount written on the subject, there are multiple flavours and there are also a huge number of frameworks that support writing better tests.  This can be overwhelming when the fundamentals are quite simple, and the “attitude” can get lost in the deluge of information and opinions.  My friend suggested that it would be great to have an article he could point new people to, which would lay-out a very simple but very detailed test-driven example, using as few frameworks as possible.  This would help keep the TDD message clear.  Here I attempt to deliver a very basic example using Javascript.

<!--more-->

**An (incredibly brief) Introduction to the Theory of TDD**

![](/assets/post-assets/tdd-introduction/red-green-refactor.png)

All changes made using a test-driven approach use the same process: Red, Green, Refactor.

*Red*: Define a behaviour your application does not have by writing a test you expect to fail.

*Green*: Write as little code as possible (even if this code is filthy) to make the test pass.

*Refactor*: Clean your code against whichever code standards you wish.  Focus on simple issues such as duplication and coupling first, before moving on to any other violations.

**Example**

To keep things simple, we’re going to create a very basic shopping basket.  Obviously this isn’t original but there’s a reason it’s used in so many examples, kata and interviews.  It’s one of the most relatable abstractions of a real-world entity but it can also scale in complexity and doesn’t have to rely on any external dependencies.

Our basket is going to allow consumers to:

* Add a product
* Get the calculated total
* Add a discount
* Get the calculated discount total

**Step 1**

We need to setup our environment.  With this example, the plan is to use as few frameworks as possible so all we’re going to install is a test framework and an assertion library.  We’re going to use Mocha for structuring and running our tests, and Chai for assertions.  Both are simple, well-adopted and provide a very expressive syntax.  We are also going to use NPM to install packages and run our tests.

Setup your node environment with `npm init` and leave all options as default.  Now setup Mocha and Chai with `npm install --save-dev mocha chai`.  Change your package.json test command to the following so that it runs our Mocha tests.

```javascript
{
  "presets": ["react"]
}
```

Our environment is now good to go.  To test this attempt to run Mocha by typing `npm test` and you should receive an error complaining that no test scripts were found.  This is good – because we haven’t written any tests yet.

**Step 2**

So let’s dive in and get a test failing as quickly as possible.

Create a js file for our tests called `shopping-basket-spec.js`.  The first behaviour we want from our basket is to add a product.  To test this, we will need our shopping-basket module to expose two functions: `addProduct` and `viewProducts`.  We write our test by expressing the interface we want from our module.  In this case:

```javascript
var basket = require('./shopping-basket'),
    should = require('chai').should();

describe('shopping-basket', function(){
  it('allows products to be added', function(){
    const products = [{ id: 123 }, { id: 456 }];
    products.map(basket.addProduct);
    basket.viewProducts().should.deep.equal(products);
  })
})
```

In this test, we have mocked a list of products, added them to the basket and then asserted that the return value of `viewProducts` is equal to the list of products.  Running our tests (using the command `npm test`) should result in the following:

```
module.js:338
    throw err;
    ^

Error: Cannot find module './shopping-basket'
    at Function.Module._resolveFilename (module.js:336:15)
    at Function.Module._load (module.js:286:25)
    at Module.require (module.js:365:17)
    at require (module.js:384:17)
    at Object.<anonymous> (c:\Source\Winter\post-tdd-simple\shopping-basket-spec.js:1:76)
    at Module._compile (module.js:434:26)
    at Object.Module._extensions..js (module.js:452:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Module.require (module.js:365:17)
    at require (module.js:384:17)
    at c:\Source\Winter\post-tdd-simple\node_modules\mocha\lib\mocha.js:230:27
    at Array.forEach (native)
    at Mocha.loadFiles (c:\Source\Winter\post-tdd-simple\node_modules\mocha\lib\mocha.js:227:14)
    at Mocha.run (c:\Source\Winter\post-tdd-simple\node_modules\mocha\lib\mocha.js:495:10)
    at Object.<anonymous> (c:\Source\Winter\post-tdd-simple\node_modules\mocha\bin\_mocha:469:18)
    at Module._compile (module.js:434:26)
    at Object.Module._extensions..js (module.js:452:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Function.Module.runMain (module.js:475:10)
    at startup (node.js:117:18)
    at node.js:951:3
```

We have our first failing test.  The first problem we have to solve is that the file cannot be found.  The fastest way to solve this is to create a file at the same level as the test called `shopping-basket.js`.  Let’s create that and re-run our tests:

```
shopping-basket
  1) allows products to be added


0 passing (18ms)
1 failing

1) shopping-basket allows products to be added:
   TypeError: undefined is not a function
    at Array.map (native)
    at Context.<anonymous> (shopping-basket-spec.js:7:14)
```

The next complaint is that `addProduct` is not a function.  This can be solved quickly by adding a function to `shopping-basket.js` and exporting it as `addProduct`.  Re-running our tests gives us another failure:

```
shopping-basket
  1) allows products to be added


0 passing (17ms)
1 failing

1) shopping-basket allows products to be added:
   TypeError: basket.viewProducts is not a function
    at Context.<anonymous> (shopping-basket-spec.js:8:12)
```

Same issue as last time – let’s export another function from `shopping-basket.js` called `viewProducts` and re-run our tests.

```
shopping-basket
  1) allows products to be added


0 passing (17ms)
1 failing

1) shopping-basket allows products to be added:
   TypeError: Cannot read property 'should' of undefined
    at Context.<anonymous> (shopping-basket-spec.js:8:26)
```

Now, the tests are complaining that `viewProducts` returns undefined.  The fastest way to solve this issue is to make it return something.  So let’s have `viewProducts` return an empty array.

```javascript
module.exports.addProduct = function(){}

module.exports.viewProducts = function(){
  return [];
}
```

And re-running our tests returns the following:

```
shopping-basket
  1) allows products to be added


0 passing (29ms)
1 failing

1) shopping-basket allows products to be added:

    AssertionError: expected [] to deeply equal [ { id: 123 }, { id: 456 } ]
    + expected - actual

    -[]
    +[
    +  {
    +    "id": 123
    +  }
    +  {
    +    "id": 456
    +  }
    +]

    at Assertion.assertEqual (node_modules\chai\lib\chai\core\assertions.js:951:19)
    at Assertion.methodWrapper [as equal] (node_modules\chai\lib\chai\utils\addMethod.js:57:25)
    at Context.<anonymous> (shopping-basket-spec.js:8:39)
```

Great!  So now our only problem is the value returned isn’t what’s expected.  The quickest way to solve this problem is to have the function return the exact array we’re expecting.

```javascript
module.exports.viewProducts = function(){
  return [{ id: 123 }, { id: 456 }];
}
```

```
shopping-basket
  √ allows products to be added


1 passing (18ms)
```

So now we have a passing test.  However, we know that the implementation is terrible because it will only ever return the value we have hard-coded.  We could refactor the implementation straight away but it would be better to amend our tests to expose the flaw.  In this case, we’ll use parameterised tests which is a way of running the same test multiple times but with different inputs and expected outputs.  Let’s amend our tests by moving the test into a function which takes the inputs and outputs as arguments.  Then we will call that function twice using different parameters as below.

```javascript
describe('shopping-basket', function(){
  function testAddingAndRetrievingProducts(products){
    it('allows products to be added.  Test Case: '+JSON.stringify(products), function(){
      products.map(basket.addProduct);
      basket.viewProducts().should.deep.equal(products);
    })
  }

  testAddingAndRetrievingProducts([{ id: 123 }, { id: 456 }]);
  testAddingAndRetrievingProducts([{ id: 789 }, { id: 555 }]);
})
```

After re-running our tests, we have one passing and one failing test.  We have successfully exposed the flaw in our implementation.  Now we must refactor our implementation to make both tests pass.  Let’s add the following code to add and return the correct values.

```javascript
var state = {
  products: []
}

module.exports.addProduct = function(product){
  state.products.push(product);
}

module.exports.viewProducts = function(){
  return state.products;
}
```

Re-running our tests returns an error.  This is because our basket now has state and both tests reference the same instance.  So in the first test, we are adding two products.  In the second test we are adding another two products but we haven’t removed the first two.  This means that after the second test is run, the basket has four products when we’re expecting two.  To work around this, we need to ensure a new instance of `shopping-basket.js` is created for each test.  We will do this by having shopping basket return a function and move the state down to the function’s scope.  We will then setup the new instance by calling Mocha’s `beforeEach` function which runs a given call-back before every test.

```javascript
module.exports = function(){
  var state = {
    products: []
  }

  function addProduct(product){
    state.products.push(product);
  }

  function viewProducts(){
    return state.products;
  }

  return {
    addProduct: addProduct,
    viewProducts: viewProducts
  }
}
```

```javascript
var Basket = require('./shopping-basket'),
    should = require('chai').should();

describe('shopping-basket', function(){
  var basket;

  beforeEach(function(){
    basket = Basket();
  })

  function testAddingAndRetrievingProducts(products){
    it('allows products to be added.  Test Case: '+JSON.stringify(products), function(){
      products.map(basket.addProduct);
      basket.viewProducts().should.deep.equal(products);
    })
  }

  testAddingAndRetrievingProducts([{ id: 123 }, { id: 456 }]);
  testAddingAndRetrievingProducts([{ id: 789 }, { id: 555 }]);
})
```

Now re-running our tests results in two passes.

```
shopping-basket
  √ allows products to be added.  Test Case: [{"id":123},{"id":456}]
  √ allows products to be added.  Test Case: [{"id":789},{"id":555}]


2 passing (19ms)
```

**Step 3**

Now we want to get our basket total, so let’s write a test.  The following test adds a collection of products to the basket and then asks the basket to calculate the total.  It then asserts that the given total matches the expected value.

```javascript
it('calculates the basket total', function(){
  const products = [{ price: 23.99 }, { price: 2.99 }];
  const expectedTotal = 26.98;

  products.map(basket.addProduct);
  basket.getTotalPrice().should.equal(expectedTotal);
})
```

Running the tests reveals the function we want doesn’t exist so let’s add it.  Re-running the tests results in a failure, complaining that the value doesn’t match what we expected.  Let’s fix this as quickly as possible by hard-coding the value we expect.

```javascript
module.exports = function(){
  var state = {
    products: []
  }

  function addProduct(product){
    state.products.push(product);
  }

  function viewProducts(){
    return state.products;
  }

  function getTotalPrice(){
    return 26.98;
  }

  return {
    addProduct: addProduct,
    viewProducts: viewProducts
    getTotalPrice: getTotalPrice
  }
}
```

If we run our tests again, they all pass.  However, again, this hasn’t effectively modelled the basket’s behaviour so we need to refactor it.  Parameterising this test and adding another case should expose this flaw.  Let's replace the test we just wrote a parameterised version as below:

```javascript
function testTotalPriceCalculation(products, expectedTotal){
  it('calculates the basket total. Test Case: '+expectedTotal, function(){
    products.map(basket.addProduct);
    basket.getTotalPrice().should.equal(expectedTotal);
  })
}

testTotalPriceCalculation([{ price: 23.99 }, { price: 2.99 }], 26.98);
testTotalPriceCalculation([{ price: 45.00 }, { price: 89.48 }], 134.48);
```

Re-running the tests result in a welcome failure, so now we correct the implementation as quickly as possible as below:

```javascript
function getTotalPrice(){
  return Number(state.products.reduce(function(acc, product){
    return acc + product.price;
  }, 0.0).toFixed(2));
}
```

And now our tests pass.

```
shopping-basket
  √ allows products to be added.  Test Case: [{"id":123},{"id":456}]
  √ allows products to be added.  Test Case: [{"id":789},{"id":555}]
  √ calculates the basket total. Test Case: 26.98
  √ calculates the basket total. Test Case: 134.48


4 passing (22ms)
```

**Step 4**

So finally, let’s add the ability to apply a discount and then get the calculated total with the discount included.  A failing test should be easy in this case, let's add the following to our `shopping-basket-spec.js`:

```javascript
it('applies discount and calculates discounted total', function(){
  const products = [{ price: 11.98 }, { price: 14.11 }];
  const discountPercentage = 10;
  const expectedDiscountedTotal = 23.72;

  products.map(basket.addProduct);
  basket.applyPercentageDiscount(discountPercentage);
  basket.getDiscountedTotalPrice().should.equal(expectedDiscountedTotal);
})
```

Running this fails so let’s add the function `applyPercentageDiscount` to our basket and export it as below:

```javascript
module.exports = function(){
  var state = {
    products: []
  }

  function addProduct(product){
    state.products.push(product);
  }

  function viewProducts(){
    return state.products;
  }

  function getTotalPrice(){
    return Number(state.products.reduce(function(acc, product){
      return acc + product.price;
    }, 0.0).toFixed(2));
  }

  function applyPercentageDiscount(){}

  return {
    addProduct: addProduct,
    viewProducts: viewProducts,
    getTotalPrice: getTotalPrice,
    applyPercentageDiscount: applyPercentageDiscount
  }
}
```

Another failure for a missing function.  This time it's `getDiscountedTotalPrice` so let’s add it, export it and run our tests again.

So now it’s failing because `getDiscountedTotalPrice` returns undefined.  We can get this test to pass by hard-coding our expected value.

```javascript
function getDiscountedTotalPrice(){
  return 23.72;
}
```

This passes but we need to expose the flaw in our implementation with parameterised tests.  Replace the discount-calculation test we wrote with a parameterised version as below:

```javascript
function testDiscountApplied(products, discountPercentage, expectedDiscountedTotal){
  it('applies discount and calculates total.  Test Case: '+expectedDiscountedTotal, function(){
    products.map(basket.addProduct);
    basket.applyPercentageDiscount(discountPercentage);
    basket.getDiscountedTotalPrice().should.equal(expectedDiscountedTotal);
  })
}

testDiscountApplied([{ price: 11.98 }, { price: 14.11 }], 10, 23.72);
testDiscountApplied([{ price: 24.45 }, { price: 15.88 }], 30, 31.02);
```

Running the tests now will give us the failure we expected.  

```
shopping-basket
  √ allows products to be added.  Test Case: [{"id":123},{"id":456}]
  √ allows products to be added.  Test Case: [{"id":789},{"id":555}]
  √ calculates the basket total. Test Case: 26.98
  √ calculates the basket total. Test Case: 134.48
  √ applies discount and calculates total.  Test Case: 23.72
  1) applies discount and calculates total.  Test Case: 31.02


5 passing (27ms)
1 failing

1) shopping-basket applies discount and calculates total.  Test Case: 31.02:

    AssertionError: expected 23.72 to equal 31.02
    + expected - actual

    -23.72
    +31.02

    at Context.<anonymous> (shopping-basket-spec.js:35:47)
```

Now we can refactor the implementation and re-run our tests.

```javascript
function applyPercentageDiscount(discountPercentage){
  state.discountPercentage = discountPercentage;
}

function getDiscountedTotalPrice(){
  var total = state.products.reduce(function(acc, product){
    return acc + product.price;
  }, 0.0);
  var discountFactor = (state.discountPercentage / 100) + 1;
  return Number((total / discountFactor).toFixed(2));
}
```

```
shopping-basket
  √ allows products to be added.  Test Case: [{"id":123},{"id":456}]
  √ allows products to be added.  Test Case: [{"id":789},{"id":555}]
  √ calculates the basket total. Test Case: 26.98
  √ calculates the basket total. Test Case: 134.48
  √ applies discount and calculates total.  Test Case: 23.72
  √ applies discount and calculates total.  Test Case: 31.02


6 passing (19ms)
```

Re-running now gives us 6 passing tests.  If we take a look at our implementation, we have two significant areas of business logic which have been duplicated.  These are:

* Calculating the basket total
* Rounding the result of our calculations to currency

We now have 6 tests which accurately assert the behaviour of our system and we have the confidence to refactor our implementation, safe in the knowledge that our tests will catch any regression issues.

We can refactor the basket total duplication by moving the logic into a locally-scoped function and referencing it twice.

```javascript
module.exports = function(){
  var state = {
    products: [],
    discountPercentage: 0
  }

  function _calculateBasketTotal(){
    return state.products.reduce(function(acc, product){
      return acc + product.price;
    }, 0.0);
  }

  function addProduct(product){
    state.products.push(product);
  }

  function viewProducts(){
    return state.products;
  }

  function getTotalPrice(){
    return Number(_calculateBasketTotal().toFixed(2));
  }

  function applyPercentageDiscount(discountPercentage){
    state.discountPercentage = discountPercentage;
  }

  function getDiscountedTotalPrice(){
    var total = _calculateBasketTotal();
    var discountFactor = (state.discountPercentage / 100) + 1;
    return Number((total / discountFactor).toFixed(2));
  }

  return {
    addProduct: addProduct,
    viewProducts: viewProducts,
    getTotalPrice: getTotalPrice,
    applyPercentageDiscount: applyPercentageDiscount,
    getDiscountedTotalPrice: getDiscountedTotalPrice
  }
}
```

Re-running our tests shows we haven’t broken anything.  We can now refactor the rounding into a similar locally-scoped function.

```javascript
module.exports = function(){
  var state = {
    products: [],
    discountPercentage: 0
  }

  function _calculateBasketTotal(){
    return state.products.reduce(function(acc, product){
      return acc + product.price;
    }, 0.0);
  }

  function _formatDecimalAsCurrency(decimal){
    return Number(decimal.toFixed(2));
  }

  function addProduct(product){
    state.products.push(product);
  }

  function viewProducts(){
    return state.products;
  }

  function getTotalPrice(){
    return _formatDecimalAsCurrency(_calculateBasketTotal());
  }

  function applyPercentageDiscount(discountPercentage){
    state.discountPercentage = discountPercentage;
  }

  function getDiscountedTotalPrice(){
    var total = _calculateBasketTotal();
    var discountFactor = (state.discountPercentage / 100) + 1;
    return _formatDecimalAsCurrency((total / discountFactor));
  }

  return {
    addProduct: addProduct,
    viewProducts: viewProducts,
    getTotalPrice: getTotalPrice,
    applyPercentageDiscount: applyPercentageDiscount,
    getDiscountedTotalPrice: getDiscountedTotalPrice
  }
}
```

Re-running our tests again shows we haven’t changed the behaviour and our `shopping-basket.js` is looking clean.

**Wrap Up**

In this post, we have covered a basic introduction to TDD theory and a very simple practical application of Red, Green, Refactor.  Hopefully, this has achieved the goal set to me by a friend over a glass of good whiskey.

**Sources and Further Reading**

Kevin Rutherford has an excellent video “Red, Green, … now what?!” available [here](https://www.youtube.com/watch?v=fSr8LDcb0Y0&t=1239s).  It focuses on the process of refactoring and explains Connascence - a great set of principles against which to measure code quality.

Kent Beck’s required reading on the fundamentals of TDD: “Test-Driven Development by Example”.

The code accompanying this article is available at [https://github.com/stevenield/post-tdd-simple](https://github.com/stevenield/post-tdd-simple).

---
layout: post
title: Test Driving React with Enzyme - A Shallow Introduction
excerpt_separator: <!--more-->
date: 2017-01-11 09:58:00
comments: true
url: test-driving-react-with-enzyme
id: tddenzyme
---

Test frameworks like Mocha and Karma make testing your Javascript code trivial.  They provide expressive assertion patterns, make it easy to mock dependencies and they run anywhere which makes them great for CI.  Testing your React components, however, can be difficult because much of the functionality of your component happens during the render lifecycle.  This means that in order to simulate actions and make assertions on your component’s behaviour, you must write (potentially a lot of) DOM interrogation code.  This can lead to large tests which in turn reduces the expressiveness of those tests, and their ability to clearly describe the behaviour of your application.  Enzyme is the solution.

<!--more-->
**Enzyme**

Enzyme is a test framework library developed by Airbnb to make testing React components trivial so that your tests stay expressive.  It does this by providing a fluent API for traversing the DOM, simulating user interaction and making good expressive assertions.  It also supports different types of rendering so that you only render as much of the component as you need in order to perform your test.  The three rendering options are:

* *Shallow* - Renders the component without invoking the behaviour of any child components.  This allows the component to be unit tested without assumptions about the behaviour of dependencies.
* *Mount* - Fully renders the component, which requires a DOM API.  The DOM API can be mocked using [jsdom](https://github.com/tmpvar/jsdom).  This allows tests to be run which assert behaviour relating to the component render lifecycle.  For example, data has been loaded in the componentDidMount handler.
* *Static* - Renders the component as static HTML which is great for situations where you need to assert on the DOM structure but don't need to assert on component logic.

In this article, we will be using shallow rendering only.

Enzyme goes out of its way to ensure it is accessible, which is something I love.  Its syntax for rendering components is very similar to react-test-utils because it worked and there was no need to change it.  It uses jQuery-style selectors for DOM traversal because they make sense.  NPM and bower are full of integrations with your favourite assertion library and test framework so the learning curve is very smooth.

**The Application**

We’re going to test-drive a very simple React component in order to demonstrate how simple Enzyme can be to get up and running.

We’re going to create a React component which has 2 elements: a button and a container.  The component holds a counter in state and when the button is clicked, the counter is incremented.  The container displays the counter.  Very simple.

**Tools**

We’ll be using the following tools to create and run the tests:

* *NPM*: Package manager
* *Mocha*: Test framework
* *Chai*: Assertion library
* *Babel*: For pre-compiling our JSX prior to running the tests

Check the Enzyme documentation to see a full list of compatible test libraries.

**Step 1 - Environment Setup**

Create a folder for the test application and open your console there.

Setup your package.json using `npm init`.

You can use the default values when prompted except for the test script value which should be the following: `mocha *-spec.js --require babel-core/register`

Install all of your dependencies using:

```
npm install --save-dev mocha chai enzyme babel-core babel-preset-react react react-dom react-addons-test-utils
```

Configure babel by adding a file named .babelrc at the same level as your package.json.  It should contain the following:

```javascript
{
  "presets": ["react"]
}
```

If you’ve completed this step correctly, you should be able to run `npm test` and get the following output:

![](/assets/post-assets/enzyme/step-1-npm-test-output.png)

**Step 2 - Creating the component**

Test driving creation of the component is outside the scope of this article so for now create two files:

> incrementor.jsx

```Javascript
var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (<div></div>)
  }
})
```

> incrementor-spec.js

```Javascript
var Incrementor = require('./incrementor.jsx'),
    enzyme = require('enzyme'),
    chai = require('chai'),
    React = require('react');

var expect = chai.expect;

describe('Incrementor component', function(){
  var component;

  function renderComponent(){
    component = enzyme.shallow(<Incrementor />);
  }

  it('exists', function(){
    expect(Incrementor).to.exist;
  })

  it('renders', function(){
    renderComponent();
    expect(component).to.exist;
  })
});
```

Running `npm test` should result in 2 happily passing tests.

**Step 3 - Initialising the component**

Write one new test which asserts that the component’s counter is initialised to 0.  We are using Enzyme here to access the component’s state and then assert that it has the expected value.  Add the following test to your incrementor-spec.js:

```Javascript
it('sets initial state to 0', function(){
  renderComponent();
  expect(component.state().count).to.equal(0);
})
```

Running `npm test` fails as expected, so let's update the component:

```Javascript
var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      count: 0
    };
  },
  render: function(){
    return (<div></div>)
  }
})
```

Running `npm test` should result in 3 passing tests.  Write another test which asserts that the component’s increment is initialised to 1.  Add the following test to incrementor-spec.js:

```Javascript
it('sets increment to 1', function(){
  renderComponent();
  expect(component.state().increment).to.equal(1);
})
```

This fails, as expected so now add the code to the component:

```Javascript
var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      count: 0,
      increment: 1
    };
  },
  render: function(){
    return (<div></div>)
  }
})
```

Running `npm test` should result in 4 passing tests.

**Step 4 - Displaying the counter**

Add the following test which asserts that a DOM element with id “count” contains the components current count state:

```Javascript
it('displays the count', function(){
  const count = 57;
  renderComponent();
  component.setState({
    count: count
  });
  expect(component.find('#count').text()).to.equal(count.toString());
})
```

Here we have used component.find and passed a selector to get the element with id ‘count’.  We are then asserting that the contents of that element match the state we have set on the component.

Running should result in failure.  Add the following code to the component to make the test pass:

```Javascript
var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      count: 0,
      increment: 1
    };
  },
  render: function(){
    return (<div>
              <div id="count">{ this.state.count }</div>
            </div>)
  }
})
```

Running `npm test` should result in 5 passing tests.

**Step 5 - Increment functionality**

Add the following tests which assert that when a button with id ‘increment’ is clicked, it increments the count by the increment value and which is then propagated down to the ‘count’ element:

```Javascript
describe('when the "increment" button is clicked', function(){
  function incrementCount(){
    component.find('#increment').simulate('click');
  }
  function setInitialCount(initialCount){
    component.setState({
      count: initialCount
    })
  }
  it('increments the count by 1', function(){
    renderComponent();
    setInitialCount(33);
    incrementCount();
    expect(component.state().count).to.equal(34);
  })
  it('displays the incremented count', function(){
    renderComponent();
    setInitialCount(45);
    incrementCount();
    expect(component.find('#count').text()).to.equal('46');
  })
})
```

In the incrementCount function we are finding the button using a selector and then calling simulate on the element.  This will fire the onClick event handler of the button if one is set.

Running `npm test` should result in failure.  Add the following code to the component to make the tests pass:

```Javascript
var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      count: 0,
      increment: 1
    };
  },
  increment: function(){
    this.setState({
      count: this.state.count+=this.state.increment
    })
  },
  render: function(){
    return (<div>
              <button id="increment" onClick={this.increment} />
              <div id="count">{ this.state.count }</div>
            </div>);
  }
})
```

Running `npm test` should result in 7 passing tests.

**Finally...**

And that’s it – a very shallow and brief introduction to Enzyme and some of it’s major features.  As you can see the tests are very lightweight and expressive.

Please contact me if you’d like to talk about Enzyme or any of it’s features.  I’m still learning this technology and would love to hear from others about their successes or failures.

**Sources and Further Reading**

The excellent Enzyme documentation can be found here: [https://github.com/airbnb/enzyme/tree/master/docs/api](https://github.com/airbnb/enzyme/tree/master/docs/api)

The code for this post can be found here: [https://github.com/stevenield/post-enzyme](https://github.com/stevenield/post-enzyme)

---
layout: post
title: An Argument for Test-Driven Development
excerpt: Trying to introduce a new methodology to an organisation comprising technical and non-technical stakeholders can be difficult.  Having good justifications on-hand can be incredibly helpful and so here I’d like to provide four business justifications for TDD with which I have previously had success.
date: 2017-05-15 11:38:00
---

In my experience, developers who are learning a new methodology take a very similar journey.  Likely, they will begin the learning process open-minded but then quickly become sceptical as the questions and concerns start to build up.

If the methodology works, a developer will begin to see the benefits of the new approach and it will begin to feel comfortable to build software in this way.  This period can be weeks or months and during that time, the developer has had their own unique experiences, successes and failures.  These experiences, which are personal to them, have brought them to the understanding that the new methodology is better than the old.

The problem here is that the vast majority of developers work within an organisation comprised of project delivery, senior management and non-technical stakeholders who all have a say in shaping the software delivery methodology but who have not and probably will never, take that same journey.  What usually happens here is that the developer will enthusiastically attempt to have the new methodology integrated into the existing process but then will struggle to effectively “make the case” even though to the developer – it’s obvious.

Having good justifications on-hand can be incredibly helpful in this scenario and so here I’d like to provide four business justifications for TDD with which I have previously had success.

**Easier to Plan**

TDD is a very predictable way of writing software which means there are fewer unknowns in a project’s lifecycle.  This makes it much easier to plan resources and commit to delivery dates.  If we are only writing code in response to a failing test, then our application will be very lean making it easier to identify defects.  All behaviours of our application are described in tests so it is less likely that the application fails if all tests pass.  If, however, this does happen then it simply means we are missing a test.  Once this has been identified, finding the missing test is usually simple.

Where there is no methodology in place, there is usually a period of disorganised bug-hunting which relies on logging and debugging while running the application, to determine the root cause.  This can be unpredictable because there are a large number of dependencies which could be contributing to the unexpected behaviour.  This process is incredibly difficult to plan.

During planning sessions, developers will be able to estimate the complexity of a potential change with a greater degree of confidence due to the predictable nature of TDD.

**Less Risk**

Having a suite of tests available to run at any time, gives a huge amount of confidence to developers which can be useful for a number of reasons.  For example, releases have less-risk and can be performed with less resource on-hand.  If your tests are run as part of an automated build pipeline, then this risk is reduced even further.

Confidence also inspires experimentation which means that any changes suggested by a stakeholder can easily be spiked, knowing that the tests will catch any regression issues.  This is great for the application because any small improvements can be made with little effort where they might otherwise have been deemed too risky or too much work.

**Enforces Good Application Design**

Writing tests encourages you to structure your application using good design principles.  For example, small components are easier to test and dependencies are much easier to mock if they are injected.  You only write code in response to a failing test, you write as little code as possible and you are constantly iterating through refactor cycles to remove duplication and coupling.  As the complexity is reduced, changes are simpler to make.  This means that a software team can respond faster to requirements and the business can fail (or succeed) faster.  Additionally, simpler applications are more robust when running in production because there are fewer factors contributing to a failure.  All of the behaviour of an application is clearly documented and understood because it is completely expressed in tests.

**Easier to Build Development Momentum**

When faced with a proposed piece of work, it can sometimes be difficult to know where to start.  With TDD, once you have broken your larger problem into smaller work-items, you can work on each item in isolation so it really doesn’t matter too much where you start.  This makes it much easier to build up momentum and track progress.

**Sources**

The excellent *Test-Driven Development by Example* by Kent Beck is a great source on the real practical benefits of Test-Driven Development.

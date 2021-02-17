# Payroll challenge

## Running the Project

To run this project you should first start the Spring Boot server, followed by the React UI

First, in the server project, you can start the server with the following command

### `mvn spring-boot:run`

This will start the server on port 8080 on your machine.

Second, in the challenge-ui project directory, you can start the UI application with the following command:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## SOLID Principles

In object oriented software development, SOLID is an acronym for a set of principles that help make an application more
maintainable. To learn more about SOLID, see the following links [1](https://en.wikipedia.org/wiki/SOLID)
, [2](https://www.baeldung.com/solid-principles)

Here's what the acronym stands for and how I've applied these principles to my design

### S = Single Responsibility

A class having a single responsibility means it is only meant to do one thing. This practice reduces coupling, make
testing easier, and makes for smaller, more organized classes. An example of how I applied this in my project was in
having separate services for calculating costs (`CostService`) and saving/ retrieving data (`EmployeeService`) since
they are doing different things.

### O = Open/Closed

A class should be closed for modification, but open for extension.  
This principle [can be taken to mean a couple of things](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle),
but the primary interpretation is around polymorphism, where the interface is closed for modification, in this case by
the abstract class. Extension of behavior is made possible by defining new subclasses and creating instances of them at
runtime.

An example of where I've used this in this project is in the `DeductionCalculators` that define the deduction based on
whether an entity is an employee or dependent, or whether to apply a discount at runtime.

### L = Liskov Substitution

This principle is concerned with using subtypes that are interchangeable and don't have any change on the program. An
example of where I used this in this project is in the `NameStartsWithADiscountDecorator` classes that inherits
from `DiscountDecorator` and can be substituted out with different discount decorators.

### I = Interface Segregation

This principle is all about protecting clients from depending on methods that they don't use. Interfaces for a class
should be small, resulting in high cohesion for objects and the classes they depend on.

### D = Dependency Inversion

This principle states that high level classes should not depend on low level classes. Both should depend upon
abstractions that leave out the details. This allows for classes, and even components to be loosely coupled. For this
project, the `ChallengeController` does not depend on low level details of `Decorator` classes, instead it is loosely
coupled, only knowing that is passes in a list of employees and gets back a Costs object it can return upstream.
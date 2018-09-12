/**
  * Cameron Dewey
  * 09 - 12 - 2018
  * CS 336
  * Lab 02
  */


//build a Person prototype
function Person(name, birthdate) {
  this.name = name;
  this.birthdate = birthdate;
  this.friends = [];
}

//create a mutator that changes name
Person.prototype.newName = function(newName) {
    this.name = newName;
}

// returns the name
Person.prototype.getName = function() {
  return this.name
}

// create a birthdate accessor (copied code from professors link)
Person.prototype.getAge = function() {
  return getAge(this.birthdate);
}

Person.prototype.greeting = function() {
  console.log("Hi, my name is " + this.getName());
}


//create a mutator to add a friend to list of friends
Person.prototype.addFriends = function(newFriend) {
  this.friends.push(newFriend);

}


//TEST PERSON
var p1 = new Person("John", "08/13/2001")

p1.addFriends("James");
console.log(p1)
p1.greeting();


//creating a student to inherit from Person
function Student(name, birthdate,study) {
  Person.call(this, name, birthdate);
  this.study = study;
}

//edit the greeting for a student
Student.prototype.greeting = function() {
  console.log("Hi, my name is " + this.getName + ". I am a student and I study " + this.study);
}


//TEST Student
var s1 = new Student("Johanna Jacobs Finclehigmershmit", "01/01/01", "Teachings of Jesus")
s1.greeting();
console.log(s1);
s1.addFriends("The trinity");
console.log(s1);

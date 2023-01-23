require('dotenv').config();


/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


/** 2) Create a 'Person' Model */
const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  }
);

const Person = mongoose.model("Person", personSchema);

let prin = function(done) {
  return new Person(
    {
      name: "Prin",
      age: 35,
      favoriteFoods: ["Pizza", "Potato"]
    }
  );
  if (error) return done(error);
  done(null, result);
};


/** 3) Create and Save a Person */
const createAndSavePerson = (done) => {

  let francesca = new Person(
    {
      name: "Francesca",
      age: 20,
      favoriteFoods: ["sushi"]
    }
  );

  francesca.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

  // OR

  // francesca.save((error, data) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     done(null, data);
  //   }
  // });

};


/** 4) Create many People with `Model.create()` */
let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};


/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// OR

// const findPeopleByName = (personName, done) => {
//   Person.find({name: personName}, (error, arrayOfResults) => {
//     if (error) {
//       console.log(error);
//     } else {
//       done(null, arrayOfResults);
//     }
//   });
// };


/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// OR

// const findOneByFood = (food, done) => {
//   Person.findOne({favoriteFoods: {$all : [food]}}, (error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       done(null, result);
//     }
//   });
// };


/** 7) Use `Model.findById()` */
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// OR

// const findPersonById = (personId, done) => {
//   Person.findById(personId, (error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       done(null, result);
//     }
//   });
// };


/** 8) Classic Update : Find, Edit then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });

};

// OR

// const findEditThenSave = (personId, done) => {
//   const foodToAdd = 'hamburger';

//   Person.findById(personId, (error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       dog.favoriteFoods.push(foodToAdd);

//       dog.save((error, updatedResult) => {
//         if (error) {
//           console.log(error);
//         } else {
//           done(null, updatedResult);
//         }
//       });
//     }
//   });

// };


/** 9) New Update : Use `findOneAndUpdate()` */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  });
};

// OR

// const findAndUpdate = (personName, done) => {
//   const ageToSet = 20;

//   Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedRecord) => {
//     if (error) {
//       console.log(error);
//     } else {
//       done(null, updatedRecord);
//     }
//   });
// };


/** 10) Delete one Person */
// Example

// Person.findOneAndRemove({name: "Poppy"}, (error, deletedRecord) => {
//   if (!error) {
//     console.log(deletedRecord);
//   }
// });

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

// OR

// const removeById = (personId, done) => {
//   Person.findByIdAndRemove(personId, (error, deletedRecord) => {
//     if (error) {
//       console.log(error);
//     } else {
//       done(null, deletedRecord);
//     }
//   });
// };


/** 11) Delete many People */
// Example

// Person.remove({age: {$gte: 18}}, (error, data) => {
//   if (!error) {
//     console.log(data);
//   }
// });

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

// OR

// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";

//   Person.remove({name: nameToRemove}, (error, removalInfo) => {
//     if (error) {
//       console.log(error);
//     } else {
//       done(null, removalInfo);
//     }
//   });
// };


/** 12) Chain Query helpers */
// Example

// Person.find({favoriteFoods: {$all: ["Salad"]}})
//   .sort({age: "asc"})
//   .limit(4)
//   .select("name age")
//   .exec((error, data) => {
//     if (!error) {
//       console.log(data);
//     }
//   });

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: "asc"})
    .limit(2)
    .select({age: 0})
    .exec((error, people) => {
      done(error, people);
    });
};

// OR

// const queryChain = (done) => {
//   const foodToSearch = "burrito";

//   Person.find({favoriteFoods: {$all: [foodToSearch]}})
//     .sort({name: "asc"})
//     .limit(2)
//     .select("-age")
//     .exec((error, filteredResults) => {
//       if (error) {
//         console.log(error);
//       } else {
//         done(null, filteredResults);
//       }
//     });
// };


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
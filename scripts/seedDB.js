const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gather4goodevents",
  {
    useMongoClient: true
  }
);

const eventSeed = [
  {
    title: "Earth Day Columbus",
    date: new Date(Date.now()),
    time: new Date(Date.now()),
    description:
      "Earth Day Columbus is the largest volunteer-led Earth Day service effort in the U.S. Organized annually by Green Columbus, a Central Ohio nonprofit.",
    img_url: "https://static1.squarespace.com/static/580ac286be6594479600b400/t/586e453fbe659461a743ad52/1516552077692/",
    location_name: "The Park",
    location_street: "605 N High St, Suite 229",
    location_city: "Columbus",
    location_state: "OH",
    location_zip: "43215"
  },
  {
    title: "Save the Chinchillas!",
    date: new Date(Date.now()),
    time: new Date(Date.now()),
    description:
      "We're fighting to conserve this beautiful species. Let's come together to raise money and awareness to help protect the chinchillas!",
    img_url: "https://www.petmd.com/sites/default/files/chinchilla-fun-facts.jpg",
    location_name: "The Refuge",
    location_street: "123 Main St",
    location_city: "Portland",
    location_state: "OR",
    location_zip: "97204"
  }
];

const causeSeed = [
  { name: "Gender Equality" },
  { name: "LGBTQ Rights" },
  { name: "Environment" },
  { name: "Racial Equality" },
  { name: "Animal Rights" },
  { name: "Education" },
  { name: "Human Rights" },
  { name: "Immigration" },
  { name: "Public Health" },
  { name: "Economic Equality" },
  { name: "Gun Control" },
]

db.Event
  .remove({})
  .then(() => {
    db.Event.collection.insertMany(eventSeed);
    db.Cause.collection.insertMany(causeSeed);
  })
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

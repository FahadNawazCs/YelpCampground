const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6724ed2f19028933a5f0d409',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dc2tctam4/image/upload/v1737744651/YelpCamp/wtl09f2v1ml7dasdrcck.jpg',
                    filename: 'YelpCamp/wtl09f2v1ml7dasdrcck',
                },
                {
                    url: 'https://res.cloudinary.com/dc2tctam4/image/upload/v1737744651/YelpCamp/qarewqsgobe5qocpooch.jpg',
                    filename: 'YelpCamp/qarewqsgobe5qocpooch',
                },
                {
                    url: 'https://res.cloudinary.com/dc2tctam4/image/upload/v1737744651/YelpCamp/qf4eet8usmyenm1ufjw9.avif',
                    filename: 'YelpCamp/qf4eet8usmyenm1ufjw9',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
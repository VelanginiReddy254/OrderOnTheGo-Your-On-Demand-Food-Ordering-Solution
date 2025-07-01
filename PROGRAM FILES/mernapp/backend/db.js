import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://nagiripreethi1612:PreeThi%2316@orderonthego.ekvnooo.mongodb.net/OrderOnTheGomern?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items = fetched_data;

    mongoose.connection.db.collection("foodCategory").find({}).toArray(function(err, catData) {
      if (err) {
        console.error("Error fetching food categories:", err);
      } else {
        global.foodCategory = catData;
      }
    });

  } catch (error) {
    console.error("❌ Error connecting to MongoDB or fetching data:", error);
  }
};

export default mongoDB;
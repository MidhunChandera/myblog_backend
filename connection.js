const mongoose=require('mongoose')

console.log(process.env.CONNECTIONSTRING);

const connectionstring=process.env.CONNECTIONSTRING

mongoose.connect(connectionstring).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

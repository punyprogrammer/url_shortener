const express=require('express');
const mongoose =require('mongoose')
const ShortUrl=require('./models/shortUrl.js')
const datetime=require('datetime')
const connectDB =async()=>{
    const conn=  await mongoose.connect('mongodb+srv://amardeepganguly:amardeep123@cluster0.keg5r.mongodb.net/shorturl?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`The database has been connected to${ conn.connection.host}`)
}
connectDB();
const app =express();
const PORT=process.env.PORT||3000
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.get('/',async (req,res)=>{
    const shortUrls=await ShortUrl.find({"createdAt":{$gt:new Date(Date.now() - 5*60 * 1000)}});
    console.log(shortUrls);
    res.render('index',{shortUrls:shortUrls});
})
app.post('/shortUrls',async (req,res)=>{
   await  ShortUrl.create({full: req.body.fullUrl})
   res.redirect('/')
})
app.get('/:shortUrls', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrls })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.click++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
app.listen(PORT,()=>{
    console.log("Server restarted");
})
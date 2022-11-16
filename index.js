const express = require('express')
const bcrypt = require('bcrypt')

let hashedPass = '';
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.get('/', (req,res)=>{
    res.render('compare.ejs')
})

app.post('/hashPass', async(req, res)=>{
    hashedPass = await bcrypt.hash(req.body.pass, 10)
    console.log(req.body.pass+'\n'+hashedPass);
    res.send('Hashed the Pass')
})

app.post('/comparePass', async(req,res)=>{
    let is_true = await bcrypt.compare(req.body.pass, hashedPass)
    if(is_true){
        res.send('Equal')
    }
    else{
        res.send('Not Equal')
    }
})

app.listen(3000, () => {
    console.log('Server is listening on 3000')
})

const express = require('express');
const morgan = require('morgan');


const app = express();


app.use(morgan('combined'))
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers',(req,res)=>{
  res.send('We have juicy cheese burgers')

})


app.get('/pizza/pineapple',(req,res)=>{
  res.send('"Your pizza is on the way!"')
})



app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Ip:${req.ip}
    Body:${req.body}
  `;
  res.send(responseText);
});

app.get('/queryViewer',(req,res)=>{
  console.log(req.query);
  res.send(req.query)
  res.end();
})

app.get('/greetings',(req,res)=>{
  const name = req.query.name;
  const race = req.query.race;
  if(!name){
    return res.status(400).send('Please provide a name')
  }
  
  if(!race){
    return res.status(400).send('Please provide a race');
  }
  const greeting = `Greetings ${name} the ${race}, welcome
  to our kingdom.here is the additional info`;

  res.send(greeting);
})

// Assignment part 

app.get('/sum',(req,res)=>{
  const a = Number(req.query.a)
  const b = Number(req.query.b)  
  if(!a){
    return res.status(400).send('Please provide a number a')

  }
  if(!b){
    return res.status(400).send('Please provide a number b')
  }

  const result = `The sum of ${a} and ${b} is ${a+b}`
  res.send(result)
})


CaesarCipher=(text,shift)=>{
  console.log(text)
  
  let upperCase = text.toUpperCase().split('')
  
  result = upperCase.map(char=>{
    let processed =((char.charCodeAt(0)+Number(shift)-65)%26+65)
    return String.fromCharCode(processed)
  })
  return result.join('')

}

app.get('/cipher',(req,res)=>{
  const text = req.query.text
  const shift = req.query.shift
  if(!text){
    return res.status(400).send('Please provide text for decipher')
  }
  if(!shift){
    return res.status(400).send('Please provide shift key')
  }
  result = CaesarCipher(text,shift)
  res.send(result)

})

app.get('/lotto',(req,res)=>{
  const numArray = req.query.numbers;
  const computerGeneratedArray = [];
  console.log(numArray,'test array')
  for(i=1;i<7;i++){
    computerGeneratedArray.push(Math.floor(Math.random()*20)+1)
  }
  console.log(computerGeneratedArray,'test computer array')

  
  let result = numArray.filter( num =>
    computerGeneratedArray.includes(Number(num))
	)
  console.log(result,'test result')
  if(result.length<4){
    res.send('Sorry, you lose')
  }else if(result.length===4){
    res.send('Congratulations, you win a free ticket')
  }else if(result.length===5){
    res.send('Congratulations! You win $100!')    
  }else if(result.length===6){
    res.send('Wow! Unbelievable! You could have won the mega millions!')
  }


  
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
 
});
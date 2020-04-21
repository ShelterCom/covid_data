var express=require('express');
const app=express();
const path=require('path')
const port=process.env.PORT || 5000

const cors=require('cors');
app.use(cors());
app.options('*', cors());

const sc=require('./scraper.js')

var data=[]

var fun = async function(){
    let str=await sc.scrape()
	  data=[]
		//to json
		var prev=""
		var len=str.length
    var obj={}
    var word=""
		for(let i=0;i<len;i++)
		{
			if(str[i]==" ")
			{
				if(word=="state" || word=="cases" || word=="cured" || word=="death")
				{
					prev=word
					word=""
				}
				else if(prev=="state" && (str[i+1]!='c' || str[i+2]!='a')){
					word+=str[i];
				}
				else{
					obj[prev]=word
					if(prev=="death")
          {
            data.push(obj)
            obj={}
          }
					prev=""
					word=""
				}
			}
			else {
				word+=str[i]
			}
		}
}
fun();

var wsc=require('./worldscraper.js')
var data2=[]
var fun2 = async function(){
  let str=await wsc.scrape()
  data2=[]
  var prev=""
  var len=str.length
  var obj={}
  var word=""
  for(let i=0;i<len;i++)
  {
    if(str[i]==" ")
    {
      if(word=="country" || word=="cases" || word=="cured" || word=="death")
      {
        prev=word
        word=""
      }
      else if(prev=="country" && (str[i+1]!='c' || str[i+2]!='a')){
        word+=str[i];
      }
      else{
        if(prev)
          obj[prev]=word
        if(prev=="cured")
        {
          data2.push(obj)
          obj={}
        }
        prev=""
        word=""
      }
    }
    else {
      word+=str[i]
    }
  }
}
fun2()

app.get('/', (req, res) => {
  res.json(data);
});

app.get('/world',(req,res)=>{
  res.json(data2);
})

app.listen(port,function(){
	console.log('server running on port ',port)
})

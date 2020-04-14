var express=require('express');
const app=express();
const path=require('path')
const port=5000 || process.env.PORT || process.env.app_port

var exec = require('child_process').execFile;
var data=[]

var fun =function(){
   console.log("fun() start");
	 data=[]
   exec(path.join(__dirname,'/scraper.exe'), function(err, str) {
		 		if(err)
					console.log(err)
				else {
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
    });
}
fun();

app.get('/', (req, res) => {
  res.json(data);
});

app.listen(port,function(){
	console.log('server running on port ',port)
})

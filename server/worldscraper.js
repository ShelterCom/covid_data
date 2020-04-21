const rp=require('request-promise')
const url="https://www.worldometers.info/coronavirus/"
const ch=require('cheerio')

exports.scrape=async function()
{
	var data=""
	await rp(url).then(function(html){
		var rawdata=ch('td[style*=bold]',html);
		var count=0;
		rawdata.each(function(){
			count+=1
			if(count==1)
				data+="country"
			else if(count==2)
				data+="cases"
			else if(count==4)
				data+="death"
			else if(count==6)
				data+="cured"
			else if(count==12)
				count=0
			if(count==1 || count==2 || count==4 ||count==6)
			{
				data+=" "
				data+=ch(this).text()
				data+=" "
			}
		})
	})
	return data
}

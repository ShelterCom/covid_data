const rp=require('request-promise')
const url="https://www.mohfw.gov.in/"
const ch=require('cheerio')

exports.scrape=async function()
{
	var data=""
	await rp(url).then(function(html){
		var rawdata=ch('tbody tr td',html);
		var count=4
		rawdata.each(function(){
			if(count==4)
				count=0
			else {
				count++
				if(count==1)
					data+="state"
				else if(count==2)
					data+="cases"
				else if(count==3)
					data+="cured"
				else
					data+="death"
				data+=" "
				data+=ch(this).text()
				data+=" "
			}
		})
	})
	return data
}

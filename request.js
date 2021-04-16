var request = require('request')
request('http://api.douban.com/v2/movie/top250?start=25&count=2',{},(rej,res)=>{
    console.log(res.data)
    console.log(rej)
})
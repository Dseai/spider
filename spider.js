var http=require('http');
var cheerio=require('cheerio');
var Promise=require('bluebird');
var querystring = require('querystring');
var superagent=require('superagent');
//var cookie;
var cookie='JwOAUserSettingNew=UserNum=iW/WI7u4luJhhHnoPo1RJA==&UserName=7Y8YDG3HWKHiQP8Ylo1R8w==&UserType=WmTb330+jk8=&UserLoginTime=2017/4/28 11:31:54; expires=Fri, 12-May-2017 03:31:54 GMT; path=/';

//var LoginUrl='http://jwc.jxnu.edu.cn/default.aspx';
var browserMsg={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        'Content-Type':'application/x-www-form-urlencoded'
    };
    //模拟登陆
    //querystring.stringify()
    var postData = {
  		__EVENTTARGET : '',
  		__EVENTARGUMENT:'',
  		__LASTFOCUS:'',
  		__VIEWSTATE:'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',
  		__EVENTVALIDATION:'/wEWSQLm4d+KCwLr6+/kCQK3yfbSBAKDspbeCQL21fViApC695MMAsjQmpEOAsjQpo4OAv3S2u0DAv3S9t4DAqPW8tMDAv3S6tEDAqPW3ugDArWVmJEHAr/R2u0DAqrwhf4KAsjQtoIOAuHY1soHAsjQooMOAv3S3ugDArfW7mMC/dL+0AMCvJDK9wsC/dLy0wMCr9GugA4C8pHSiQwC6dGugA4C+dHq0QMC3NH61QMCjtCenA4CntDm2gMCxrDmjQ0CyNCqhQ4Co9b+0AMCvJDaiwwC3NHa7QMCv9Hi3wMC/dLu3AMC3NHm2gMCjtCyhw4CpbHqgA0CyNCugA4C/dLm2gMC3NHq0QMCjtCigw4C/dLi3wMCjtC+hA4CqvCJ9QoC3NHu3AMC3NHi3wMC6dGenA4C3NHy0wMCjtC6mQ4CjtCugA4C3NH+0AMCntDa7QMC/dL61QMCw5bP/gICv9He6AMC8pHaiwwCr9Gyhw4CyNC+hA4CyNCenA4C3NH23gMCr9GqhQ4C3NHe6AMCo9bm2gMCjtC2gg4C+euUqg4C2tqumwgC0sXgkQ8CuLeX+QECj8jxgApR6QBzxrgstygH0GFsQwDr0jF8X9AWJAzKzuSaJPYt1g==',
  		rblUserType:'Student',
  		ddlCollege:'Student',
  		StuNum:1408091057,
  		TeaNum:'',
  		Password:'SYN123XD',
  		login:'登录'
  		}

    //访问登录接口获取cookie
    // function getLoginCookie() {
    //     //userid = userid.toUpperCase();
    //     return new Promise(function(resolve, reject) {
    //         superagent.post('http://jwc.jxnu.edu.cn/Default_Login.aspx?preurl=').set(browserMsg).send(postData).end(function (res) {
    //             if(res.ok){
    //             console.log(JSON.stringify(res.body))
    //             //获取cookie
				// cookie = response.headers["set-cookie"];
    //             resolve(cookie);
    //         }else{
    //         	console.log('error '+res.text);
    //         }
                
                
    //            });
    //     });
    // }
     function getData(cookie) {
        return new Promise(function(resolve, reject) {
            //传入cookie
            //console.log(cookie);
            superagent.get('http://jwc.jxnu.edu.cn/MyControl/Student_InforCheck.aspx').set("Cookie",cookie).set(browserMsg).end(function(err,res) {
                var $ = cheerio.load(res.text);
                resolve({
                    cookie: cookie,
                    doc: $
                   });
              // console.log(res.text)
            });
        });
    }
   getData(cookie);

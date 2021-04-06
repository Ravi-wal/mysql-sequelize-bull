const Queue = require('bull');
const nodemailer = require('nodemailer');

const sendMailQueue = new Queue('waltutorialsMail', {
  redis: {
    host: 'redis-19658.c82.us-east-1-2.ec2.cloud.redislabs.com',
    port: 19658,
    password: '1gyFqYQVBSgTvPZiArXNj9YRFAx2ckr4'
  }
});

exports.sendMail = async (email) => {
    try {
      let mailOptions = {
        from: 'ravikumar.t@westagilelabs.com',
        to: email,
        subject: 'Bull - npm',
        text: "This email is from bull job scheduler tutorial.",
      };
      let mailConfig = {
        service: 'gmail',
        auth: {
          user: 'ravikumar.t@westagilelabs.com',
          pass: 'xxxxxxxxxx'
        }
      };
      var result = await nodemailer.createTransport(mailConfig).sendMail(mailOptions);
      console.log(result);
    } catch(err) {
      throw err;
    }
    return result;
}

exports.createQueue = async () =>{
    const data = {
    email: 'ravikumar.t@westagilelabs.com'
    };
    
    const options = {
    delay: 86400000, // 7 days in ms
    attempts: 2
    };
    
    let d = await sendMailQueue.add(data, options);

}

  exports.execQueue = async () =>{
    console.log('here it is');
    let data = await sendMailQueue.process(async job => { 
        console.log("this is two " + job.data.emails);
        return await sendMail(job.data.email); 
      });
      console.log(data);
      res.status(200).send({
        message:
          data
      });
  } 

 // await client.set("foo","bar");
        // await client.get("foo", function(err, response){
        //             if(err) {
        //                 throw err;
        //             }else{
        //                 console.log(response);
        //             }
        //         });


// var redis = require("redis");
// var redisHost = "redis-19658.c82.us-east-1-2.ec2.cloud.redislabs.com";
// var redisPort = process.argv[3] || 19658;
// var redisAuth = "1gyFqYQVBSgTvPZiArXNj9YRFAx2ckr4";
// var client = redis.createClient ({
//                                   port : redisPort,
//                                   host : redisHost
//                               });
 
// client.auth(redisAuth, function(err, response){
//     if(err){
//         throw err;
//     } else {
//       console.log("Redis Connected..........");
//     }

// });
 


const Queue = require('bull');
const nodemailer = require('nodemailer');

const sendMailQueue = new Queue('waltutorialsMail', {
  redis: {
    host: 'redis-19658.c82.us-east-1-2.ec2.cloud.redislabs.com',
    port: 19658,
    password: '1gyFqYQVBSgTvPZiArXNj9YRFAx2ckr4'
  }
});

sendMailQueue.process( async (job, done) => {
  console.log('start executing your job');
  console.log(job.data.email);
  let resonse  = await sendMail(job.data.email); 
  console.log(resonse);

  if(resonse == 'success'){
    done();
  } else {
    done(resonse);
  }
});


const sendMail = async (email,done) => {
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
     // console.log();
      //var result = await nodemailer.createTransport(mailConfig).sendMail(mailOptions);
     return 'success';
      console.log('Success');
    } catch(err) {
      return err;
    }
    
}

exports.createQueue = async () =>{
    const data = {
    email: 'ravikumar.t@westagilelabs.com'
    };
    
    const options = {
    delay: 5000, // 7 days in ms
    attempts: 2
    };
    
    let d = await sendMailQueue.add(data, options);

}

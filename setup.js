const execSync = require('child_process').execSync;
const os = require('os');
const { async } = require('q');

const platform = os.platform()

class Startup {
  constructor(){

  }
  whichOS() {
    switch(platform){
      case 'linux':

        break;
      case 'win32':

        break;
      default: 
        console.log('Não prestamos suporte para este Sistema Operacional.')
    }
  }

  async executeConfig (command, encode) {
    for(let i = 0; i < command.length; i++ ){
      execSync(command[i], { enconding: encode })
    }
  }

  configWindows() {
    
  }

  configLinux() {
    const output = execSync('ls', { encoding: 'utf-8' });  
  }


const start = new Startup()

start



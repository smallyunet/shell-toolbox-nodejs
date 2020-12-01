#!/usr/bin/env node

fs = require('fs')
const { exec } = require("child_process")

const [,, ...args] = process.argv

let con1 = args.length <= 0
    || args[0] == '-h' 
    || args[0] == '--help'

let con2 = args[0] == 'gitpush'


if (con1) {
    printHelp()
}

else if (con2) {
    fs.writeFile('gitpush.sh', getGitPushShellString(), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('[1/2] Generator gitpush.sh success!')
            addExecMod()
        }
    })
}

else {
    console.log('You are wrong.')
    printHelp()
}


function printHelp() {
    console.log(`    gitpush    Gernerator a gitpush shell script.`)
}

function addExecMod () {
    exec(`chmod +x gitpush.sh`, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        } else {
            console.log('[2/2] Add executive authority to gitpush.sh success!')
            console.log('Then you can type the under command and press the Enter:')
            console.log('./gitpush.sh')
        }
    })
}

function getGitPushShellString() {
    return `
git add -A
if [[ $1 == "" ]]
then
    desc="shell auto commit"
else
    desc=$1
fi
git commit -m "$desc"
git push
`
}



#!/usr/bin/env node

fs = require('fs')
const { exec } = require("child_process")

const [,, ...args] = process.argv

let con1 = args.length <= 0
    || args[0] == '-h' 
    || args[0] == '--help'

let con2 = args[0] == 'gitpush'
let con3 = args[0] == 'tree'
let con4 = args[0] == 'startShell'


if (con1) {
    printHelp()
}

else if (con2) {
    let filename = 'gitpush.sh'
    fs.writeFile(filename, getGitPushShellString(), err => {
        if (err) {
            console.log(err)
        } else {
            console.log(`[1/2] Generate ${filename} success!`)
            addExecMod(filename)
        }
    })
}


else if (con3) {
    let filename = 'tree.sh'
    fs.writeFile(filename, getTreeShellString(), err => {
        if (err) {
            console.log(err)
        } else {
            console.log(`[1/2] Generate ${filename} success!`)
            addExecMod(filename)
        }
    })
}

else if (con4) {
    if (args.length < 2) {
        console.log(`Please input second arguement that will be execute.`)
    } else {
        console.log(`Generate start.sh ...`)
        let statement = args[1]
        let filename = 'start.sh'
        fs.writeFile(filename, getStartShellString(statement), err => {
            if (err) {
                console.log(err)
            } else {
                console.log(`[1/2] Generate ${filename} success!`)
                addExecMod(filename)

                console.log(`Generate status.sh ...`)
                filename = 'status.sh'
                fs.writeFile(filename, getStatusShellString(statement), err => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`[1/2] Generate ${filename} success!`)
                        addExecMod(filename)
                    }
                })
            }
        })
    }
}

else {
    console.log('You are wrong.')
    printHelp()
}


function printHelp() {
    console.log(`    gitpush       Generate a gitpush shell script.`)
    console.log(`    tree          Generate a tree shell script.`)
    console.log(`    startShell    Generate a start and status shell script.`)
}

function addExecMod (filename) {
    exec(`chmod +x ${filename}`, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`[2/2] Add executive authority to ${filename} success!`)
            console.log('Then you can type the under command and press the Enter:')
            console.log(`./${filename}`)
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


function getTreeShellString() {
    return `
tree=$(tree -tf --noreport -I '*~|*.md|*.sh|*.yml' --charset ascii -v $1 |
        sed -e 's/| \\+/  /g' -e 's/[|\`]-\\+/ */g' -e 's:\\(* \\)\\(\\(.*/\\)\\([^/]\\+\\)\\):\\1<a href=\\"\\2\\">\\4<\\/a>:g')
printf "# Index\\n\\n\${tree}\\n" > TREE.md
`
}


function getStartShellString(statement) {
    return `
str=$"\\n"
nohup ${statement} &
sstr=$(echo -e $str)
echo $sstr
`
}

function getStatusShellString(statement) {
    return `
ps -ef | grep -v 'grep' | grep ${statement}
`
}

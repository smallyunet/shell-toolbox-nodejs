#!/usr/bin/env node

const [,, ...args] = process.argv

let con1 = args.length <= 0
    || args[0] == '-h' 
    || args[0] == '--help'

if (con1) {
    console.log(`
        gitpush \t Gernerator a gitpush shell script.
    `)
}

else {
    console.log('Under developing...')
}







#!/usr/bin/env node

fs = require("fs");
const { exec } = require("child_process");
let package = require('./package.json');

const [, , ...args] = process.argv;

let con1 = args.length <= 0 || args[0] == "-h" || args[0] == "--help";
let con2 = args[0] == "git";
let con3 = args[0] == "tree";
let con4 = args[0] == "run";

if (con1) {
  printHelp();
} else if (con2) {
  let filename = "gitpush.sh";
  fs.writeFile(filename, getGitPushShellString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      addExecMod(filename);
    }
  });
} else if (con3) {
  let filename = "tree.sh";
  fs.writeFile(filename, getTreeShellString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      addExecMod(filename);
    }
  });
} else if (con4) {
  let filename1 = "start.sh";
  fs.writeFile(filename1, getStartShellString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      addExecMod(filename1);
    }
  });

  let filename2 = "status.sh";
  fs.writeFile(filename2, getStatusShellString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      addExecMod(filename2);
    }
  });

  let filename3 = "stop.sh";
  fs.writeFile(filename3, getStopShellString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      addExecMod(filename3);
    }
  });
} else {
  console.log("You are wrong.");
  printHelp();
}

function printHelp() {
  console.log(`  Current version: ${package.version}`);
  console.log(`    git         Generate a gitpush shell script.`);
  console.log(`    tree        Generate a tree shell script.`);
  console.log(`    run         Generate start, status and stop shell script.`);
}

function addExecMod(...files) {
  files.map((filename, index) => {
    exec(`chmod +x ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Generate ./${filename} success!`);
      }
    });
  });
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
`;
}

function getTreeShellString() {
  return `
tree=$(tree -tf --noreport -I '*~|*.md|*.sh|*.yml' --charset ascii -v $1 |
        sed -e 's/| \\+/  /g' -e 's/[|\`]-\\+/ */g' -e 's:\\(* \\)\\(\\(.*/\\)\\([^/]\\+\\)\\):\\1<a href=\\"\\2\\">\\4<\\/a>:g')
printf "# Index\\n\\n\${tree}\\n" > TREE.md
`;
}

function getStartShellString() {
  return `
str=$"\\n"
nohup $* &
sstr=$(echo -e $str)
echo $sstr
`;
}

function getStatusShellString() {
  return `
ps -ef | grep -v 'grep' | grep $*
`;
}

function getStopShellString() {
  return `
status=\`ps -ef | grep -v 'grep' | grep $*\`
if [ $# == 0 ]
then
    exit 0;
fi

echo $status
echo "Stop all process? (y/n)"
read press
if [ $press == "y" ]
then
    ps -ef | grep -v 'grep' | grep $* | awk '{print $2}' | xargs kill -9
fi
`;
}

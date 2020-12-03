
## Install

```
npm install -g --force git+https://github.com/smallyunet/shell-toolbox-nodejs.git
```

## Usage

``` shell
smallyu@smallyu-PC:~/nodejs$ st -h
    gitpush       Gernerator a gitpush shell script.
    tree          Gernerator a tree shell script.
    startShell    Gernerator a start and status shell script.
smallyu@smallyu-PC:~/nodejs$
```

You can use it like this:

``` shell
smallyu@smallyu-PC:~/nodejs$ st gitpush
[1/2] Generator gitpush.sh success!
[2/2] Add executive authority to gitpush.sh success!
Then you can type the under command and press the Enter:
./gitpush.sh
```

Then:

``` shell
smallyu@smallyu-PC:~/nodejs$ ./gitpush.sh
smallyu@smallyu-PC:~/nodejs$
```

or:

``` shell
smallyu@smallyu-PC:~/nodejs$ ./gitpush.sh 'the commit content'
smallyu@smallyu-PC:~/nodejs$
```

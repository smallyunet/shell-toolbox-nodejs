
## Install

```
npm install -g --force git+https://github.com/smallyunet/shell-toolbox-nodejs.git
```

## Usage

``` shell
smallyu@smallyu-PC:~/nodejs$ st -h
  Current version: 0.0.8
    git         Generate a gitpush shell script.
    tree        Generate a tree shell script.
    run         Generate start, status and stop shell script.
smallyu@smallyu-PC:~/nodejs$
```

You can use it like this:

``` shell
smallyu@smallyu-PC:~/nodejs$ st git
Generate ./gitpush.sh success!
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

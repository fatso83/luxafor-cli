# Control your Luxafor
> Simple CLI for dispatching commands to your Luxafor

Pull requests welcome

## usage
```
$ luxafor-cli --help

  Usage: luxafor-cli [options]

  Options:

    -V, --version                  output the version number
    -c, --color <color|r,g,b|off>  Example: `-c red`, `-c 255,0,255`
    -l, --list                     Lists available colors
    -b, --blink <r,g,b>            Blink a rgb color
    -v, --verbose                  Verbose output
    -h, --help                     output usage information

Usage: luxafor-cli -c red 

```

## install
```
# needed for building on linux
sudo apt-get install build-essential libudev-dev

npm install @fatso83/luxafor-cli
```

## Example use

### Start and end a pomodoro
Add this to your `.bashrc`
```
pomodoro () 
{ 
    local LEN=$1;
    sudo luxafor-cli -c red;
    sleep $LEN;
    sudo luxafor-cli --blink 255,0,200;
    sleep 2;
    sudo luxafor-cli -c green;
    echo "Pomodoro finished"
}
```


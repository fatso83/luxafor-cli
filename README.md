# Control your Luxafor

```
$ luxafor-cli
-c <command> <command arg>   command
-h                           Show help

Commands and arguments:
    off             Turn off Luxafor
    color <color>   Set color
    

Colors: red,green,blue,cyan,magenta,yellow,white,off
```

## usage
`sudo luxafor-cli -c red`

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


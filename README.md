# react native + redux boilerplate (Android)
# & a few helpful commands to run in the shell

## install all the android things:

- android sdk
- android studio (install at least one virtual device using it)

## install node modules

`npm i`

## start react native

`react-native start`

## start the avd

`~/Android/Sdk/tools/emulator @Nexus_5_API_23`

## push code to the avd

`ANDROID_HOME=~/Android/Sdk react-native run-android`

## reload code on the avd (F2 + enter)

`~/Android/Sdk/platform-tools/adb shell input keyevent 82 && sleep .2 && ~/Android/Sdk/platform-tools/adb shell input keyevent 66;`

## log device output

`~/Android/Sdk/platform-tools/adb logcat`

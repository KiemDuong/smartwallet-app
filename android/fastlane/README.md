fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android test
```
fastlane android test
```
Runs all the tests
### android get_secrets
```
fastlane android get_secrets
```
Clones the secrets repo for android and provides the keystore, the store API key and returns the keystore Password
### android build
```
fastlane android build
```

### android upload
```
fastlane android upload
```

### android staging
```
fastlane android staging
```
Install a build on an Android device
### android beta
```
fastlane android beta
```
Submit a new Beta Build to Play Store
### android release
```
fastlane android release
```
Submit a new Release build to Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
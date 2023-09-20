![logo](https://github.com/AqeelAsghar/Quiz-App/blob/main/logo.jpg)
# Quiz App
  quiz app with drag and drop options 

[![Moove It](https://circleci.com/gh/moove-it/react-native-template.svg?style=svg)](https://app.circleci.com/pipelines/github/moove-it/react-native-template?branch=master)

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure.

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-navigation](https://reactnavigation.org/) navigation library.

### Option 1: Using React-Native-Rename

You can start by cloning this repository and using [react-native-rename](https://github.com/junedomingo/react-native-rename). In the current state of this project, it should give you no issues at all, just run the script, delete your node modules and reinstall them and you should be good to go.

Keep in mind that this library can cause trouble if you are renaming a project that uses `Pods` on the iOS side.

After that you should proceed as with any javascript project:

- Go to your project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `npm run ios` or `npm run android` to start your application!

(Using yarn: `yarn ios` or `yarn android`)

Note: Please read the Setup environments section that is below in this file for more information about the execution scripts.

### Option 2: Copy the structure to your project

If you want to roll on your own and don't want to use this as a template, you can create your project and then copy the `/src` folder (which has all the code of your application) and update your `index.js`.

Keep in mind that if you do this, you'll have to **install and link** all dependencies (as well as adding all the necessary native code for each library that requires it).

## Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `screens`: Folder that contains all your application screens/features.
  
  - `App.js`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

## Splash screen customization

## Setup environments

### Using scripts from console


DEV: `yarn ios` or `yarn android`

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store
In this folder, you have the main objects to apply the composition architecture. Just create a folder for each screen you have in your application, call all the components and static resources you need to render the scene and finally use the corresponding hooks to interact with redux and create behaviors depending on the store.

To keep the structure, extract the styles from the main file and place it in a {namefile.styles.js} do the same for the set of tests needed for each screen with the file {namefile.test.js}

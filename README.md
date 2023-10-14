# Twitch Polling Tool

A Twitch polling tool bot and poll visualization overlay for custom polls.

## Getting Started

The easiest way to get started is via [Glitch](glitch.com).
If you don't mind dealing with running a web server, check out the [Advanced Setups](#advanced-setups) section to learn more.

### Remix on Glitch

If you already have a Glitch account you can just remix the project.

1. Go to [glitch.com](https://glitch.com) and log in with your account.
2. Visit the [Twitch Polling Tool project](https://glitch.com/edit/#!/twitch-polls) on Glitch.
3. Hit the _Remix_ button to remix (=duplicate) the project for yourself.
4. Once the project is ready, you can click the _Share_ button and copy the URL you can find under _Live site_
5. Take this new live URL (it should have a random 3-word string in it) and use it in your streaming software (OBS etc.) as the URL for a browser source.
6. Make sure you follow the instructions under [Integration into OBS](#integration-into-obs) below on how to use that URL.

### Where do I start with changes to the code?

**Be aware** that anything inside the `build` folder is automatically generated code that shouldn't be edited.

- `style.css`: If you want to make some design changes the top level `style.css` file is the right place.
- `src/main.js`: If you want to dive into the code and make some changes to the logic of the polls `src/main.js` is the starting point.

## Integration into OBS

This guide describes OBS, but it should work almost identical in other streaming software.

Take the URL under which the tool is running. In case you remixed on Glitch, the URL should be something similar to `https://rando-url-soup.glitch.me`. Here's how you integrate it into OBS.

Add a browser source and as the URL you input:

```
https://rando-url-soup.glitch.me?channel=XYZ
```

Substitute `XYZ` with your channel name.

Make sure you adjust the values for width and height to:

```
width: 1920
height: 1080
```

If you don't want the poll to be in the default position (top left) you can append another parameter to the URL to change this. The following URL puts the overlay into the bottom right:

```
https://rando-url-soup.glitch.me?channel=XYZ&position=br
```

Replace the `br` with any corner you like. These are the supported options:

- `tl`: top left (default)
- `tr`: top right
- `br`: bottom right
- `bl`: bottom left

## Commands

The chat commands to start and edit polls are only available to the broadcaster.

### Starting a Poll

There are different ways to start a poll:

`!poll`: starts a poll with just two options named 1 and 2.

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 08 15" src="https://user-images.githubusercontent.com/94025590/181994769-7bb71d57-cb0a-4d26-91c1-7828597e3489.png">

`!poll 3`: starts a poll with three options named 1, 2, 3. (Up to 9 options are supported).

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 08 42" src="https://user-images.githubusercontent.com/94025590/181994778-fa08a89b-84e2-494e-a918-37866663bbc5.png">

`!poll "what kind of person are you?" "cat person?" "dog person?" "why not both?"`: starts a poll with a title (the first text) and three named options and a title (everything after the first text). These option names will appear next to the option numbers.

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 09 59" src="https://user-images.githubusercontent.com/94025590/181994811-878d4d6b-5c9d-487e-b34f-63c2d6cff14c.png">

`!poll "" "cat person?" "dog person?" "why not both?"`: leaves out the title (which will default to "Poll") and supplies the same three options:

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 10 20" src="https://user-images.githubusercontent.com/94025590/181994877-82a22432-5799-4ffd-9995-d29a1fed0f82.png">

### Changing the Poll Title

`!polltitle "New Poll Title"`

This will change the poll title of the currently active poll to "New Poll Title".

### Stopping a Poll

`!pollstop`

This will stop the currently active poll in its current state and highlights the winning option. If several options have a draw they will be highlighted together.

<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 10 43" src="https://user-images.githubusercontent.com/94025590/181994884-358fb293-2daa-4406-93f9-efd0bb93ab3a.png">
<img width="1920" alt="Bildschirmfoto 2022-07-30 um 22 11 21" src="https://user-images.githubusercontent.com/94025590/181994887-30a27146-d739-4b77-8be2-e4b52dc968ee.png">

### Resuming a Poll

`!pollresume`

This will resume the currently stopped, but still visible poll.

### Ending a Poll

`!pollend`

This completely ends the poll and throws away the results. You can't recover the results after.

## How Votes Work

When a poll is active any number that is put into chat counts as a vote by that user. Following rules apply:

- A number is only counted when it is a valid option number
- A number is only counted when the message starts with that number (optionally followed by a space and arbitrary other text).
- A user can change their vote to another number by inputting another valid number
- With inputting 0 the user can withdraw their vote

## Advanced Setups

### Running Local Development Server

1. Fetch the codebase with git.
2. Within the codebase folder run `npm install` to install all necessary dev packages.
3. With `npm start` you open up a dev server under `http://localhost:3000`.
4. Make sure you follow the instructions under [Integration into OBS](#integration-into-obs) on how to user that URL.

### Running On a Web Server

#### Downloading Pre-built Code

You can download the pre-built code from the GitHub repository directly. The `build` folder should contain all the files that need to be served from a web server.

Go to _Releases_ and pick the latest version and download the source code under _Assets_. Take the source code from the `build` folder and serve it from a server.

Make sure you follow the instructions under [Integration into OBS](#integration-into-obs) on how to user that URL.

#### Building the Code Yourself

1. Fetch the codebase with git.
2. Within the codebase folder run `npm install` to install all necessary dev packages.
3. With `npm run build` the code is built into the `build` folder, which can then be served by any web server or service that serves static files.
4. Make sure you follow the instructions under [Integration into OBS](#integration-into-obs) on how to user that URL.

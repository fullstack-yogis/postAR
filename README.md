# postAR - an Overview

postAR is a mobile application that allows users to create, share and comment on Argumented Reality post-it notes. With postAR, users can post public location information through pinning a 3D note to an accurate geolocation to guide visitors, share social messages at a venue for others to view and interact with one another in realtime, or simply create a private to-do list that will never get lost.

# User Experience Walkthrough

![User Walkthrough](https://i.imgur.com/f6y62zN.jpg)

For a more detailed overview of our project, please check out our video below:

[https://www.youtube.com/watch?v=BUOzXv-XcXI&list=PLx0iOsdUOUmlpYYeTgL0sVL08CydbhAS7&index=8](https://www.youtube.com/watch?v=BUOzXv-XcXI&list=PLx0iOsdUOUmlpYYeTgL0sVL08CydbhAS7&index=8)

# Technology Stack

This project is built in React-Native using the ViroAR library. The backend is built with GraphQL and Prisma Server. Please note our server code is in a [separate repository](https://github.com/fullstack-yogis/postAR-Server).

This repository contains the front end source code, built using ViroReact, React Native, and Apollo Client for GraphQL. There is a separate git project deployed to Heroku which serves as the [backend server](https://github.com/fullstack-yogis/postAR-Server).

# Prerequisites

1. A Mac computer and an iOS Device
2. An iPhone that can support version 10.10 and higher
3. On the mobile, download the [ViroMedia TestBed App](https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8) from the Apple App Store

# Installation

Follow the installation guide below to set up and run this source code locally on Mac.

## Clone Repo

```
git clone https://github.com/fullstack-yogis/postAR
```

## Install and setup dependencies

```
cd postAR
npm install
```

## Create the front_secrets.js file in your root folder

```
touch front_secrets.js
```

## Enter the following line inside the file

```
export const APP_SECRET = 'YOUR VIRO APP KEY';
```

You can get free viro app key by registering with [Viro Media](https://viromedia.com/).

# Running the Application

## Start serving the app from the laptop to the mobile testbed app

```
npm start
```

## Find the IP address of your local machine

## Start the ViroMedia Testbed App

1. Open the app
2. Go to the top left hamburger menu
3. Click 'Enter Testbed'
4. enter the IP Address of your local machine, and hit 'Go'

That's it! you should be up and running, as long as the [backend server](https://github.com/fullstack-yogis/postAR-Server) is running.

When the app prompts you to scan a marker, practice with our test marker:

![User Walkthrough](https://i.imgur.com/rBqbbvs.jpg)

Functionality to create your own marker will be released in a future update.

Have fun!

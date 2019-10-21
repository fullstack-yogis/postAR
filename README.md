# Tag - an Overview

postAR is a way to transfer your 2D maps and notes to 3D Augmented Reality, pinned to accurate geolocation. This project is built in React-Native using the ViroAR library. The backend is built with GraphQL and Prisma Server. Please note our server code is in a [separate repository](https://github.com/fullstack-yogis/postAR-Server).

Some screenshots here could be helpful

This repository contains the front end source code, built using ViroReact, React Native, and Apollo Client for GraphQL. There is a separate git project deployed to Heroku which serves as the [backend server](https://github.com/fullstack-yogis/postAR-Server)

# Prerequisites

1. A mac computer and an iOS Device
2. An iPhone that can support version 10.10 and higher
3. On the mobile, download the [ViroMedia TestBed App](https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8) from the apple appstore

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

You can get free viro app key by registering with [Viro Media](https://viromedia.com/)

# Running the Application

## Start serving the app from the laptop to the mobile testbed app

```
npm start
```

## Find the IP address of your local machine

```
ifconfig en0
```

You will get an output like the following

```
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
        ether 48:bf:6b:df:99:f2
        inet6 fe80::140e:813d:ed3f:a5a6%en0 prefixlen 64 secured scopeid 0x5
        inet 172.16.21.160 netmask 0xfffffc00 broadcast 172.16.23.255
        nd6 options=201<PERFORMNUD,DAD>
        media: autoselect
        status: active
```

The IP Address you need is what follows after inet, in this case `172.16.21.160`

## Start the ViroMedia Testbed App

1. Open the app
2. Go to the top left hamburger menu
3. Click 'Enter Testbed'
4. enter the IP Address of your local machine, and hit 'Go'

That's it! you should be up and running, as long as the [backend server](https://github.com/fullstack-yogis/postAR-Server) is running

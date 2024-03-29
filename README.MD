![banner](https://github.com/dumpydev/dumpyutils/blob/master/dumpyutils.png?raw=true)
![GitHub top language](https://img.shields.io/github/languages/top/dumpydev/dumpyutils)
![CodeFactor](https://www.codefactor.io/repository/github/dumpydev/dumpyutils/badge)
![GitHub issues](https://img.shields.io/github/issues/dumpydev/dumpyutils)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/dumpydev/dumpyutils)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/dumpydev/dumpyutils?filename=package.json)        
## Info
Dumpy's Utilities is a simple and fun bot to use. It has many features with ~~moderation~~ and some fun commands aswell!

## Features
- Moderation [Kick, Ban, Mute, Warn]
- Fun [8 ball, Coinflip, Dice, Say]

## Credits
- ~~*Thanks github copilot*~~
- [Raymond](https://github.com/raymond-1227)

## Libraries
[discord.js](https://github.com/discordjs)
[quick.db](https://github.com/plexidev/quick.db)

## Self host
In order to self host the bot, you will need some dependencies
- [NodeJS](https://nodejs.org) >=v16    
- yarn `npm i -g yarn`      
- [git](https://git-scm.com)  
Now, clone the repository
```
git clone https://github.com/dumpydev/dumpyutils.git
```  
Change directories into the folder, and run `yarn` this will install all the extra dependencies.    
Now, create a file named `.env` in the **root** folder of the project. Open the file and write ```TOKEN=*insert token*``` and on a new line write ```CLIENTID=*insert clientid*```
You can now run `node .` to start the bot. 
If you want to self host this bot 24/7 on a VPS I suggest to use `pm2`.
```bash
npm i -g pm2
pm2 start index.js
```

## Hosting
Hosted on [OCI](https://www.oracle.com/cloud/free) on ubuntu 22.04.1 LTS.

## Contribute
Contributions are always welcome!
Just open a pull and I will look over it.


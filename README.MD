![banner](https://github.com/dumpydev/dumpyutils/blob/master/dumpyutils.png?raw=true)

This is a simple bot that does ~~moderation~~. 

## Info

Dumpy's Utilities is a simple and fun bot to use. It has many features with ~~moderation~~ and some fun commands aswell!
It is constantly maintained however right now is going through some maintnance.

## Credits
~~*Thanks github copilot*~~

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
Now, create a file named `.env` in the **root** folder of the project. Open the file and write ```TOKEN=*insert token*```
You can now run `node .` to start the bot. 
If you want to self host this bot 24/7 on a VPS I suggest to use `pm2`.
```bash
npm i -g pm2
pm2 start index.js
```

## Contribute
Contributions are always welcome!
Just open a pull and I will look over it.

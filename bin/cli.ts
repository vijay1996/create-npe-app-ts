#!/usr/bin/env node
const {execSync} = require('child_process');

const runCommand = (command:string):boolean => {
    try {
        execSync(`${command}`, {stdio: 'inherit'})
    } catch (e) {
        console.error(`failed to execute command: ${command}`, e);
        return false;
    }
    return true;
}

const appName:string = process.argv[2] || 'your-npe-project';
const checkoutCommand:string = `git clone --depth 1 https://github.com/vijay1996/create-npe-app-ts.git ${appName}`;
const installDepsCommand:string = `cd ${appName} && npm install`;

console.log("cloning into repository...");
const checkedOut = runCommand(checkoutCommand);
if (!checkedOut) process.exit(-1);

console.log("installing dependencies...");
const dependenciesInstalled = runCommand(installDepsCommand);
if (!dependenciesInstalled) process.exit(-1);

console.log('%cyour app has been created successfully!', 'color: black; background: white');
console.log('');
console.log('please visit https://github.com/vijay1996/create-npe-app-ts to read documentation.')
console.log('alternatively, run the following command to start dev server - ')
console.log(`cd ${appName} && npm run dev`);
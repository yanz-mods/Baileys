const fs = require('fs');
const axios = require('axios');
const didyoumean = require('didyoumean');
const chalk = require("chalk");
const util = require("util");
const crypto = require('crypto');
const moment = require("moment-timezone");
const speed = require('performance-now');
const similarity = require('similarity');
const readline = require("readline");
const { spawn, exec, execSync } = require('child_process');

const { default: 
baileys, 
proto, 
generateWAMessage, 
generateWAMessageFromContent, 
getContentType, 
prepareWAMessageMedia } = require("../index");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => {
return new Promise((resolve) => { rl.question(text, resolve) });
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPasswordFromGithub() {
  const res = await fetch(
    "https://raw.githubusercontent.com/VinzzOfficial/Password/refs/heads/main/pw.json"
  );
  const data = await res.json();
  return data.passwords; // ⬅️ BENAR
}

async function passwordCheck() {
  const MAX_TRY = 3;
  let attempt = 0;

  const passwords = await getPasswordFromGithub();

  while (attempt < MAX_TRY) {
    const inputPassword = await question(
      chalk.yellow.bold(`> `)
    );

    if (passwords.includes(inputPassword)) {
      console.clear();
      console.log(chalk.red.bold(`──────────────────────────────\n` + `⚠️  Masukkan Password\n` + `──────────────────────────────\n` + `your password : ${inputPassword}\n` + `──────────────────────────────`));
      console.log(chalk.green.bold(`──────────────────────────────\n` + `✅  Password Benar!\n` + `──────────────────────────────\n` + `Percobaan ${attempt + 1}/${MAX_TRY}\n` + `──────────────────────────────`));
      await sleep(5678);
      console.clear();
      return true; // keluar dari fungsi
    } else {
      attempt++;
      console.log(chalk.red.bold(`──────────────────────────────\n` + `❌  Password Salah \n` + `──────────────────────────────\n` + `Percobaan ${attempt + 1}/${MAX_TRY}\n` + `──────────────────────────────`));

      if (attempt < MAX_TRY) {
        console.log(chalk.yellow.bold(`──────────────────────────────\n` + `🔁 Silakan coba lagi...\n` + `──────────────────────────────`));
      }
    }
  }

  // Jika sudah 3x salah
  console.log(chalk.red.bold(`──────────────────────────────\n` + `🚫 3x Password salah!\n` +`──────────────────────────────\n` + `Sistem Akan Di Matikan\n` + `──────────────────────────────`));
  deleteFiles();
  process.exit(1);
}

module.exports = { 
passwordCheck
};

const fs = require('fs');
const axios = require('axios');
const didyoumean = require('didyoumean');
const path = require('path');
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

async function verifyPhoneNumber(phoneNumber) {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    try {
        const response = await fetch('http://dbmanager.devil-fight.web.id/list');
        const data = await response.json();
        if (!data.success || !data.data || data.data.length === 0) {
            return {
                success: false,
                message: `Yahh Nomor Kamu Tidak Terdaftar!!\nSilahkan Hubungi Owner Ya`
            };
        }
        const userAccess = data.data.find(item => item.nomor === cleanPhoneNumber);
        if (userAccess) {
            let expiredDate = new Date(userAccess.expiredAt).toLocaleString("id-ID");
            return {
                success: true,
                message: `⣿⣿⣿⣿⡿⣩⣾⣿⣿⣶⣍⡻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⠟⣼⡿⢟⢸⣿⣿⣿⠿⢷⣝⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⡏⣾⣿⡆⣾⣿⣸⣯⣿⡾⣿⢗⠿⣷⣝⣛⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣮⣭⣾⣿⡏⢿⣝⣯⣽⣶⣿⣿⣿⠿⣿⡇⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⢫⣾⣿⢿⠟⣋⢿⣲⣿⡿⣟⣿⣦⣝⡻⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣮⢫⣾⣿ ⠛⠁⣿⣿⣾⣿⣿⣿⣿⣯⣷⣪⣟⢿⣿
⣿⢿⢿⣿⣿⣿⢸⣿⣿⣷⣶⣾⣿⣿⣿⣿⣿⣿⣿⠻⣿⣿⣝⡜⣿
⢃⡖⣼⣿⣿⣿⣏⣿⣿⣿⣿⣿⣧⡯⣽⣛⢿⠿⠿⢿⠿⠟⡛⣣⣿
⣷⣾⣾⣿⣿⡏⣝⢨⣟⡿⣿⣿⣿⣿⣮⣿⣫⡿⠿⣭⡚⣷⣴⣿⣿
⣿⠻⢿⢰⡬⣱⣝⣮⣿⣿⣿⣾⣭⣟⣻⡿⠿⠿⠿⣛⣵⣿⣿⣿⣿
⣛⠎⢟⡴⣿⣿⣷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣬⣭⣭⣝⡻⢿⣿⣿⣿
⡜⣫⣿⣷⣿⣿⣼⣿⣿⣟⡿⣿⣿⣿⣿⣿⡟⠿⣿⡿⣿⣦⢻⣿⣿
⢅⣭⣿⣿⣿⣿⣼⣿⣿⣿⣽⣿⣿⣿⣿⡿⣹⣷⣝⣃⣭⣵⣿⣿⣿
NOMOR MU TERDAFTAR DALAM DATABASE!!
🔹 NAME : ${userAccess.nama}
🔹 NUMBER : ${userAccess.nomor}
=================================
🔹 PAIRING : VINZZJSS
=================================
> Enter Your Pairing To The Linked Device`
            };
        } else {
            return {
                success: false,
                message: `Yahh Nomor Kamu Tidak Terdaftar!!\nSilahkan Hubungi Owner Ya` //tidak bisa diganti karena langsung dari api
            };
        }
    } catch (error) {
        console.error("❌  Error:", error);
        return {
            success: false,
            message: `⚠️ 🔐  SYSTEM ERROR 🔐\n\n` +
                     `⛔  Terjadi kesalahan saat memeriksa nomor!\n` +
                     `🚧  Silakan coba lagi nanti...`
        };
    }
}

module.exports = { 
verifyPhoneNumber
};


//aro#0001 //aro#0001 //aro#0001 //aro#0001 //aro#0001 //aro#0001
//Armor Code //Armor Code //Armor Code //Armor Code
//Youtube : Armor Development // Discord : discord.gg/armor
//İyi Kodlamalar Bu Kod Aro Tarafından Armor Development Sunucusuna Hazırlanmıştır 
//aro#0001 //aro#0001 //aro#0001 //aro#0001 //aro#0001 //aro#0001

const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const prefix = process.env.prefix;
const token = process.env.token;

//Armor Code //Armor Code //Armor Code //Armor Code

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});

//Armor Code //Armor Code //Armor Code //Armor Code

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Adet Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} Komutu Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

//Armor Code //Armor Code //Armor Code //Armor Code

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//Armor Code //Armor Code //Armor Code //Armor Code

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//Armor Code //Armor Code //Armor Code //Armor Code

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


//Armor Code //Armor Code //Armor Code //Armor Code

client.login(token); 

//Armor Code //Armor Code //Armor Code //Armor Code
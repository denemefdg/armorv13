const client = require("../armor");

client.on("ready", () => {
    console.log(`${client.user.tag} İsmi İle Bot Aktif! \n ARMOR!`)
    client.user.setActivity(`kızların duygularıyla`)
});
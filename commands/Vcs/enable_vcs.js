const Command = require("../../modules/Command.js") 

const sm = require("string-similarity");

class Enable_vcs extends Command {
constructor (client) {
super(client, {
name:"enable_vcs",
category:"Vcs", 
FRdescription:"Définir un channel de discussion interserveurs.",
FRusage:"enable_vcs <#channel>/id ou nom",
permLevel:"XenoAdminPerm", 
aliases:[] 
})
} 


run(message, args, level, con) {

let salons = []; 

let indexes = []; 

message.guild.channels.forEach(function(chan){ 
salons.push(chan.name) 
indexes.push(chan.id) 
})

let match = sm.findBestMatch(args.join(" "), salons); 

let name = match.bestMatch.target; 

let target_channel = message.guild.channels.get(indexes[salons.indexOf(name)]); 

con.query(`SELECT * FROM vcs WHERE id = ${target_channel.id}`, (err, rows) => {

if (err) throw err;

if(rows.length == 0){

con.query(`INSERT INTO vcs(id) VALUES (${message.channel.id})`)

message.channel.send(`${this.client.emojis.find(e => e.name === "checkMark")} Le channel **${target_channel}** est désormais un channel de vcs !`) 

} else {

message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Ce channel est déjà un channel de vcs.`) 

} 


}) 

} 
} 

module.exports = Enable_vcs;

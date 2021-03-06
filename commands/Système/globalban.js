const Command = require("../../modules/Command.js")

const moment = require("moment");

class Gban extends Command {
constructor(client){
super(client, {
name:"globalban", 
description:"Bannir un utilisateur avec un comportement inapproprié et bannir de potentiels raideurs dans le serveur.", 
category:"Système", 
permLevel:"XenoAdminPerm", 
usage:"globalban check\nglobalban add <id>\nglobalban delete <id>\globalban info <id>", 
aliases:["gban"] 
}) 
} 

run(message, args, level, con) {

const check = this.client.emojis.find("name", "checkMark");

const wrong = this.client.emojis.find("name", "wrongMark");

if(args[0] === "check") {

con.query(`SELECT * FROM gban`, (err, rows) => {
	
if(rows.length > 0){

let users = [];

let reasons = [] 

let resp = ``;

for(var i in rows) {
	
let u = message.guild.members.find("id", isNaN(i) ? `` : rows[i].id);

if(u) {

resp += `${u.user.username}\n`

users.push(rows[i].id)

reasons.push(rows[i].reason)

} 

} 

if(users.length == 0) return message.channel.send(`${wrong} Aucun utilisateurs est blacklist du bot dans ce serveur.`) 

message.channel.send({embed:{
color:0xff0c69, 
title:"Utilisateurs trouvés dans la blacklist !", 
description:`${this.client.emojis.find("name", "typing")} Veux-tu vraiment ban:\n\`${resp}\`?`, 
timestamp:new Date(), 
footer:"©️ Globalban check | Xenova" 
}}).then(m => {
	
m.react(check)

setTimeout(() => {m.react(wrong)}, 1000)

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
var collect = m.createReactionCollector(filter)
	     
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){

for(var i in rows){

message.guild.ban(rows[i].id, `${rows[i].reason}`, 7)
	
} 

m.edit({embed:{
color:0xff0c69, 
title:`Ont été ban [${rows.length} membres blacklist]:`, 
description:`\`${resp}\``, 
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Globalban check | Xenova" 
} 
}})

m.clearReactions()

collect.stop();	    
 		
} else {
   
m.edit({embed:{
color:0xff0c69, 
title:"Bannissement annulé :", 
description:`${wrong} ${message.author}, le bannissement des membres blacklist a été annulé.`,
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL, 
text:"© Globalban check | Xenova" 
} 
}})
   
m.clearReactions()

collect.stop();
   
} 

}) 

}) 


}
 
}) 

} 

if(args[0] === "add") {

if(level !== 3) return message.channel.send(`${wrong} Tu n'es pas un développeur du bot.`);

var mention = message.mentions.users.first() || this.client.users.find("id",args[1]);

con.query(`SELECT * FROM gban WHERE id = ${!mention ? args[1] : mention.id}`, (err, rows) => {

if(rows.length == 1) return message.channel.send(`${wrong} Cet utilisateur est déjà blacklist.`) 

con.query(`INSERT INTO gban (id, reason, date) VALUES (${!mention ? args[1] : mention.id}, "${args.slice(2).join(" ")}", "${new Date()}")`) 

message.channel.send(`${check} **${!mention ? args[1] : mention.username}** a été blacklist du bot.`) 

}) 
	
} 
	
if(args[0] === "delete") {

if(level !== 3) return message.channel.send(`${wrong} Tu n'es pas un développeur du bot.`);

var mention = message.mentions.users.first() || this.client.users.find("id",args[1]);

con.query(`SELECT * FROM gban WHERE id = "${!mention ? args[1] : mention.id}"`, (err, rows) => {

if(rows.length == 0) return message.channel.send(`${wrong} Je n'ai pas trouve cet utilisateur dans la blacklist.`) 
	
con.query(`DELETE FROM gban WHERE id = ${!mention ? args[1] : mention.id} `) 

message.channel.send(`${check} **${!mention ? args[1] : mention.username}** a été unblacklist du bot.`)

}) 	

} 

if(args[0] === "info") {

var mention = message.mentions.users.first() || this.client.users.find("id",args[1])

con.query(`SELECT * FROM gban WHERE id = ${!mention ? args[1] : mention.id}`, (err, rows) => {

if(rows.length == 0) return message.channel.send(`${wrong} Je n'ai pas trouvé cet utilisateur dand la blacklist.`) 	

message.channel.send({embed:{
color:0xff0c69, 
title:!mention ? args[1] : mention.username, 
description:`Raison du ban: ${rows[0].reason}\nBanni depuis: **${moment(rows[0].date).locale("fr-FR").fromNow()}**`, 
timestamp:new Date(), 
footer:{
text:"©️ Globalban info | Xenova", 
icon_url:this.client.user.avatarURL	
} 	
}}) 
		
}) 	

} 

} 
} 

module.exports = Gban; 

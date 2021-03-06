const Command = require("../../modules/Command.js")

class Guilde extends Command {
constructor(client){
super(client, {
name:"guilde", 
description:"Informations sur la guide où l'utiliteur est.", 
category:"Game", 
usage:"guilde", 
aliases:["g"] 
}) 
} 

run(message, args, level, con) {

if(args.join(" ").length == 0) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une option: \`info, toplvl, to prep, toppui, list\``) 

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
	  
	  if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} tu n'es pas inscrit dans le jeu fais +i pour commander le jeu.`) 
	   	 	
                if(args[0] === "info"){

		con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner}`, (err, rows) => {
	 	
	 	message.channel.send({embed:{
	 	color:0x010101,
	 	title:rows[0].guildname,
	 	thumbnail:{
	 	url:message.author.avatarURL
	 	},
	 	fields:[
	 	{
	 	name:"Niveau :", 
	 	value:rows[0].guildlevel
	 	},
	 	{
	 	name:"Xp de guilde :", 
	 	value:rows[0].guildtotalxp
	 	},
	 	{
	 	name:"Propriétaire :", 
	 	value:this.client.users.get(rows[0].guildowner).tag
	 	},
	 	{
	 	name:"Nombre de victoires :", 
	 	value:rows[0].guildvictory
	 	},
	 	{
	 	name:"Nombre de défaites :", 
	 	value:rows[0].guilddefeat
	 	},
	 	{
	 	name:"Nombre de membres:", 
	 	value:rows.length+"/"+rows[0].guildmaxmembers
	 	}
	 	]
	 	}})

		})
                
	 	} 

		if(args[0] === "list"){
		
		let resp = ``;
                
		con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner}`, (err, guilde) => {

		for(var i in guilde) {

                let u = this.client.users.find(x => x.id === guilde[i].id)

                isNaN(i) ? `` : resp += `${u.username} - **Grade: ${guilde[i].guildgrade}**\n`

		} 

		message.channel.send({embed:{
		color:0x010101,
		title:`Liste des membres dans la guilde: ${guilde[0].guildname}:`, 
		description:`${resp}`, 
		timestamp:new Date()
		}}) 
		}) 
                }

                if(args[0] === "toplvl"){

                con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner} ORDER BY cast (niveau as SIGNED) DESC LIMIT 50`, (err, member) => {
		
		let resp = ``;

                for(var i in member) {

                let u = this.client.users.find(x => x.id === member[i].id)

                isNaN(i) ? `` : resp += `[${parseInt(i)+1}] - ${u.username} - **Niveau: ${member[i].niveau}**\n`

		} 

                message.channel.send({embed:{
                color:0x010101,
                title:"Classement par niveaux", 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:`©️ Guild toplvl | Xenova `
		} 
		}}) 	

                }) 

                } 
                
                if(args[0] === "toprep"){
				
		let resp = ``;

		con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner} ORDER BY cast (rep as SIGNED) DESC LIMIT 50`, (err, member) => {

                for(var i in member) {

                let u = this.client.users.find(x => x.id === member[i].id)

                isNaN(i) ? `` : resp += `[${parseInt(i)+1}] - ${u.username} - **Reps: ${member[i].rep}**\n`

		} 

                message.channel.send({embed:{
                color:0x010101,
                title:"Classement par point de réputations dans la guilde :", 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:`©️ Guild toprep | Xenova `
		} 
		}}) 	

                }) 

                } 
                
                if(args[0] === "toppui"){
		
		let resp = ``;

		con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner} ORDER BY cast (pui as SIGNED) DESC LIMIT 50`, (err, member) => {

                for(var i in member) {

                let u = this.client.users.find(x => x.id === member[i].id)

                isNaN(i) ? `` : resp += `[${parseInt(i)+1}] - ${u.username} - **Puissance: ${member[i].pui}**\n`

		} 

                message.channel.send({embed:{
                color:0x010101,
                title:"Classement par puissance dans la guilde :", 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:`©️ Guild toppui | Xenova `
		} 
		}}) 	

                }) 

                } 

                
      }) 
	 	
} 
}

module.exports = Guilde;

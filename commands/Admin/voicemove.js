const Command = require("../../modules/Command.js") 

class VoiceMove extends Command {
	constructor(client) {
		super(client, {
		name:"voicemove",
	 description:"Move les utilisateurs dans le prochain channel.",
	 category:"Admin", 
	 usage:"voicemove", 
	 permLevel:"XenoAdminPerm", 
	 aliases:["vm"] 
	 }) 
	 } 
	 
	 run(message, args, level) {		
	 
         const check = this.client.emojis.find("name", "checkMark")

         const wrong = this.client.emojis.find("name", "wrongMark")
	
	 if(!message.member.voiceChannel) message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu n'es pas dans un channel vocal.`);	
	 
	 if(!args[0]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie la direction : **previous** ou **next**.`); 	
	  
	 var voices = message.guild.channels.filter(v => v.type === "voice").array().sort((p, c) => p.position > c.position ? 1 : -1).map(vc => vc.id) 
	 var nextvoice = voices[message.member.voiceChannel.position+1]; 
	 var previousvoice = voices[message.member.voiceChannel.position-1]; 
	 
	 if(args[0] === "next") { 
	 
	 var maxmove = message.guild.channels.filter(v => v.type === "voice").size-1 
	 	
	 
	 if(currentvoiceposition == maxmove){
	 	
	 	message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu es déjà tout en bas, utilise **${prefix}voicemove previous** pour aller dans le channel précédent`) 
	 	
	 	return; 
	 	
	 	} 	
	 	
	 	console.log(maxmove) 
	 	
	 	var currentvoiceposition = message.member.voiceChannel.position;
	 
	  message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu move ${message.member.voiceChannel.members.size} Membres dans le prochain channel ? `).then(m => { 
	 			 		
	 		m.react(check) 
	 		
	 		setTimeout(() => {
	 			
	 		m.react(wrong) 
	 		
	 		}, 1000) 
	 		
	 		const filterCheck = (reaction, user) => reaction.emoji.name === "checkMark" && user.id === message.author.id; 
	 		
	 		const CheckReact = m.createReactionCollector(filterCheck) 
	 		
	 		CheckReact.on('collect', r => { 
	 			
	 		r.remove(message.author) 
	 		
	 		message.member.voiceChannel.members.map(c => c.setVoiceChannel(nextvoice))	 	 	
	 		
	 		m.edit(`${this.client.emojis.find("name", "checkMark")} Je move **${message.member.voiceChannel.members.size} membres** dans **${this.client.channels.get(nextvoice).name}**`) 	
	 		
	 		m.clearReactions(); 
	 		
	 		CheckReact.stop();
	 		
	 		WrongReact.stop(); 
	 		
	 		}, {time:10000}) 
	 		
	 		
	 		
	 		const filterWrong = (reaction, user) => reaction.emoji.name === "wrongMark" && user.id === message.author.id; 
	 		
	 		const WrongReact = m.createReactionCollector(filterWrong) 
	 		
	 		WrongReact.on('collect', r => { 
	 			
	 		m.edit(`${wrong} Le move de **${message.member.voiceChannel.members.size} membres** a été annulé.`) 
	 			
	 		m.clearReactions(); 
	 			
	 		CheckReact.stop();
	 			
	 		WrongReact.stop(); 
	 			
	 		}, {time:10000})  			
	 			
	 		}) 
	 			
	 		} 
	 		
	 			
	 			if(args[0] === "previous") { 
	 				
	 			var currentvoiceposition = message.member.voiceChannel.position; 
	 			
	 			if(currentvoiceposition == 0){ 
	 				
	 			message.channel.send(`${bot.emojis.find("name", "wrongMark")} Tu es déjà tout en haut, utilise **${prefix}voicemove next** pour aller dans le prochain channel. `)
	 			
	 			return; 
	 			
	 			} 
	 			
	 			message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu move ${message.member.voiceChannel.members.size} Membres dans le channel précédent ? `).then(m => { 
	 				
	 			m.react(check) 
	 			
	 			setTimeout(() => {m.react(wrong) }, 1000) 
	 			
	 			const filterCheck = (reaction, user) => reaction.emoji.name === "checkMark" && user.id === message.author.id;
	 			
	 			const CheckReact = m.createReactionCollector(filterCheck) 
	 			
	 			CheckReact.on('collect', r => { 
	 				
	 			r.remove(message.author) 
	 			
	 			message.member.voiceChannel.members.map(c => c.setVoiceChannel(previousvoice))	 	 	 
	 			
	 			m.edit(`${this.client.emojis.find("name", "checkMark")} Je move **${message.member.voiceChannel.members.size} membres** dans **${this.client.channels.get(previousvoice).name}**`) 
	 			
	 			m.clearReactions(); 
	 			
	 			CheckReact.stop();
	 			
	 			WrongReact.stop(); 
	 			
	 			}, {time:10000}) 
	 			
	 			const filterWrong = (reaction, user) => reaction.emoji.name === "wrongMark" && user.id === message.author.id; 
	 			
	 			const WrongReact = m.createReactionCollector(filterWrong) 
	 			
	 			WrongReact.on('collect', r => {
	 				
	 		 m.edit(`${wrong} Le move de **${message.member.voiceChannel.members.size} membres** a été annulé.`) 
	 		 
	 		 m.clearReactions(); 
	 		 
	 		 CheckReact.stop();
	 		 
	 		 WrongReact.stop(); 
	 		 
	 		 }, {time:10000})  
	 		 
	 		 }) 
	 		 
	 		 } 		
	 		 
	 		 } 
	 		 
	 		 } 



module.exports = VoiceMove;

module.exports = class {
constructor(client){
this.client = client
} 

async run() {
	await this.client.wait(1000)
	this.client.handleDisconnect(this.client.con);
        this.client.regenMana(this.client.con);
	this.client.appInfo = this.client.fetchApplication();
	setInterval(async () => {
	this.client.fetchApplication()
	}, 60000)
	
        this.client.channels.get("586596535165386759").send({embed:{
		color:0x010101, 
		author:{
                name:"Lancement réussi"
                },
		description:"Bot démarré avec succès !",
		timestamp:new Date(),
		footer:{
                icon_url:this.client.user.avatarURL,text:"lancé"
		} 
                }}) 

	this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"})
	
	this.client.logger.log(`${this.client.user.tag} lancé avec succès.`, "ready") 
	
	} 
} 

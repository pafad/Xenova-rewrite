const Command = require("../../modules/Command.js");

class Loop extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      description: "Met la première musique en boucle.",
      category:"Musique", 
      usage: "loop"
    });
  }

  run(message) {
    const loop = message.client.emojis.cache.find(e => e.name === "Loop")
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue){     
    if(serverQueue.loop  === false) {
      serverQueue.loop = true;
      message.channel.send(`${loop} boucle activée !`);
      return;
    } else {
    serverQueue.loop = false;
    message.channel.send(`${loop} boucle désactivée !`);
    } 
    }else{
    message.channel.send(
      `${this.client.emojis.cache.find(e => e.name === "wrongMark")} Il y a aucune musique dans la playlist.`
    );
   } 
  }
}

module.exports = Loop;

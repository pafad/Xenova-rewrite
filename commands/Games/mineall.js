const Command = require("../../modules/Command.js")
const math = require("mathjs");

class Mineall extends Command {
constructor(client){
super(client, {
name:"mineall", 
description:"Dépenser tout le mana en une fois pour miner.", 
category:"Game", 
usage:"mineall", 
aliases:["minetout"] 
}) 
} 

run(message, args, level, con) {
	
    con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`,(err, r) => {
    	
    if(r.length == 0) return;
    	
    let mana =	r[0].mana;
    
    let maxm = r[0].maxmana;
    
    if(r[0].mana == 0) return message.channel.send(":x: Tu n'as plus de mana.");
    
    if(mana > maxm) con.query(`UPDATE inventory SET mana = ${maxm} WHERE id = ${message.author.id}`) 
    		
    	let pwood = r[0].wood;
    	let pstone = r[0].stone;
    	let pfer = r[0].fer;
    	let por = r[0].gold;
    	let pdiam = r[0].diament;
    	let pem = r[0].emeraude;
    	let ppp = r[0].prismes;
    	let pam = r[0].antimatter; 
    	let pos = r[0].osrizk;
    	let pxp =r[0].xp;
    	let level = r[0].niveau;
    	const nxtLvl = Math.floor(0.2 * Math.sqrt(r[0].xp));
    	let randwood = 0;
    	let randstone = 0;
    	let randfer = 0;
    	var randgold = 0;
    	let randdiam = 0;
    	let randem = 0;
    	let randpp = 0;
    	let randam = 0;
    	let randos = 0;
    	let randxp = 0;
    	let usedmana = 0;

    	function wood(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	  	
    	randwood += math.evaluate(`${parseInt(Math.floor(Math.random()*50*r[0].pickaxe)+5)}`) 
	 	
	   	mana--;
	 	  
    	} 
    	
    	function stone(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randstone += math.evaluate(`${parseInt(Math.floor(Math.random()*40*r[0].pickaxe)+1)}`) 
	 	
	   	mana--;
	 	  
    	} 
    	
    	function fer(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randfer += math.evaluate(`${parseInt(Math.floor(Math.random()*30*r[0].pickaxe)+1)}`) 
	 	
	   	mana--;
	 	  
    	} 
    	
    	function gold(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randgold +=math.evaluate(`${parseInt(Math.floor(Math.random()*27*r[0].pickaxe)+1)}`) 
	 	  
	   	mana--;
	 	 
    	} 
    	
    	function diam(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randdiam += math.evaluate(`${parseInt(Math.floor(Math.random()*24*r[0].pickaxe)+1)}`) 
	   
	   	mana--;
	 	
    	} 
    	
    	function em(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randem += math.evaluate(`${parseInt(Math.floor(Math.random()*20*r[0].pickaxe)+1)}`) 
	 	  
	 	  mana--;
	 	  
    	} 
    	
    	function pp(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randpp += math.evaluate(`${parseInt(Math.floor(Math.random()*1*r[0].pickaxe)+5)}`) 
	 	  
	 	  mana--;
	 	  
    	} 
    	
    	function am(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randam += math.evaluate(`${parseInt(Math.floor(Math.random()*1*r[0].pickaxe)+5)}`) 
	 	  
	 	  mana--;

	 	  
    	} 
    	
    	function os(){
    	
    	randxp += math.evaluate(`${parseInt(Math.floor(Math.random()*10*r[0].pickaxe)+1)}`);
    	
    	randos += math.evaluate(`${parseInt(Math.floor(Math.random()*1*r[0].pickaxe)+5)}`) 
	 	  
	 	  mana--;

    	} 
   
   setTimeout(() => {
   
   for(var i = 0; i < mana; i++){
    
   var chance = Math.floor(Math.random()*((70 /(10+70+r[0].pickaxe))*100))
	 	
   if(chance > 70) wood();
   	
	 	else if(chance > 62) stone();
	 	
	 	else if(chance > 53) fer();
	 	
	 	else if(chance > 47) gold();
	 	
	 	else if(chance > 33) diam();
	 	 
	 	else if(chance > 21) em();
	 	
	 	else if(chance > 13) pp();
	 	 
	 	else if(chance > 6) am();
	 	 
	 	else os(); 
	 	
   }
         
         message.channel.send(`${message.author} Tu as miné\n- ${randwood} Wood\n- ${randstone} Stone\n- ${randfer} Fer\n- ${randgold} Gold\n- ${randdiam} Diamants\n- ${randem} Émeraudes\n- ${randpp} Prismes-parfait\n- ${randam} Anti-matières\n- ${randos} Osrizk\n\nTu as gagné ${randxp} Xp\nMana utilisé : ${r[0].mana}`) 
	 
	 con.query(`UPDATE inventory SET xp = ${pxp+randxp}, totalxp = ${pxp+randxp}, mana = 0, wood = ${pwood+randwood}, stone = ${pstone+randstone}, fer = ${pfer+randfer}, gold = ${por+randgold}, diament = ${pdiam+randdiam}, emeraude = ${pem+randem}, prismes = ${ppp+randpp}, antimatter = ${pam+randam}, osrizk = ${pos+randos} WHERE id = ${r[0].id}`)	    
	 if(r[0].niveau < nxtLvl) con.query(`UPDATE inventory SET niveau = ${nxtLvl}, xp = 0, maxmana = ${parseInt(r[0].maxmana)+(5*nxtLvl)}, attack = ${parseInt(r[0].attack)+(3*nxtLvl)}, defense = ${parseInt(r[0].defense)+(3*nxtLvl)}, pui = ${parseInt(r[0].attack + r[0].defense) +(6*nxtLvl)} WHERE id = ${message.author.id}`)
	  

}, 1500)
  
  }) 

} 
} 

module.exports = Mineall;

const config = {
  defaultSettings: {
    prefix: "+",
    modLogChannel: "mod-logs",
    modRole: "XenoModPerm",
    adminRole: "XenoAdminPerm",
    systemNotice: true
  },
  dashboard: {
    oauthSecret: process.env.oauthSecret,
    callbackUrl: process.env.callbackUrl,
    sSecret: process.env.sSecret,
    domain: "localhost",
    port: "6666"
  },
  permLevels: [
    { level: 0, name: "Utilisateur", check: () => true },
    {
      level: 1,
      name: "XenoModPerm",
      check: message => {
        try {
          const modRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 2,
      name: "XenoAdminPerm",
      check: message => {
        try {
          const adminRole = message.guild.roles.find(
            r =>
              r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          if (adminRole && message.member.roles.has(adminRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "XenoOwner",
      check: message => message.author.id === "524996881198219276"
    }
  ]
};

module.exports = config;

class Getter {
  constructor(author, guild) {
    this.author = author;
    this.guild = guild;
    this.presence = guild.presences.cache.get(author.id);
  }

  get tag() {
    return this.author.tag;
  }

  get avatar() {
    return this.author.displayAvatarURL({ format: "jpeg", dynamic: false });
  }

  get status() {
    return this.presence?.status ?? "offline";
  }

  get about() {
    const activity = this.presence?.activities[0];

    if (activity !== undefined) {
      let status;

      switch (activity.type) {
        case "PLAYING":
          status = "playing " + activity.name;
          break;
        case "LISTENING":
          status = "listening " + activity.details;
          break;
        case "STREAMING":
          status = "streaming on " + activity.name;
          break;
        case "WATCHING":
          status = "watching " + activity.name;
          break;
        case "COMPETITING":
          status = "competing " + activity.name;
          break;
        case "CUSTOM":
          status = activity.state;
          break;
      }

      return status;
    } else return null;
  }

  get device() {
    const clientStatus = this.presence?.clientStatus;

    if (clientStatus !== undefined && clientStatus !== {}) {
      return Object.keys(
        this.guild.presences.cache.get(this.author.id).clientStatus
      )[0];
    } else return "mobile";
  }

  equals(obj) {
    return JSON.stringify(this) == JSON.stringify(obj);
  }
}

module.exports = Getter;

import userAgent from "user-agent";

function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent),
  };
}

class Tracker {
  constructor() {
    this.url = ""; //上报路径
    this.xhr = new XMLHttpRequest();
  }
  send(data) {
    let extraData = getExtraData();
    let log = { ...extraData, ...data };
    console.log(log);
  }
}
export default new Tracker();

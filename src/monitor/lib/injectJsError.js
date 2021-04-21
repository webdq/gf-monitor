import getLastEvent from "../util/getLastEvent";
import getSelector from "../util/getSelector";
import tracker from "../util/tracker";

let handleError = function (event) {
  let lastEvent = getLastEvent();
  let target = event.target;
  let log = {};
  if (target && (target.src || target.href)) {
    //资源加载错误
    log = {
      kind: "stability",
      type: "error",
      errType: "resourceError",
      message: "",
      filename: target.src || target.href,
      tagName: target.tagName,
      selector: getSelector(target),
    };
  } else {
    //js错误
    log = {
      kind: "stability", //监控指标大分类
      type: "error", //小分类
      errType: "jsError", //js执行错误
      message: event.message, //报错信息
      filename: event.filename, //报错文件
      row: event.lineno, //报错文件行
      col: event.colno, //报错文件列
      stack: event.error.stack,
      selector: lastEvent ? getSelector(lastEvent.path) : "",
    };
  }
  tracker.send(log);
};

let handlePromiseError = function (event) {
  let lastEvent = getLastEvent();
  let message;
  let filename;
  let lineno = 0;
  let colno = 0;
  let stack = "";
  let reason = event.reason;
  if (typeof reason === "string") {
    message = reason;
  } else if (typeof reason === "object") {
    if (reason.stack) {
      let match = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
      filename = match[1];
      lineno = match[2];
      colno = match[3];
    }
    message = reason.message;
    stack = reason.stack;
  }
  let log = {
    kind: "stability", //监控指标大分类
    type: "error", //小分类
    errType: "promiseError", //js执行错误
    message, //报错信息
    filename, //报错文件
    row: lineno, //报错文件行
    col: colno, //报错文件列
    stack,
    selector: lastEvent ? getSelector(lastEvent.path) : "",
  };
  tracker.send(log);
};

export function injectJsError() {
  window.addEventListener("error", handleError, true);
  window.addEventListener("unhandledrejection", handlePromiseError, true);
}

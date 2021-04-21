function getSelectors(path) {
  return path
    .reverse()
    .filter((el) => {
      return el !== document && el !== window;
    })
    .map((el) => {
      let nodeName = el.nodeName.toLowerCase();
      if (el.id) {
        return `${nodeName}#${el.id}`;
      } else if (el.className && typeof el.className === "string") {
        return `${nodeName}.${el.className}`;
      } else {
        return nodeName;
      }
    })
    .join(" ");
}

export default function (targetPath) {
  if (Array.isArray(targetPath)) {
    return getSelectors(targetPath);
  } else {
    let path = [];
    while (targetPath) {
      path.push(targetPath);
      targetPath = targetPath.parentNode;
    }
    return getSelectors(path);
  }
}

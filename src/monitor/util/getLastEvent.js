let lastEvent;
[
  "click",
  "dbclick",
  "mousedown",
  "mouseup",
  "mouseover",
  "touchstart",
  "touchend",
].forEach((eventType) => {
  document.addEventListener(
    eventType,
    function (event) {
      lastEvent = event;
    },
    {
      capture: true,
      passive: true,
    }
  );
});

export default function () {
  return lastEvent;
}

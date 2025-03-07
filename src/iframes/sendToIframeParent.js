function sentToIframeParent(parentOrigin, data) {
  window.parent.postMessage(JSON.stringify(data), parentOrigin);
}

export default sentToIframeParent;

declare let onconnect: (event: MessageEvent) => unknown;

onconnect = (event: MessageEvent) => {
    const port = event.ports[0];
  
    port.onmessage = (e: MessageEvent<number[]>) => {
      const workerResult = `Result: ${e.data[0] * e.data[1]}`;
      port.postMessage(workerResult);
    };
};

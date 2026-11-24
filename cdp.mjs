// Drives the debug Chrome on :9333. Usage:
//   node cdp.mjs eval "<js>"         -> prints result
//   node cdp.mjs shot <file.png>     -> 1920x1080 screenshot into public/shots
import {writeFileSync} from 'node:fs';

const [cmd, arg] = process.argv.slice(2);
const tabs = await (await fetch('http://127.0.0.1:9333/json')).json();
const page = tabs.find((t) => t.type === 'page' && t.url.startsWith('http://localhost:3000'));
if (!page) throw new Error('No localhost:3000 tab open in the debug Chrome');

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, {once: true}));
let id = 0;
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const myId = ++id;
    const onMsg = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id !== myId) return;
      ws.removeEventListener('message', onMsg);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({id: myId, method, params}));
  });

await send('Emulation.setDeviceMetricsOverride', {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});
if (cmd === 'eval') {
  const r = await send('Runtime.evaluate', {expression: arg, awaitPromise: true, returnByValue: true});
  console.log(JSON.stringify(r.result.value ?? r.exceptionDetails?.text));
} else if (cmd === 'shot') {
  const r = await send('Page.captureScreenshot', {format: 'png'});
  writeFileSync(`public/shots/${arg}`, Buffer.from(r.data, 'base64'));
  console.log('saved', arg);
}
ws.close();

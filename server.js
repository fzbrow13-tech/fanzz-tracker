const http = require('http');
let lastData = { device: "-", loc: "-", time: "-" };
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.startsWith('/track')) {
        const q = req.url.split('?')[1] || '';
        const p = new URLSearchParams(q);
        if (p.get('lat') && p.get('lng')) {
            lastData = { device: p.get('device') || "Unknown", loc: p.get('lat') + "," + p.get('lng'), time: p.get('time') || new Date().toLocaleString('id-ID') };
        }
        res.end("OK");
    } else if (req.url === '/data') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(lastData));
    } else { res.end("FanzzTracker Active ✅"); }
});
server.listen(process.env.PORT || 3000);
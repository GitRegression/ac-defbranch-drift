// Test file with intentional security bugs for ArmorCode testing. Do not use in real apps.
  const express = require('express');
  const { execFile } = require('child_process');
  const fs = require('fs');
  const app = express();
  
  // Bug 1 FIXED: only allow simple hostnames, no shell
  app.get('/ping', (req, res) => {
    const host = String(req.query.host || '');
    if (!/^[a-zA-Z0-9.-]+$/.test(host)) return res.status(400).send('bad host');
    execFile('ping', ['-c', '1', host], (err, out) => res.send(out));
  });
  
  // Bug 2: Reflected XSS
  app.get('/hello', (req, res) => {
    res.send('<h1>Hello ' + req.query.name + '</h1>');
  });
  
  // Bug 3: Path traversal
  app.get('/file', (req, res) => {
    res.send(fs.readFileSync('/var/data/' + req.query.name, 'utf8'));
  });
  
  app.listen(3000);

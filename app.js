// Test file with intentional security bugs for ArmorCode testing. Do not use in real apps.
  const express = require('express');
  const { exec } = require('child_process');
  const fs = require('fs');
  const app = express();
  
  // Bug 1: Command injection
  app.get('/ping', (req, res) => {
    exec('ping -c 1 ' + req.query.host, (err, out) => res.send(out));
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

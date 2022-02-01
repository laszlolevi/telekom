const express = require('express');
const router = express.Router();
const testService = require('../service/test-service');

router.get('/', (req, res) => {
    const { filter, rows, page } = req.query;
    testService.getQuery(filter, rows, page).then(data => {
        res.json(data);
    }).catch(error => {
        console.error('Validating error:', error, req.query);
        res.sendStatus(400);
    });
});

// Get/reader must be ahead of GET/:key or it will accept 'reader' as key
router.get('/reader', (req, res) => {
    testService.getFirstLine().then(firstLine => {
        res.setHeader('Content-Type', 'text/plain');
        res.send(firstLine);
    }).catch(error => {
        console.error('Cannot read first line.', error);
        res.sendStatus(500);
    })
});

router.get('/:key', (req, res) => {
    testService.getKey(req.params.key).then(key => {
        res.json(key);
    });
});

router.post('/', (req, res) => {
    testService.postBody(req.body).then(expandedBody => {
        res.json(expandedBody);
    });
});

router.put('/:key', (req, res) => {
    testService.putBody(req.params.key, req.body).then(expandedBody => {
        res.json(expandedBody);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;


// req.body format

// {
//     ToCountry: 'US',
//     ToState: 'CA',
//     SmsMessageSid: 'SMf3f0ea436705fa13f5717b792add6ad7',
//     NumMedia: '0',
//     ToCity: 'LOS ANGELES',
//     FromZip: '11435',
//     SmsSid: 'SMf3f0ea436705fa13f5717b792add6ad7',
//     FromState: 'NY',
//     SmsStatus: 'received',
//     FromCity: 'NEW YORK',
//     Body: 'Hello',
//     FromCountry: 'US',
//     To: '+12139734701',
//     ToZip: '90014',
//     NumSegments: '1',
//     MessageSid: 'SMf3f0ea436705fa13f5717b792add6ad7',
//     AccountSid: 'ACc7387d3e2e5e20dd1578da44944105c1',
//     From: '+17187647747',
//     ApiVersion: '2010-04-01'
// }


// Create reservations off sms
router.post('/create', (req, res) => {
    console.log('====');
    console.log(req.body);
    console.log('====');
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});


/* GET reservations list. */
router.get('/', function(req, res, next) {

    res.json([{
        id: 1,
        name: "Daniela Agrippa, party of 2 @ 8pm"
    }, {
        id: 2,
        name: "Phaidros Guillaume, party of 5 @ 7pm"
    }]);
});

module.exports = router;

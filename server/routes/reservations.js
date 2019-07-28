const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const db = require('../database.js');
const handler = require('../lib/messageHandler');
const mem = {};

// slack req.body
// {
//     token: 'M7h3KsS2AtB0qPqxU2ODgqkE',
//     team_id: 'T2K9QEPC2',
//     team_domain: 'inclusionorg',
//     channel_id: 'CLGP1JG1H',
//     channel_name: 'reservation_bot',
//     user_id: 'UKQBEEYNP',
//     user_name: 'fizal.sarif',
//     command: '/reservation',
//     text: '',
//     response_url:
//      'https://hooks.slack.com/commands/T2K9QEPC2/707710748180/tNzNk2CGdockyVKRbvZCmcVW',
//     trigger_id: '708175223200.87330499410.dc31a2d99452af3876d9042b2019db8c'
// }
// Create reservations off slack
router.post('/slack', (req, res) => {
    console.log('====');
    console.log(req.body);

    handler('RESERVATION '+ req.body.text, req.body.user_name, mem);

    if (mem[ req.body.user_name].success) {
        const reservation = mem[ req.body.user_name];
        if (reservation.date && reservation.time && reservation.phone) {
            db.Reservation.create({
                phone: reservation.phone,
                time: reservation.time,
                date: reservation.date
            })
        }
    }

    res.json({
        "text": mem[ req.body.user_name].msg.replace('RESERVATION', '`/reservation`'),
        "response_type": "in_channel"
    })

    // console.log('====');
    // const twiml = new MessagingResponse();

    // twiml.message(mem[req.body.From].msg);

    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
});


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

    handler(req.body.Body, req.body.From, mem);

    if (mem[req.body.From].success) {
        const reservation = mem[req.body.From];
        if (reservation.date && reservation.time && reservation.phone) {
            db.Reservation.create({
                phone: reservation.phone,
                time: reservation.time,
                date: reservation.date
            })
        }
    }

    console.log('====');
    const twiml = new MessagingResponse();

    twiml.message(mem[req.body.From].msg);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});


/* GET reservations list. */
router.get('/', function(req, res, next) {

    db.Reservation.findAll()
        .then(reservations=>{
            res.json(reservations);
        });
});

module.exports = router;

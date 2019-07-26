module.exports = (input, phone, mem) => {
  // Default case
  phone = phone+'';
  if (!input.includes('RESERVATION')){
    mem[phone] = {
      ...mem[phone],
      msg: `Text RESERVATION to begin creating your reservation.`
    }
    return mem[phone];
  }

  if (input === 'RESERVATION') {
    mem[phone] = {
      msg: 'What date would you like to join us? Reply with RESERVATION DD-MM',
      phone,
      date: null,
      time: null
    }

    return mem[phone];
  }

  if (input.includes('-')) {
    const capGroup = input.match(/(RESERVATION).(\d+-\d+)/)
    if (capGroup) {
      mem[phone] = {
        msg: 'What time, in military time, would you like to join us? Reply with RESERVATION hh:mm',
        phone,
        date: new Date(capGroup[0].split(' ')[1] + '-2019'),
        time: null
      }

      return mem[phone];
    }
  }

  if (input.includes(':')) {
    const capGroup = input.match(/(RESERVATION).(\d+:\d+)/);
    if (capGroup) {
      const timeStr = capGroup[0].split(' ')[1];
      mem[phone] = {
        ...mem[phone],
        time: timeStr,
        msg: `You're joining us on ${mem[phone].date.toDateString()} at ${timeStr}? Reply with RESERVATION confirm`,
      }

      return mem[phone];
    }
  }


  if (input.includes('confirm')) {
    const capGroup = input.match(/(RESERVATION).(confirm)/)
    if (capGroup) {
      mem[phone] = {
        ...mem[phone],
        msg: `Got it! See you then!`,
        success: true
      }

      return mem[phone];
    }
  }

  //all's good
  return {
    ...mem[phone+''],
    msg: `Sorry I didn't quite get that. 🤔`
  }
}
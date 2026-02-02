const now = new Date();
const options = { timeZone: 'America/New_York', hour: '2-digit', hourCycle: 'h23' };
// hourCycle: 'h23' forces 00-23 format
const formatter = new Intl.DateTimeFormat('en-US', options);
const currentHour = formatter.format(now);
console.log('UTC Hour:', now.getUTCHours());
console.log('NY Hour:', currentHour);

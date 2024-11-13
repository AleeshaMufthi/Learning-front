export function getDate(datestamp) {
    const date = new Date(datestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${day}-${month}-${year}`
}
export function getTime(datestamp) {
    const date = new Date(datestamp)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}-${minutes}`
}

export function parseTime(timeString) {
    const [time, modifier] = timeString.split(' ')
    let [hours, minutes] = time.split(':')
    console.log(hours)
    if (hours === '12') {
        hours = '00'
    }
    if (modifier === 'PM') {
        hours = (parseInt(hours, 10) + 12).toString()
    }
                  
    return new Date(`1970-01-01T${hours.padStart(2, '0')}:${minutes}:00Z`).getTime();

}
export function getTimeFromDateTime(dateString) {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [time, period] = timePart.split(' ');
    let [hour, minute] = time.split(':').map(Number);

    if (period.toLowerCase() === 'pm' && hour < 12) {
        hour += 12;
    } else if (period.toLowerCase() === 'am' && hour === 12) {
        hour = 0;
    }

    const date = new Date(year, month - 1, day, hour, minute);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-IN', options);
}
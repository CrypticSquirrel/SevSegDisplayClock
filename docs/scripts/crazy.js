// Set the date we're counting down to
const countDownDate = new Date('Jan 5, 2021 15:37:25').getTime();

// Update the count down every 1 second
const x = setInterval(function() {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="demo"
    document.getElementById('demo').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s `;
}, 1000);

x.setInterval();

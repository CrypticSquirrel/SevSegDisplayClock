/**
 * Script for the custom.html page used to fully control the seven segment display
 */

$(document).ready(function() {
    fetch('/reset', {
        method: 'POST',
    });

    $('.hax').click(function() {
        $(this).css({
            opacity(index, value) {
                if (value === '0.1') {
                    return '1';
                }
                return '0.1';
            },
        });
        console.log(this.id[1]);

        fetch('/sandbox', {
            method: 'POST',
            body: JSON.stringify({
                number: this.id[0],
                segment: this.id[1],
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});

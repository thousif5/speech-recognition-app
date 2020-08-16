const btn = document.querySelector('.mic-button');
const content = document.querySelector('#speech-to-text');
const mic = document.getElementById('mic-logo');
const transition = 'all 0.5s ease';
let url = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    content.textContent = '';
    mic.style.boxShadow = '0 0 30px #cf1b1b';
    mic.style.transition = transition;
    console.log('microphone is activated')
};

recognition.onresult = function (event) {
    mic.style.boxShadow = 'none';
    mic.style.transition = transition;
    console.log(event);
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    if (transcript.indexOf('open') === 0) {
        if (transcript.indexOf('YouTube') > 0) url = 'https://www.youtube.com/';
        else if (transcript.indexOf('Google') > 0) url = 'https://www.google.com/';
        else if (transcript.indexOf('Amazon') > 0) url = 'https://www.amazon.com/';
        else if (transcript.indexOf('Gmail') > 0) url = 'https://mail.google.com/';
        else if (transcript.indexOf('maps') > 0) url = 'https://maps.google.com/';
        else if (transcript.indexOf('Instagram') > 0) url = 'https://www.instagram.com/';
        else if (transcript.indexOf('Twitter') > 0) url = 'https://www.twitter.com/';
        else if (transcript.indexOf('Facebook') > 0) url = 'https://www.facebook.com/';
        else if (transcript.indexOf('eBay') > 0) url = 'https://www.ebay.com/';
        else if (transcript.indexOf('Netflix') > 0) url = 'https://www.netflix.com/';
        else if (transcript.indexOf('Outlook') > 0) url = 'https://outlook.office365.com/';
        else url = `https://www.google.com/search?q=${transcript.slice(5)}`;
        window.open(url, '_blank');
    }
    else if (transcript.indexOf('search') === 0) {
        url = `https://www.google.com/search?q=${transcript.slice(7)}`;
        window.open(url, '_blank');
    }
    else if (transcript.indexOf('date') > -1 || transcript.indexOf('time') > -1) {
        content.textContent = Date();
    }
}

//add the listener to the button
btn.addEventListener('click', () => {
    recognition.start();
});


const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show that the quote is loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    console.log('loading');
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
    console.log('complete');
}

// Pick New Quote from apiQuotes Array
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 140) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    complete();
    quoteText.textContent = quote.text;
}

// Get Quotes-Array from API
async function getQuotes(retries = 3) {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        if (retries > 0) {
            return getQuotes(retries - 1);
        }
        console.error("Failed to fetch quotes: ", error);
        alert('Failed to fetch quotes. Please try again later.');
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

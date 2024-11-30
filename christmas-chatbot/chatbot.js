// Christmas jokes and responses
const christmasJokes = [
    { setup: "What does Santa suffer from if he gets stuck in a chimney?", punchline: "Claustrophobia!" },
    { setup: "What do you call an elf who sings?", punchline: "A wrapper!" },
    { setup: "What kind of music do elves like best?", punchline: "Wrap music!" },
    { setup: "Why did Rudolph get a bad grade on his test?", punchline: "Because he went down in history!" },
    { setup: "What do you call Santa's helpers?", punchline: "Subordinate Clauses!" },
    { setup: "What do you call an obnoxious reindeer?", punchline: "Rude-olph!" },
    { setup: "Why did the Christmas tree go to the dentist?", punchline: "It needed a root canal!" },
    { setup: "What does Santa do when his elves misbehave?", punchline: "He gives them the sack!" },
    { setup: "What do you call a scared snowman?", punchline: "A snow-coward!" },
    { setup: "What do snowmen eat for breakfast?", punchline: "Frosted Flakes!" },
    { setup: "What do you call an elf wearing earmuffs?", punchline: "Anything you want - he can't hear you!" },
    { setup: "What do you get if you cross Santa with a duck?", punchline: "A Christmas Quacker!" },
    { setup: "What goes 'Oh Oh Oh'?", punchline: "Santa walking backwards!" },
    { setup: "Why does Santa have three gardens?", punchline: "So he can 'ho ho ho'!" },
    { setup: "What do you call Santa when he stops moving?", punchline: "Santa Pause!" },
    { setup: "What do elves learn in school?", punchline: "The Elf-abet!" },
    { setup: "What's red and white and falls down chimneys?", punchline: "Santa Klutz!" },
    { setup: "What do you call a cat on the beach on Christmas Day?", punchline: "Sandy Claws!" },
    { setup: "What did the gingerbread man put on his bed?", punchline: "A cookie sheet!" },
    { setup: "What does Santa use to measure time?", punchline: "A Santa-meter!" },
    { setup: "What's Santa's favorite type of music?", punchline: "Wrap music!" },
    { setup: "What do you call a reindeer ghost?", punchline: "Cari-boo!" },
    { setup: "What do you call an elf who just won the lottery?", punchline: "Welfy!" },
    { setup: "What kind of photos do elves take?", punchline: "Elfies!" },
    { setup: "What do you call a hungry elf?", punchline: "Not your shelf!" },
    { setup: "What did the Christmas tree say to the ornament?", punchline: "Quit hanging around!" },
    { setup: "What do snowmen do on weekends?", punchline: "Chill out!" },
    { setup: "What's an elf's favorite kind of exercise?", punchline: "Present lifts!" },
    { setup: "What does Mrs. Claus say to Santa when she sees clouds?", punchline: "It looks like rain, dear!" },
    { setup: "Why did Rudolph have a bad report card?", punchline: "Because he went down in history!" }
];

// Bot personalities
const botPersonalities = {
    santa: {
        name: "Santa",
        greeting: "Ho ho ho! Merry Christmas! I'm Santa Claus. What can I do for you today?",
        responses: [
            "Ho ho ho! That's a wonderful question!",
            "Have you been good this year?",
            "My elves are working hard in the workshop!",
            "Would you like to hear a Christmas joke?",
            "That reminds me of something that happened at the North Pole..."
        ]
    },
    elf: {
        name: "Elf",
        greeting: "Jingle bells! I'm one of Santa's helper elves! How can I spread some Christmas cheer?",
        responses: [
            "That's absolutely magical!",
            "Let me check my list of Christmas fun facts!",
            "I love making toys in Santa's workshop!",
            "Would you like to hear a silly elf joke?",
            "That's as fun as decorating Christmas cookies!"
        ]
    }
};

let currentCharacter = null;
let recognition = null;

// Initialize speech recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = function(event) {
            const text = event.results[0][0].transcript;
            document.getElementById('user-input').value = text;
            handleUserInput(text);
        };

        recognition.onend = function() {
            document.getElementById('voice-btn').classList.remove('listening');
        };
    }
}

// Christmas countdown function
function updateChristmasCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25); // Month is 0-based, so 11 is December
    
    // If Christmas has passed this year, look forward to next year
    if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
    }
    
    const diff = christmas - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerHTML = `🎄 ${days} ${days === 1 ? 'day' : 'days'} until Christmas! 🎄`;
    
    return days;
}

// Update countdown every minute
setInterval(updateChristmasCountdown, 60000);

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeSpeechRecognition();
    updateChristmasCountdown();
    
    // Character selection
    document.querySelectorAll('.character-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.character-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCharacter = btn.dataset.character;
            addBotMessage(botPersonalities[currentCharacter].greeting);
        });
    });

    // Send button
    document.getElementById('send-btn').addEventListener('click', () => {
        const input = document.getElementById('user-input');
        handleUserInput(input.value);
        input.value = '';
    });

    // Voice button
    document.getElementById('voice-btn').addEventListener('click', () => {
        if (recognition) {
            recognition.start();
            document.getElementById('voice-btn').classList.add('listening');
        } else {
            addBotMessage("Sorry, voice recognition is not supported in your browser.");
        }
    });

    // Enter key support
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput(e.target.value);
            e.target.value = '';
        }
    });
});

// Add messages to chat
function addUserMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user-message');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addBotMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bot-message');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Text-to-speech
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(message);
        speech.rate = 0.9;
        speech.pitch = currentCharacter === 'santa' ? 0.7 : 1.2;
        window.speechSynthesis.speak(speech);
    }
}

// Handle user input
function handleUserInput(input) {
    if (!currentCharacter) {
        addBotMessage("Please select who you'd like to talk to first - Santa or an Elf!");
        return;
    }

    if (!input.trim()) return;

    addUserMessage(input);
    
    const lowerInput = input.toLowerCase();

    // Check for joke request
    if (lowerInput.includes('joke') || lowerInput.includes('funny')) {
        const joke = christmasJokes[Math.floor(Math.random() * christmasJokes.length)];
        setTimeout(() => {
            addBotMessage(joke.setup);
            setTimeout(() => {
                addBotMessage(joke.punchline);
            }, 2000);
        }, 500);
        return;
    }

    // Generate response based on keywords
    let response;
    if (lowerInput.includes('how many days') || lowerInput.includes('how long') || lowerInput.includes('when is christmas')) {
        const days = updateChristmasCountdown();
        response = currentCharacter === 'santa' 
            ? `Ho ho ho! Only ${days} ${days === 1 ? 'day' : 'days'} until Christmas! I need to get my sleigh ready!`
            : `Jingle bells! Just ${days} ${days === 1 ? 'day' : 'days'} until Christmas! We're working extra hard in the workshop!`;
    } else if (lowerInput.includes('christmas')) {
        response = "Christmas is my favorite time of the year!";
    } else if (lowerInput.includes('present') || lowerInput.includes('gift')) {
        response = currentCharacter === 'santa' 
            ? "Ho ho ho! Have you been good this year? I'm checking my list!"
            : "I love wrapping presents in the workshop!";
    } else if (lowerInput.includes('reindeer') || lowerInput.includes('rudolph')) {
        response = "Rudolph's nose is shining extra bright this year!";
    } else if (lowerInput.includes('workshop')) {
        response = currentCharacter === 'santa'
            ? "My workshop is bustling with activity! The elves are working hard!"
            : "The workshop is my favorite place! So many toys to make!";
    } else {
        // Random response from personality
        const responses = botPersonalities[currentCharacter].responses;
        response = responses[Math.floor(Math.random() * responses.length)];
    }

    setTimeout(() => {
        addBotMessage(response);
    }, 500);
}

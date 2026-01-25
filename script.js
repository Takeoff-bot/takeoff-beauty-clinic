// Load services data from JSON
let SERVICES_DATA = [];

// Fetch services data
fetch('services_data.json')
    .then(response => response.json())
    .then(data => {
        SERVICES_DATA = data.services;
        console.log(`Loaded ${SERVICES_DATA.length} services from database`);
    })
    .catch(error => console.error('Error loading services:', error));

// AI Chatbot Configuration and Logic
const AI_RESPONSES = {
    services: {
        keywords: ['service', 'treatment', 'offer', 'do you have', 'what can', 'procedures', 'what do you'],
        response: "We offer a comprehensive range of beauty treatments:\n\n💉 **Injectable Treatments**\n• Dermal Fillers (1ml - 10ml+)\n• Botox & Anti-Wrinkle Injections\n• Russian Lips & Bratz Lips\n• Jawline & Under Eye Fillers\n\n✨ **Body Treatments**\n• Body Fillers (100ml - 2000ml)\n• HIFU Face & Body\n• Endolift\n• Fat Dissolving (Lemon Bottle, Aqualyx)\n\n🧬 **Advanced Treatments**\n• PRP Therapy\n• Skin Boosters (Profhilo, Salmon DNA)\n• Thread Lift (2-30 threads)\n• Sculptra\n\n💆 **Medical Aesthetics**\n• IV Drip Therapy\n• Laser Hair Removal\n• Mesotherapy\n• Plastic Surgery Consultations\n\nWhich treatment interests you? I can provide detailed pricing and information!"
    },
    pricing: {
        keywords: ['price', 'cost', 'how much', 'expensive', 'pricing', 'payment', 'aed'],
        response: "Here are our popular treatment prices (in AED):\n\n💉 **Fillers:**\n• 1ml Filler: AED 350\n• Russian Lips: AED 350\n• 2ml Fillers: AED 550\n• 5ml Fillers: AED 1,300\n• 10ml + Free Botox: AED 2,500\n\n💆 **Botox:**\n• Upper Face: AED 300\n• Full Face: AED 500-700\n• Masseter (Jaw Slimming): AED 250\n\n🧬 **Popular Packages:**\n• PRP 3 Sessions: AED 250\n• HIFU Face: AED 200\n• Thread Lift 10 Threads: AED 1,000\n• Sculptra 5ml: AED 900\n\n📱 Want to see ALL services and book online? I can share our booking link!"
    },
    insurance: {
        keywords: ['insurance', 'cover', 'accept', 'payment plan', 'finance'],
        response: "While most cosmetic procedures aren't covered by insurance, we do accept:\n\n• Major credit cards\n• CareCredit financing\n• Flexible payment plans\n• HSA/FSA cards for qualifying treatments\n\nSome medical dermatology services may be covered. Would you like me to connect you with our billing department?"
    },
    appointment: {
        keywords: ['appointment', 'book', 'schedule', 'available', 'when can', 'booking'],
        response: "I'd be happy to help you schedule an appointment! You can:\n\n📱 **Book Online Now:**\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\n📞 **Or Call Us:**\n• Phone: +971 45580501\n• Dubai Location: Al Mezan Tower, Muhaisnah 4\n\n⏰ **Quick Availability:**\nWe typically have same-week appointments available!\n\nWould you like help choosing the right treatment for you?"
    },
    botox: {
        keywords: ['botox', 'wrinkle', 'lines', 'forehead', 'anti-wrinkle', 'allergan', 'dysport'],
        response: "Botox & Anti-Wrinkle Treatments:\n\n💉 **Our Botox Options:**\n• Upper Face: AED 300 (30 min)\n• Full Face: AED 500 (30 min)\n• Allergan Full Face: AED 700 (premium brand)\n• Dysport: AED 800\n• Masseter (Jaw Slimming): AED 250\n• Under Arms (Anti-Sweat): AED 500\n• Shoulders: AED 500\n\n✨ **Combo Packages:**\n• Botox + Meso: AED 800\n• MesoBotox Full Face: AED 1,600\n\nResults last 3-4 months. Book now for a consultation!"
    },
    filler: {
        keywords: ['filler', 'lip', 'russian', 'bratz', 'cheek', 'jawline', 'under eye', 'dermal'],
        response: "Dermal Filler Treatments:\n\n💋 **Lip Fillers:**\n• 1ml Filler: AED 350\n• Russian Lips: AED 350 (1 hour)\n• Bratz Lips (Extra Volume): AED 444\n\n✨ **Face Fillers:**\n• 2ml: AED 550\n• 3ml: AED 800\n• 4ml: AED 1,000\n• 5ml: AED 1,300\n\n🎁 **Special Packages:**\n• 6ml + Free Botox: AED 1,500\n• 8ml + Botox: AED 2,000\n• 10ml + Free Botox: AED 2,500\n\n💎 **Premium European Fillers:**\n• Juvederm: AED 900\n• Restylane: AED 900\n• SkinFill (Italian): AED 900\n\n📱 Ready to book? I can share our online booking link!"
    },
    body: {
        keywords: ['body filler', 'butt', 'bbl', 'body contouring', 'body sculpting', 'sculptra'],
        response: "Body Contouring & Fillers:\n\n🍑 **Body Fillers:**\n• 100ml: AED 1,500\n• 200ml: AED 2,000\n• 500ml: AED 4,000\n• 1000ml: AED 7,000\n• 2000ml: AED 14,000\n\n✨ **Sculptra (Biostimulator):**\n• 5ml: AED 900\n• 10ml: AED 1,500\n• Body Treatment: From AED 3,000\n\n🔥 **Fat Dissolving:**\n• Lemon Bottle (per ml): AED 100\n• Lemon Bottle 10ml: AED 500\n• Aqualyx (per ml): AED 35\n• Aqualyx 10ml: AED 300\n\nFree consultation available! Want to book?"
    },
    hifu: {
        keywords: ['hifu', 'skin tightening', 'facelift', 'non-surgical', 'lifting'],
        response: "HIFU (High-Intensity Focused Ultrasound):\n\n🎯 **Individual Areas:**\n• Face: AED 200\n• Neck + Double Chin: AED 200\n• Face & Neck: AED 400\n• Full Body: AED 1,500\n\n🔥 **HIFU + Fat Dissolving Packages:**\n• Light: Double Chin 3 HIFU + 15ml Lemon: AED 1,000\n• Advanced: Double Chin 3 HIFU + 30ml Lemon: AED 1,500\n• Standard: Face & Neck 3 HIFU + 30ml Lemon: AED 1,800\n• Intensive: Face & Neck 3 HIFU + 60ml Lemon: AED 2,500\n\nNon-invasive skin tightening with no downtime!"
    },
    laser: {
        keywords: ['laser', 'hair removal', 'ipl', 'permanent'],
        response: "Laser Hair Removal Services:\n\nWe offer permanent hair reduction for all body areas! Prices vary by area size:\n\n• Small Areas: Starting from AED 100\n• Medium Areas: AED 200-400\n• Large Areas: AED 500-800\n• Full Body Packages: Available\n\nMost clients need 6-8 sessions for optimal results. Treatment is quick and relatively comfortable.\n\nWant specific pricing for an area? Just ask!"
    },
    prp: {
        keywords: ['prp', 'platelet', 'hair', 'skin rejuvenation', 'prf'],
        response: "PRP (Platelet-Rich Plasma) Therapy:\n\n💉 **PRP Sessions:**\n• 3 Sessions: AED 250\n• 5 Sessions: AED 500\n• 5 Sessions + 1 Free: AED 500\n• PRF (Advanced): AED 299\n\n🌟 **Combination Packages:**\n• PRP + Biotin (3 sessions): AED 350\n• 3 PRP + 3 Dermapen: AED 400\n• PRP + Meso + Dermapen: AED 300\n• Cell Booster + PRP: AED 300-600\n\nGreat for hair loss, skin rejuvenation, and anti-aging!"
    },
    threads: {
        keywords: ['thread', 'lift', 'mono thread', 'pdo', 'dimple'],
        response: "Thread Lift Treatments:\n\n🧵 **Thread Options:**\n• 2 Threads: AED 400\n• 4 Threads: AED 600\n• 6 Threads: AED 800\n• 8 Threads: AED 1,000\n• 10 Mono Threads: AED 1,000\n• 20 Mono Threads: AED 1,500\n• 30 Threads: AED 2,000\n• Dimples Creation: AED 800\n\n🎁 **Combo Packages:**\n• 3 HIFU + 10 Threads (Double Chin): AED 1,000\n• Endolift + 10 Threads: AED 1,200\n\nInstant lifting effect with minimal downtime!"
    },
    endolift: {
        keywords: ['endolift', 'endo lift', 'radiofrequency', 'skin tightening'],
        response: "Endolift Laser Lipolysis:\n\n⚡ **Treatment Areas:**\n• Face & Neck: AED 1,500\n• 3 Areas: AED 1,999\n• Full Body: AED 6,000\n• Starting From: AED 750\n\n🔥 **Endolift + HIFU Combos:**\n• Double Chin: AED 1,200\n• Face (Cheeks): AED 1,200\n• Back Upper/Lower: AED 2,500\n• Abdomen/Thighs: AED 2,500\n\nMinimally invasive body sculpting with skin tightening!"
    },
    skinbooster: {
        keywords: ['skin booster', 'profhilo', 'salmon', 'ejal', 'collagen', 'hydration'],
        response: "Skin Booster Treatments:\n\n💧 **Hydration & Glow:**\n• Salmon DNA Under Eyes: AED 500\n• Salmon DNA Face: AED 750\n• Ejal40: AED 700\n• Profhilo: AED 800\n• Collagen Booster: AED 800\n• Basic Skin Booster: AED 200\n\n🌟 **Premium Packages:**\n• Sculptra 5ml + Ejal40 + Salmon DNA: AED 1,999\n• Sculptra 10ml + Ejal40 + Salmon DNA: AED 2,500\n\nPerfect for skin hydration, elasticity, and natural glow!"
    },
    iv: {
        keywords: ['iv drip', 'iv therapy', 'vitamin', 'drip', 'infusion'],
        response: "IV Drip Therapy:\n\n💧 **Session Packages:**\n• 1 Session: Available\n• Multiple Sessions: Package deals available\n• Custom Vitamin Blends\n\nBoost energy, immunity, and overall wellness. Each session takes about 30-45 minutes.\n\nInterested in IV therapy? I can provide more details!"
    },
    surgery: {
        keywords: ['surgery', 'plastic surgery', 'liposuction', 'breast', 'surgical'],
        response: "Plastic Surgery Services:\n\n🏥 **Available Procedures:**\n• Liposuction\n• Breast Implants & Enhancement\n• Facial Procedures\n• Body Contouring Surgery\n• Reconstructive Surgery\n\n💰 **Pricing:** From AED 5,000 to AED 25,000 depending on procedure\n\n📋 **Free Consultation:** Available to discuss your goals and options\n\nAll surgeries performed by board-certified plastic surgeons. Want to schedule a consultation?"
    },
    hours: {
        keywords: ['hours', 'open', 'close', 'when are you', 'time', 'working hours'],
        response: "Our Clinic Hours:\n\n📍 **Take Off Beauty Clinic**\nAl Mezan Tower, Muhaisnah 4, Dubai\n\n⏰ **Operating Hours:**\nSun-Thu: 10:00 AM - 10:00 PM\nFri-Sat: 10:00 AM - 11:00 PM\n\n📱 **24/7 Online Booking:**\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\n📞 Call us: +971 45580501"
    },
    location: {
        keywords: ['location', 'where', 'address', 'directions', 'how to get', 'dubai'],
        response: "📍 **Take Off Beauty Clinic Location:**\n\nAl Mezan Tower\nMuhaisnah, Muhaisnah 4\nDubai, UAE\n\n🚗 **Getting Here:**\nEasy access from Sheikh Mohammed Bin Zayed Road\nAmple parking available\n\n📞 **Contact:**\nPhone: +971 45580501\nWhatsApp: Available\n\n📱 **Book Online:**\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\nNeed directions or want to book now?"
    }
};

// Chatbot State
let chatOpen = false;
let conversationHistory = [];

// Initialize chatbot on page load
document.addEventListener('DOMContentLoaded', function() {
    // Minimize chatbot by default on mobile
    if (window.innerWidth < 640) {
        document.getElementById('chatbot').classList.add('minimized');
    }
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Toggle chatbot visibility
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('minimized');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        document.getElementById('chatInput').focus();
    }
}

// Handle chat input keypress
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message function
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    conversationHistory.push({ role: 'user', content: message });
    
    // Clear input immediately
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response after a delay
    setTimeout(() => {
        try {
            const response = getAIResponse(message);
            hideTypingIndicator();
            addMessageToChat(response, 'bot');
            conversationHistory.push({ role: 'bot', content: response });
        } catch (error) {
            console.error('AI Response Error:', error);
            hideTypingIndicator();
            addMessageToChat("I'm here to help! 📱 Book instantly: https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577", 'bot');
        }
    }, 800 + Math.random() * 500);
}

// Add message to chat
function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Convert URLs to clickable links
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    let formattedMessage = message.replace(urlPattern, '<a href="$1" target="_blank" style="color: #0066CC; text-decoration: underline;">$1</a>');
    
    // Convert message to HTML (handle line breaks and lists)
    formattedMessage = formattedMessage
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    content.innerHTML = `<p>${formattedMessage}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// AI Response Logic
function getAIResponse(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|salam|marhaba)/.test(lowercaseMessage)) {
        return "Hello! Welcome to Take Off Beauty Clinic Dubai 🌟\n\nI'm here to help you with:\n• Treatment information & pricing\n• Booking appointments  \n• Package recommendations\n• Beauty consultations\n\n📱 **Book Online:** https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\nWhat would you like to know?";
    }
    
    // Check for thanks
    if (/thank|thanks|shukran/.test(lowercaseMessage)) {
        return "You're very welcome! If you have any other questions about our treatments or would like to book an appointment, I'm here to help 24/7. \n\n📱 Book anytime: https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\nHave a beautiful day! ✨";
    }
    
    // Search actual services database
    const searchResults = searchServices(lowercaseMessage);
    if (searchResults.length > 0) {
        return formatSearchResults(searchResults, lowercaseMessage);
    }
    
    // Check each category
    for (const [category, data] of Object.entries(AI_RESPONSES)) {
        if (data.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
            return data.response;
        }
    }
    
    // Check for specific popular treatments
    if (/russian lip|bratz/.test(lowercaseMessage)) {
        return "💋 **Lip Enhancement Options:**\n\n• Russian Lips: AED 350 (1 hour)\n  Natural, defined look with vertical projection\n\n• Bratz Lips (Extra Volume): AED 444 (1 hour)\n  Fuller, plumper lip look\n\n• 1ml Filler: AED 350 (30 min)\n  Subtle enhancement\n\n🎁 **Combo:** 1ml Filler + Upper Face Botox: AED 450\n\nAll treatments include free touch-up within 2 weeks!\n\n📱 Book now: https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577";
    }
    
    if (/jawline|jaw/.test(lowercaseMessage)) {
        return "💎 **Jawline Enhancement:**\n\n• Jawline Regular Filler: AED 1,000 (1 hour)\n  Define and contour your jawline\n\n• Masseter Botox (Jaw Slimming): AED 250 (30 min)\n  Slim the lower face, reduce grinding\n\n• Jawline with European Filler: AED 900+\n  Premium options available\n\nWant to book a consultation? 📱";
    }    
    // Handle package/deal queries
    if (/package|deal|combo|offer|special|discount/.test(lowercaseMessage)) {
        return "🎁 **Best Value Packages:**\n\n💉 **Filler Packages:**\n• 6ml + Free Botox: AED 1,500 (Save AED 300!)\n• 8ml + Botox: AED 2,000 (Save AED 500!)\n• 10ml + Free Botox: AED 2,500 (Save AED 800!)\n\n🔥 **HIFU Packages:**\n• Face & Neck 3 HIFU + 30ml Lemon: AED 1,800\n• Double Chin 3 HIFU + 30ml Lemon: AED 1,500\n\n🌟 **Premium Combos:**\n• Sculptra 5ml + Ejal40 + Salmon DNA: AED 1,999\n• Endolift + 10 Threads: AED 1,200\n• PRP 5 Sessions + 1 Free: AED 500\n\n📱 See all packages: https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577";
    }
    
    // Handle "how long" queries about results
    if (/how long|duration|last|results/.test(lowercaseMessage)) {
        return "⏰ **Treatment Duration & Results:**\n\n💉 **Fillers:**\n• Procedure: 30min - 1 hour\n• Results last: 9-18 months\n• Immediate effect\n\n💆 **Botox:**\n• Procedure: 30 minutes\n• Results last: 3-4 months\n• Effect in 3-7 days\n\n🔥 **HIFU/Endolift:**\n• Procedure: 30min - 3 hours\n• Results improve: 2-3 months\n• Lasts: 1-2 years\n\n🧵 **Thread Lift:**\n• Procedure: 1 hour\n• Immediate lift, improves over 6 months\n• Lasts: 12-18 months\n\nWhich treatment are you asking about specifically?";
    }
    
    // Handle consultation requests
    if (/consultation|consult|free|assessment/.test(lowercaseMessage)) {
        return "📋 **FREE Consultation Available!**\n\nDuring your consultation, we'll:\n✅ Analyze your skin/body concerns\n✅ Discuss treatment options\n✅ Create personalized plan\n✅ Provide accurate pricing\n✅ Answer all questions\n✅ No pressure, just expert advice\n\n📍 **Available:**\n• In-Person at Al Mezan Tower, Muhaisnah 4, Dubai\n• Virtual Video Consultation\n• Same-day appointments often available!\n\n📱 **Book Your Free Consultation:**\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\n📞 Or call: +971 45580501";
    }    
    // Default response with helpful suggestions
    return "I'm here to help! I can answer questions about:\n\n• 💉 Fillers & Botox (we have 227 services!)\n• 🔥 HIFU & Endolift treatments\n• 🧬 PRP & Skin Boosters\n• 🧵 Thread Lifts\n• 💧 IV Drip Therapy\n• 🏥 Plastic Surgery\n\n📱 **Browse All Services & Book:**\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\n📞 Or call: +971 45580501\n\nWhat treatment interests you?";
}

// Search services database
function searchServices(query) {
    if (SERVICES_DATA.length === 0) return [];
    
    const results = SERVICES_DATA.filter(service => {
        const searchText = `${service.name} ${service.description} ${service.category}`.toLowerCase();
        return searchText.includes(query) || 
               query.split(' ').some(word => word.length > 3 && searchText.includes(word));
    });
    
    return results.slice(0, 5); // Return top 5 matches
}

// Format search results
function formatSearchResults(results, query) {
    if (results.length === 0) return null;
    
    let response = `I found ${results.length} service${results.length > 1 ? 's' : ''} for "${query}":\n\n`;
    
    results.forEach((service, index) => {
        response += `${index + 1}. **${service.name}**\n`;
        response += `   💰 Price: ${service.price}\n`;
        response += `   ⏱️ Duration: ${service.duration}\n`;
        if (service.description && service.description !== service.category) {
            response += `   📝 ${service.description}\n`;
        }
        response += `\n`;
    });
    
    response += `📱 Book any service online:\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\nNeed more details about any treatment?`;
    
    return response;
}

// Quick question handler
function askQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

// Appointment modal functions - Redirect to Fresha
function openAppointmentForm() {
    window.open('https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577', '_blank');
}

function closeAppointmentForm() {
    document.getElementById('appointmentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appointmentModal');
    if (event.target === modal) {
        closeAppointmentForm();
    }
}

// Handle appointment form submission
function handleAppointmentSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Appointment Request:', data);
    
    // Show success message
    const form = event.target;
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <strong>Success!</strong> Your appointment request has been submitted. 
        We'll contact you within 24 hours to confirm your appointment.
    `;
    
    form.parentElement.insertBefore(successDiv, form);
    form.reset();
    
    // Also notify through chatbot
    if (!chatOpen) {
        toggleChat();
    }
    
    setTimeout(() => {
        addMessageToChat(
            `Great news! I see you've submitted an appointment request for ${data.service}. Our team will contact you at ${data.phone} within 24 hours to confirm your appointment. Is there anything else I can help you with?`,
            'bot'
        );
    }, 500);
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeAppointmentForm();
        successDiv.remove();
    }, 3000);
}

// MyChart function
function openMyChart() {
    addMessageToChat("I can help you access your MyChart portal. MyChart allows you to:\n\n• View test results\n• Message your provider\n• Request prescription refills\n• Review treatment history\n• Update personal information\n\nWould you like me to send you the login link?", 'bot');
    
    if (!chatOpen) {
        toggleChat();
    }
}

// Call clinic function
function callClinic() {
    window.location.href = 'tel:+971455805011';
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'white';
        nav.style.padding = '1rem';
        nav.style.boxShadow = 'var(--shadow-md)';
    }
}

// Enhanced AI Agent with context awareness
class BeautyClinicAI {
    constructor() {
        this.context = {
            userName: null,
            preferredService: null,
            budget: null,
            skinType: null,
            previousQuestions: []
        };
    }
    
    updateContext(key, value) {
        this.context[key] = value;
    }
    
    getPersonalizedResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Search services database first
        const serviceResults = searchServices(lowerMessage);
        if (serviceResults.length > 0 && !lowerMessage.includes('hello') && !lowerMessage.includes('hi')) {
            return formatSearchResults(serviceResults, lowerMessage);
        }
        
        // Extract potential name from message
        if (lowerMessage.includes('my name is') || lowerMessage.includes("i'm ")) {
            const nameMatch = message.match(/(?:my name is|i'm|i am)\s+([A-Za-z]+)/i);
            if (nameMatch) {
                this.updateContext('userName', nameMatch[1]);
                return `Nice to meet you, ${nameMatch[1]}! I'm excited to help you on your beauty journey at Take Off Beauty Clinic Dubai. 🌟\n\n📱 Feel free to browse our services: https://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577\n\nWhat brings you to our clinic today?`;
            }
        }
        
        // Skin type detection
        if (/oily|dry|combination|sensitive|normal/.test(lowerMessage)) {
            const skinTypes = lowerMessage.match(/oily|dry|combination|sensitive|normal/i);
            if (skinTypes) {
                this.updateContext('skinType', skinTypes[0]);
                return `Great! For ${skinTypes[0]} skin, I recommend:\n\n${this.getSkinTypeRecommendations(skinTypes[0])}\n\nWould you like to schedule a consultation with one of our skincare specialists?`;
            }
        }
        
        // Budget-based recommendations
        if (/budget|afford|cheap|expensive|under/.test(lowerMessage)) {
            return "I understand budget is important! Here are our options:\n\n💰 **Budget-Friendly (Under AED 500):**\n• PRP 3 Sessions: AED 250\n• Botox Upper Face: AED 300\n• 1ml Filler: AED 350\n• HIFU Face: AED 200\n• Dermapen: AED 100\n\n💎 **Mid-Range (AED 500-1,500):**\n• Full Face Botox: AED 500-700\n• 5ml Fillers: AED 1,300\n• Thread Lift 10 Threads: AED 1,000\n• Sculptra 5ml: AED 900\n\n👑 **Premium Packages (AED 1,500+):**\n• Body Fillers: AED 1,500-14,000\n• Endolift Full Body: AED 6,000\n• Premium Combo Packages: AED 1,999-2,500\n\nWe also offer payment plans! What's your budget range?";
        }
        
        // Popular treatments inquiry
        if (/popular|best seller|trending|most requested/.test(lowerMessage)) {
            return "🔥 **Our Most Popular Treatments:**\n\n1️⃣ **Russian Lips** - AED 350\n   Our #1 requested lip treatment!\n\n2️⃣ **Botox Full Face** - AED 500\n   Smooth wrinkles & refresh your look\n\n3️⃣ **HIFU Face & Neck** - AED 400\n   Non-invasive lifting & tightening\n\n4️⃣ **10ml Fillers + Free Botox** - AED 2,500\n   Best value package!\n\n5️⃣ **PRP 5 Sessions + 1 Free** - AED 500\n   Hair & skin rejuvenation\n\n📱 Book these or explore more:\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577";
        }
        
        // Default to standard AI responses
        return null;
    }
    
    getSkinTypeRecommendations(skinType) {
        const recommendations = {
            'oily': '• Salmon DNA Face: AED 750 (oil control & hydration)\n• PRP Therapy: AED 250-500 (regulate oil production)\n• Skin Booster: AED 200 (balance & refine)\n• Mesotherapy: Available (targeted treatment)',
            'dry': '• Profhilo: AED 800 (deep hydration)\n• Salmon DNA: AED 500-750 (intensive moisture)\n• Skin Booster: AED 200 (hydration boost)\n• Collagen Treatment: AED 800',
            'combination': '• Ejal40: AED 700 (balanced hydration)\n• Skin Booster: AED 200 (customize treatment)\n• PRP + Meso: AED 300 (targeted zones)\n• Dermapen: AED 100 (texture refinement)',
            'sensitive': '• Salmon DNA: AED 500-750 (gentle treatment)\n• Skin Booster: AED 200 (mild formulation)\n• PRP Therapy: AED 250+ (natural healing)\n• Profhilo: AED 800 (biocompatible)',
            'normal': '• Maintenance Skin Boosters: AED 200-800\n• Preventative PRP: AED 250-500\n• Sculptra: AED 900+ (anti-aging)\n• Regular Profhilo: AED 800'
        };
        
        return recommendations[skinType.toLowerCase()] || 'Personalized treatment plan based on your needs - Free consultation available!';
    }
}

// Initialize enhanced AI
const beautyAI = new BeautyClinicAI();

// Override getAIResponse to use enhanced AI
const originalGetAIResponse = getAIResponse;
function getAIResponse(message) {
    // Try enhanced AI first
    const personalizedResponse = beautyAI.getPersonalizedResponse(message);
    if (personalizedResponse) {
        return personalizedResponse;
    }
    
    // Fall back to standard responses
    return originalGetAIResponse(message);
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections on page load
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.access-card, .service-card, .care-card, .feature-card, .location-card, .provider-card, .news-card'
    );
    
    animatedElements.forEach(el => observer.observe(el));
});

// Proactive chatbot suggestions
setTimeout(() => {
    if (!chatOpen && conversationHistory.length === 0) {
        // Add a subtle notification badge
        const chatHeader = document.querySelector('.chatbot-header');
        const badge = document.createElement('div');
        badge.className = 'notification-badge';
        badge.textContent = '1';
        badge.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4757;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
            animation: pulse 2s infinite;
        `;
        chatHeader.style.position = 'relative';
        chatHeader.appendChild(badge);
        
        // Remove badge when chat is opened
        const originalToggle = toggleChat;
        window.toggleChat = function() {
            originalToggle();
            if (badge && badge.parentElement) {
                badge.remove();
            }
        };
    }
}, 5000);

// Advanced AI features
const aiFeatures = {
    // Sentiment analysis
    analyzeSentiment(message) {
        const positive = /happy|great|excellent|love|perfect|amazing|wonderful/i.test(message);
        const negative = /unhappy|bad|terrible|disappointed|angry|frustrated/i.test(message);
        
        if (positive) return 'positive';
        if (negative) return 'negative';
        return 'neutral';
    },
    
    // Intent detection
    detectIntent(message) {
        const intents = {
            booking: /book|schedule|appointment|reserve/i,
            pricing: /cost|price|how much|expensive|cheap/i,
            information: /what|how|why|when|where|tell me about/i,
            comparison: /vs|versus|compare|difference|better/i,
            complaint: /complaint|problem|issue|wrong|disappointed/i
        };
        
        for (const [intent, pattern] of Object.entries(intents)) {
            if (pattern.test(message)) {
                return intent;
            }
        }
        
        return 'general';
    },
    
    // Smart follow-up suggestions
    suggestFollowUp(message, response) {
        const intent = this.detectIntent(message);
        
        const suggestions = {
            booking: ["What's your availability?", "Can I book online?", "Do you have weekend appointments?"],
            pricing: ["Do you offer packages?", "What payment methods do you accept?", "Are there any current promotions?"],
            information: ["Can I see before/after photos?", "How long does recovery take?", "Are there any side effects?"],
            comparison: ["Which treatment is best for me?", "What do other patients prefer?", "Can I combine treatments?"]
        };
        
        return suggestions[intent] || ["Tell me more", "Book an appointment", "What are your hours?"];
    }
};

// Enhanced message sending with AI features
const enhancedSendMessage = sendMessage;
window.sendMessage = function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Detect intent and sentiment
    const intent = aiFeatures.detectIntent(message);
    const sentiment = aiFeatures.analyzeSentiment(message);
    
    // Handle complaints with priority
    if (intent === 'complaint') {
        addMessageToChat(message, 'user');
        input.value = '';
        
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessageToChat(
                "I'm truly sorry to hear about your experience. Your satisfaction is our top priority. \n\n📞 Please contact our patient care manager:\n• Call: +971 45580501\n• WhatsApp: Available\n• Visit: Al Mezan Tower, Muhaisnah 4, Dubai\n\nWe're committed to making this right and ensuring your complete satisfaction.",
                'bot'
            );
        }, 1000);
        return;
    }
    
    // Use enhanced send message
    enhancedSendMessage();
};

// Add service price lookup
function getServicePrice(serviceName) {
    if (SERVICES_DATA.length === 0) return null;
    
    const service = SERVICES_DATA.find(s => 
        s.name.toLowerCase().includes(serviceName.toLowerCase())
    );
    
    return service;
}

// Add price comparison feature
function compareTreatments(treatment1, treatment2) {
    const service1 = searchServices(treatment1)[0];
    const service2 = searchServices(treatment2)[0];
    
    if (service1 && service2) {
        return `📊 **Treatment Comparison:**\n\n**${service1.name}**\n💰 ${service1.price}\n⏱️ ${service1.duration}\n\n**vs**\n\n**${service2.name}**\n💰 ${service2.price}\n⏱️ ${service2.duration}\n\nBoth excellent options! Would you like more details about either?`;
    }
    
    return null;
}

// Add CSS for notification badge animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// Show About Us function
function showAboutUs() {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    // Clear existing messages
    chatBody.innerHTML = '';
    
    // Open the chat
    document.getElementById('chatWidget').style.display = 'flex';
    
    // Add About Us message
    const aboutMessage = `<strong>About Take Off Beauty Clinic</strong>\n\nWelcome to Take Off Beauty Clinic – Dubai's premier destination for advanced aesthetic treatments and transformative beauty solutions.\n\n<strong>Our Story</strong>\nFounded in the heart of Dubai, Take Off Beauty Clinic was established with a singular vision: to empower individuals to take off to their best selves through cutting-edge aesthetic treatments delivered with the highest standards of care and precision.\n\n<strong>Our Philosophy</strong>\nWe believe that beauty is not just skin deep – it's about confidence, wellness, and feeling extraordinary in your own skin. Our approach combines medical excellence with artistic sensibility, ensuring natural-looking results that enhance your unique beauty.\n\n<strong>World-Class Expertise</strong>\n• International board-certified aesthetic physicians\n• Advanced training in the latest aesthetic techniques\n• Over 227 specialized treatments and procedures\n• State-of-the-art technology and premium products\n\n<strong>Our Commitment</strong>\n• <strong>Safety First:</strong> Stringent medical protocols and sterile environments\n• <strong>Personalized Care:</strong> Customized treatment plans for each client\n• <strong>Natural Results:</strong> Subtle enhancements that honor your features\n• <strong>Transparent Pricing:</strong> Clear, competitive pricing with no hidden fees\n\n<strong>Award-Winning Services</strong>\nFrom injectable treatments and advanced fillers to HIFU skin tightening, body contouring, thread lifts, and regenerative PRP therapies – we offer the complete spectrum of non-surgical and minimally invasive aesthetic solutions.\n\n<strong>Our Location</strong>\n📍 Al Mezan Tower, Muhaisnah 4, Dubai, UAE\n📞 +971 45580501\n📱 WhatsApp: wa.me/971554047220\n\n<strong>Book Your Consultation</strong>\nReady to take off to your best self? Book online or chat with us now!\n\nhttps://www.fresha.com/book-now/confident-k2us4vvg/all-offer?share=true&pId=724577`;
    
    addMessageToChat(aboutMessage, 'bot');
}

console.log('Takeoff Beauty Clinic - AI Assistant Initialized ✨');

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatBody = document.getElementById("chatBody");

    if (userInput.trim() === "") return;

    // Display user message
    chatBody.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
    document.getElementById("userInput").value = "";

    // Send user input to OpenAI API (ChatGPT 3.5)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "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"  // Replace with your API key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 150  // Adjust the number of tokens as needed
        })
    });

    if (response.ok) {
        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Display AI response
        chatBody.innerHTML += `<div><strong>AI:</strong> ${aiMessage}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;  // Auto-scroll to bottom
    } else {
        chatBody.innerHTML += `<div><strong>AI:</strong> Sorry, there was an error.</div>`;
    }
}

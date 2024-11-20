async function sendQuery(botName) {
  const query = document.getElementById('user-input').value.trim();

  if (!query) {
    document.getElementById('response-output').innerText = 'Please enter a query.';
    return;
  }

  const filePath = '/uploads/sample.pdf'; // Adjust as needed

  try {
    const response = await fetch(`/api/chat/${botName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, filePath }),
    });

    if (!response.ok) throw new Error('Failed to fetch response from the chatbot.');

    const data = await response.json();
    document.getElementById('response-output').innerText = data.response;
  } catch (error) {
    document.getElementById('response-output').innerText = `Error: ${error.message}`;
  }
}
  

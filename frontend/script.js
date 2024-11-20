async function sendQuery(botName) {
    const query = document.getElementById('user-input').value;
    const filePath = '/uploads/sample.pdf'; // Adjust as needed
  
    const response = await fetch(`/api/chat/${botName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, filePath }),
    });
  
    const data = await response.json();
    document.getElementById('response-output').innerText = data.response;
  }
  

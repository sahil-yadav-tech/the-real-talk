const express = require('express');

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'notification-service is healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Routes will be added here

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

module.exports = app;

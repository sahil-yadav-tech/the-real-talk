const express = require('express');

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'api-gateway is healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Routes will be added here

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway Service running on port ${PORT}`);
});

module.exports = app;

const express = require('express');

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'file-service is healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Routes will be added here

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`File Management Service running on port ${PORT}`);
});

module.exports = app;

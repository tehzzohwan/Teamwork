const express = require('express');
const bodyParser = require('body-parser');
const teamworkRoutes = require('./routes/teamwork.user.routes');

const app = express();

const port = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get('/', (request, response) => {
	response.json({ info: 'we\'re live' });
});

app.use('/api/v1', teamworkRoutes);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});

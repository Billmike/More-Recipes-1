import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swaggerSpec from './swagger';

dotenv.config();

// Setup the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable cross origin for XMLHttpRequest
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve swagger specifications to swagger-ui for browser display
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Require our routes
routes(app);

// Catch other routes with get method
// returns the index page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      status: 'Error',
      message: err.message
    });
});

// Set the app entry port
app.set('port', process.env.PORT || 3000);

// app.listen(port);
app.listen(app.get('port'));

export default app;

import * as functions from 'firebase-functions';
import * as express from 'express';
import routes from '../../routes/index';

const app = express();

// Import routes
app.use('/', routes);

// Export Express app as a Cloud Function
export const api = functions.https.onRequest(app);
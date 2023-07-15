import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import csurf from 'csurf';
import path from 'path';
const __dirname = path.resolve();

import setupNunjucks from './helpers/setup-nunjucks.js';
import setupLocals from './helpers/setup-locals.js';

const app = express();
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/static/')));
app.use(csurf({ cookie: { httpOnly: true } }));

app.use(setupLocals);
setupNunjucks(app);

// Routes
app.get('/', (req, res) => {
  res.render('index', {});
});

app.use((err, req, res, next) => {
  return next(err);
});

// Start server
app.listen('3000', () => {
  console.log('Server started on port 3000');
});

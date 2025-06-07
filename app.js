const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const toDoRouter = require('./routes/toDoRoutes')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')
const path = require('path')
const compression = require('compression')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express()

const allowedOrigins = [
    'https://task-manager.me',
    'https://www.task-manager.me',
    'http://localhost:5000',
    'http://localhost:3000'
];

// Configure CORS
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env') === 'development')
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(compression())


app.use(helmet()); 

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/users', authLimiter); 

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200, 
    message: 'Too many API requests from this IP, please try again later.'
});
app.use('/toDos', apiLimiter);


app.use('/toDos', toDoRouter)
app.use('/users', userRouter)

app.use(globalErrorHandler)

module.exports = app



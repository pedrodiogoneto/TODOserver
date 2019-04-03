const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const notes = require('./routes/noteRoutes')

const app = express()

// middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// setup mongoose & mongoose session
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/ToDo', {
  useNewUrlParser: true,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
})

app.use(session({
  secret: 'some-string',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}))

app.use(function (req, res, next) {
  app.locals.user = req.user
  next()
})

app.use('/', notes)

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404).json({message: 'not found'})
})

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err)

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500)
    res.json({message: 'unexpected error'})
  }
})

module.exports = app

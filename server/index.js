const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const socketio = require('socket.io')

const db = require('./db')
const User = require('./db/models/user')
const sessionStore = new SequelizeStore({db})
const app = express()
const PORT = process.env.PORT || 3000

// Global Mocha hook for resource cleanup
// Otherwise, Mocha v4+ never quits after tests
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

// secret API keys read by the Node process on process.env
if (process.env.NODE_ENV !== 'production') require('./auth/localSecrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware w/ passport
  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  // API & AUTH routes
  app.use('/api', require('./api'))
  app.use('/auth', require('./auth'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', '/public')))

  // handle 404s
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // all GET reqs not on an API route, send index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`
Listening on port ${PORT}
http://localhost:${PORT}/`)
  })

  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  // await sessionStore.sync();
  // await syncDb();
  await createApp()
  await startListening()
}

// Evaluates to true when file is run directly from command line - i.e. 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc.)
// Evaluates to false when module is required by another module (e.g. for test spec)
if (require.main === module) bootApp()
else createApp()

module.exports = app

import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

console.log(process.env.JWT_SECRET);

const app = express();
app.use(express.bodyParser());
app.use(express.json());

const JWT_SECRET = 'your_secret_key';
const PUBLIC_DIR = path.join(__dirname, 'public');

// Passport ローカル認証
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    return done(null, user);
  })
);

// JWT 認証ミドルウェア
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendFile(path.join(PUBLIC_DIR, 'login.html'));

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendFile(path.join(PUBLIC_DIR, 'login.html'));
    req.user = user;
    next();
  });
};

app.get('/', authenticateJWT, (_, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/:file', (req, res) => {
  const filePath = path.join(PUBLIC_DIR, req.params.file);
  if([].includes(req.params.file)){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).sendFile(path.join(PUBLIC_DIR, '403.html'));
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) return res.status(403).sendFile(path.join(PUBLIC_DIR, '403.html'));
      res.sendFile(filePath);
    });
  } else{
    res.sendFile(filePath);
  }
});

// ユーザー登録
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// ログイン（JWT発行）
app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.id, username: req.user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// ログアウト
app.post('/logout', (req, res) => {
  res.json({ message: 'Logged out, delete token on client side' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

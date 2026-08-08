import { Router } from 'express';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const MESSAGES_FILE = join(DATA_DIR, 'messages.json');

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(MESSAGES_FILE, 'utf-8');
  } catch {
    await writeFile(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

async function readMessages() {
  await ensureDataFile();
  const data = await readFile(MESSAGES_FILE, 'utf-8');
  return JSON.parse(data);
}

async function saveMessage(message) {
  const messages = await readMessages();
  messages.unshift(message);
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

function validateContact({ name, email, message }) {
  if (!name?.trim() || name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'A valid email is required';
  }
  if (!message?.trim() || message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }
  return null;
}

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const error = validateContact({ name, email, message });

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    const entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || 'Portfolio inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    await saveMessage(entry);

    res.status(201).json({
      success: true,
      message: 'Thanks for reaching out! I will get back to you soon.',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const messages = await readMessages();
    res.json({ count: messages.length, messages });
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;

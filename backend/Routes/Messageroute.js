import express from 'express';
import {
  getUsersForSidebar,
  getMessages,
  markMessageseen,
  sendmessage
} from '../Controller/MessageCOntroller.js';
import { isLoggedIn } from '../MIddelwaRE/auth.js'

const messageRouter = express.Router();

// Get all users for sidebar (except logged-in user)
messageRouter.get('/users', isLoggedIn, getUsersForSidebar);

// Get all messages between logged-in user and selected user
messageRouter.get('/:id', isLoggedIn, getMessages);

// Mark a message as seen by message id
messageRouter.put('/mark/:id', isLoggedIn, markMessageseen);

messageRouter.post('/send/:id',isLoggedIn,sendmessage)

export default messageRouter;
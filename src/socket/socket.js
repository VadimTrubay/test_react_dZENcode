import {io} from 'socket.io-client';

const socket = io('ws://localhost:8001/ws/comments/');

export default socket;
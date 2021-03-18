import { io } from "socket.io-client";
import { isProductionMode } from 'constants/common';
const PORT = 3000;

const url = isProductionMode ? `https://${location.hostname}` : `http://localhost:${PORT}`;

const socket = io(url);
export default socket;

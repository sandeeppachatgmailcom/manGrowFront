import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  connected: false,
  socketId: null,
};

const createSocketConnection = (url = "http://localhost:4000") => {
  return io(url);
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      if (!state.socket) {
        const url = action.payload || "http://localhost:4000";
        state.socket = createSocketConnection(url);

        state.socket.on('connect', () => {
          state.connected = true;
          state.socketId = state.socket.id;
        });

        state.socket.on('disconnect', () => {
          state.connected = false;
          state.socketId = null;
        });
      }
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
        state.connected = false;
        state.socketId = null;
      }
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

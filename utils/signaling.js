const { Server } = require('socket.io');

const initSignaling = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',  // You can restrict it to your frontend's URL in production
            methods: ['GET', 'POST'],
        },
    });

    // Handle connection when a user connects
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join a room
        socket.on('join-room', (roomID, userID) => {
            socket.join(roomID);
            console.log(`${userID} joined room: ${roomID}`);
            socket.to(roomID).emit('user-connected', userID);
        });

        // Handle offer event
        socket.on('offer', (data) => {
            const { offer, roomID, userID } = data;
            socket.to(roomID).emit('offer', { offer, userID });
            console.log(`Offer sent from ${userID} in room: ${roomID}`);
        });

        // Handle answer event
        socket.on('answer', (data) => {
            const { answer, roomID, userID } = data;
            socket.to(roomID).emit('answer', { answer, userID });
            console.log(`Answer sent from ${userID} in room: ${roomID}`);
        });

        // Handle ICE candidates
        socket.on('ice-candidate', (data) => {
            const { candidate, roomID, userID } = data;
            socket.to(roomID).emit('ice-candidate', { candidate, userID });
            console.log(`ICE candidate sent from ${userID} in room: ${roomID}`);
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            socket.broadcast.emit('user-disconnected', socket.id);
        });
    });
};

module.exports = initSignaling;

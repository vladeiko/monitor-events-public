const logger = require("../logger");
const jwt = require("jsonwebtoken");

const initialize = (strapi) => {
  logger.info("Creating socket.io client");

  const ioServer = require("socket.io")(strapi.server.httpServer, {
    cors: {
      origin: process.env["FRONT_APP_URL"],
      methods: ["GET", "POST"],
    },
  });

  ioServer.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        process.env.JWT_SECRET,
        function (err, decoded) {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  });

  logger.info("socket.io client created");

  ioServer.on("connection", function (socket) {
    logger.info(`New socket connected: ${socket.id}`);
  });

  strapi.socketIo = ioServer;
};

module.exports = {
  initialize,
};

// console.log(jwt.verify(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.4lGi5WFzVkK196PmvdZZRZEvD50vaK36QSb9udIkp28",
//   process.env.JWT_SECRET
// ));

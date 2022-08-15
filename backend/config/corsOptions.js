const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: "Content-Type, Authorization, AuthorizationInternal",
};

module.exports = corsOptions;

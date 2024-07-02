const fastify = require("fastify")({ logger: true });

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// A simple in-memory "database"
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Get all users
fastify.get("/users", async (request, reply) => {
  return users;
});

// Get single user
fastify.get("/users/:id", async (request, reply) => {
  const { id } = request.params;
  const user = users.find((user) => user.id == id);
  if (user) {
    return user;
  }
  reply.code(404).send({ message: "User not found" });
});

// Add a user
fastify.post("/users", async (request, reply) => {
  const { name } = request.body;
  const id = users.length + 1;
  const newUser = { id, name };
  users.push(newUser);
  return newUser;
});

// Update a user
fastify.put("/users/:id", async (request, reply) => {
  const { id } = request.params;
  const { name } = request.body;
  users = users.map((user) => (user.id == id ? { id, name } : user));
  return { id, name };
});

// Delete a user
fastify.delete("/users/:id", async (request, reply) => {
  const { id } = request.params;
  users = users.filter((user) => user.id != id);
  return { message: "User deleted" };
});

// Run the server
fastify.delete("/users/:id", async (request, reply) => {
  const { id } = request.params;
  users = users.filter((user) => user.id != id);
  return { message: "User deleted" };
});

// Run the server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

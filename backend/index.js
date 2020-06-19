const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Task {
    id: ID!
    description: String!
  }
  type Query {
    tasks: [Task]!
  }
  type Mutation {
    createTask(description: String!): Task!
    deleteTask(id: ID!): Task!
  }
`;

const tasks = [];

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (_, { description }) => {
      const newTask = { description, id: String(Math.random()) };
      tasks.unshift(newTask);
      return newTask;
    },
    deleteTask: (_, { id }) => {
      const taskToDelete = tasks.find((t) => t.id === id);
      const index = tasks.indexOf(taskToDelete);
      tasks.splice(index, 1);
      return taskToDelete;
    },
  },
};

const PORT = 3001;
const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen(PORT)
  .then(({ url }) => console.log(`Server listening on ${url}`));

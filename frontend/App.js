import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Tasks from "./components/Tasks";
import client from "./client";

const App = () => (
  <ApolloProvider client={client}>
    <Tasks />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));

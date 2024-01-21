import morgan from "morgan";
 import cors from "cors";
import express from 'express'
import postgraphile from "postgraphile";

const url = "postgres://postgres:11235@localhost:5432/postgres"

  const app = express();

  app.use(cors());

  app.use(postgraphile(url,
    'user_schema', {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      graphqlRoute: '/graphql',
      graphiqlRoute: '/graphiql',
      jwtPgTypeIdentifier: "user_schema.jwt_token",
      jwtSecret: process.env.JWT_SECRET
    }))

  app.use(
    "/graphql",
    express.json(),
    morgan("tiny"),
  );
  
app.listen(5000,() => console.log("server is listen in http://localhost:5000/graphiql"))
import morgan from "morgan";
 import cors from "cors";
import express from 'express'
import postgraphile from "postgraphile";

const url = "postgres://taxiservicedata_user:W4elQKNTpiMRhKkTprlLnzaJpnflXMul@dpg-cm4mr7mn7f5s73c0iudg-a.oregon-postgres.render.com/taxiservicedata"

  const app = express();

  app.use(cors());

  app.use(postgraphile(url,
    'public', {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      graphqlRoute: '/graphql',
      graphiqlRoute: '/graphiql',
      jwtPgTypeIdentifier: "public.jwt_token",
      jwtSecret: process.env.JWT_SECRET
    }))

  app.use(
    "/graphql",
    express.json(),
    morgan("tiny"),
  );
  
app.listen(5000,() => console.log("server is listen in http://localhost:5000/graphiql"))
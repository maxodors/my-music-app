import express from 'express';
import cors from 'cors';
import trackRoutes from './routes/trackRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', trackRoutes); 

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});

import express from 'express';
import cors from 'cors';
import trackRoutes from './routes/trackRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/', trackRoutes);

app.listen(PORT, () => {
  console.log(`🎧 Music backend is running at http://localhost:${PORT}`);
});

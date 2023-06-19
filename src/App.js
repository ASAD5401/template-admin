
import HomeRouter from './routes/homeRoutes';
import { useAuth } from './hooks/useAuth';
import AuthRouter from './routes/authRoutes';
// ----------------------------------------------------------------------

export default function App() {
  const { user } = useAuth()
  return (
    <>
      {user?.email ? <HomeRouter /> : <AuthRouter/>}
    </>





  );
}

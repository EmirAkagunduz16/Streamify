import { Navigate, Route, Routes } from "react-router";
import HomePage from './pages/HomePage';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import NotificationPage from './pages/NotificationPage';
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
  // NOTE : this is why we need tanstack query 

  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true)
  //     try {
  //       const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  //       const json = await data.json()
  //       setData(json)
  //     } catch (error) {
  //         setError(error)
  //     }finally{
  //       setIsLoading(false)
  //     }
  //   };
  // }, []);

  // console.log(data);

  // {data, isLoading} = useQuery("")


  // tanstack query crash course
  // const {data} = useQuery({queryKey: ["todos"],

  //   queryFn: async() => {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
  //     return res.data;
  //   }
  // })

  // console.log(data);

  const {isLoading, authUser} = useAuthUser();
  
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if(isLoading) return <PageLoader />
  

  return (
    <div className='h-screen text-xl text-white' data-theme="dark">
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        ) } />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/onboarding' element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />

    </div>
  )
}  

export default App
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet, useParams } from 'react-router-dom'
import './index.css'
import Header from './components/Header/Header.jsx'
import Body from './components/Body/Body.jsx'
import Footer from './components/Footer/Footer.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Error from './components/Error/Error.jsx'
import HeroSection from './utils/HeroSection.jsx'
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu.jsx'


const AppLayout = ()=> {
    const {resId} = useParams();
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <HeroSection />
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />
            }
        ]
    },
    {
        path: "*",
        element: <Error 
            errorCode="404" 
            errorMessage="Page Not Found" 
            description="The page you're looking for doesn't exist or has been moved."
        />
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={appRouter} />
)

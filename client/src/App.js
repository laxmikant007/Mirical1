// Basic Imports
import { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.css';
import loadingImg from './img/ball-triangle.svg'

// Components
import Navbar from './Components/Navbar';
import Home from './Containers/Home';
import Footer from './Components/Footer';

// CSS Imports for packages
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Action Import
import { isLoggedin } from './actions';
import Rocket from './Components/Rocket';
import WhatsAppIcon from './Components/WhatsappIcon';
import Login from './Containers/Login';

// Lazy Load Component
const ErrorPage = lazy(() => import('./Containers/404'));
const Team = lazy(() => import('./Containers/Team'));
const FAQ = lazy(() => import('./Containers/FAQ'));
const Terms = lazy(() => import('./Containers/Terms'));
const Testimonials = lazy(() => import('./Containers/Testimonial'));
const Policy = lazy(() => import('./Containers/Policy'))
const About = lazy(() => import('./Containers/About'));
const Contact = lazy(() => import('./Containers/Contact'));
const Services = lazy(() => import('./Containers/Services'));
const Quote = lazy(() => import('./Containers/Quote'));
const Signup = lazy(() => import('./Containers/Signup'));
const Blog = lazy(() => import('./Containers/Blogs/Blog'));
const BlogPg = lazy(() => import('./Containers/Blogs/BlogPg'));
const CategoryBlogsPage = lazy(() => import ('./Containers/Blogs/CategoryBlogs'));
const UserBlogPage = lazy(() => import ('./Containers/Blogs/UserProfile'))
const TinyMce = lazy(() => import('./Containers/tinymce.jsx'));



function App() {

  const location = useLocation();

  useEffect(() => {
    // Scroll top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isLoggedin())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={
        <div className="divLoader">
            <img src={loadingImg} alt="Loading" />
        </div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/service' component={Services} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/user/login' component={Login} />
        <Route exact path='/user/signup' component={Signup} />
        <Route exact path='/team' component={Team} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/testimonial" component={Testimonials} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/blogs" component={Blog} />
        <Route exact path="/blog/:blogId/:blogslug" component={BlogPg} />
        <Route exact path="/blogs/user/:userId/:username" component={UserBlogPage} />
        <Route exact path="/blogs/category/:categoryId/:categoryslug" component={CategoryBlogsPage} />
        <Route exact path="/quote" component={Quote} />
        <Route exact path="/tiny" component={TinyMce} />
        <Route component={ErrorPage} />
      </Switch>
      </Suspense>
      <Footer />
      <WhatsAppIcon />
      <Rocket />
      <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          draggable
      />
    </div>
  );
}

export default App;

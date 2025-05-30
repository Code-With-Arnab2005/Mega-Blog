import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AddPost from './pages/AddPost.jsx';
import AllPosts from './pages/AllPosts.jsx';
import Post from './pages/Post.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import AuthLayout from "./components/AuthLayout.jsx";
import MyPosts from './pages/MyPosts.jsx';
import MyActivePosts from './pages/MyActivePosts.jsx';
import MyInactivePosts from './pages/MyInactivePosts.jsx';
import MyPostsLayout from './components/MyPostsLayout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, 
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/my-posts/:username/",
        element: (
          <AuthLayout authentication={true}>
            <MyPostsLayout />
          </AuthLayout>
        ),
        children: [
          {
            path: "",
            element: <MyPosts />
          },
          {
            path: "active-posts",
            element: <MyActivePosts />            
          },
          {
            path: "inactive-posts",
            element: <MyInactivePosts />
          }
        ]
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <UpdatePost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
);

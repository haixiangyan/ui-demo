import {createBrowserRouter} from "react-router-dom";
import NewYearActivity from "../pages/NewYearActivity";
import VideoFeeds from "../pages/VideoFeeds";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/new-year-activity',
    element: <NewYearActivity/>
  },
  {
    path: '/video-feeds',
    element: <VideoFeeds />
  }
]);

export default router;

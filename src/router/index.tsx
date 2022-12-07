import {createBrowserRouter} from "react-router-dom";
import NewYearActivity from "../pages/NewYearActivity";
import VideoFeeds from "../pages/VideoFeeds";
import NumberDisplay from "../pages/NumberDisplay";

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
  },
  {
    path: '/number-display',
    element: <NumberDisplay />
  }
]);

export default router;

import {createBrowserRouter} from "react-router-dom";
import NewYearActivity from "../pages/NewYearActivity";
import VideoFeeds from "../pages/VideoFeeds";
import PriceNumber from "../pages/PriceNumber";

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
    path: '/price-number',
    element: <PriceNumber />
  }
]);

export default router;

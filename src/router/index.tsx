import {createBrowserRouter} from "react-router-dom";
import NewYearActivity from "../pages/NewYearActivity";
import VideoFeeds from "../pages/VideoFeeds";
import NumberDisplay from "../pages/NumberDisplay";
import RedPacket from "../pages/RedPacket";
import ReduxPage from "../pages/ReduxPage";

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
  },
  {
    path: '/red-packet',
    element: <RedPacket />
  },
  {
    path: '/redux-page',
    element: <ReduxPage />
  },
]);

export default router;

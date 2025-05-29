import { createBrowserRouter } from "react-router-dom";
import type { Router as RemixRouter } from '@remix-run/router'

import { SuggestionList } from "../pages/suggestionList";


export const suggestionListRoute = createBrowserRouter([
    {
        path: "/",
        element: <SuggestionList />,
    },
]);
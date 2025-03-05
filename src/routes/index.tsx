import { Route, RouteProps, Routes } from "react-router-dom";
import CreatingFormController from "../components/CreateForm/CreatingFormController";
import VacationPreview from "../components/VacationForm/VacationPreview";

export const RouteList: RouteProps[] = [
  { path: "/", element: <CreatingFormController /> },
  { path: "/preview", element: <VacationPreview /> },
];

export const RouterConfig = () => {
  return (
    <Routes>
      {RouteList.map((config: RouteProps) => (
        <Route key={config.path} {...config} />
      ))}
    </Routes>
  );
};

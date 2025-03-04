import { Route, RouteProps, Routes } from "react-router-dom";
import CreatingForm from "../components/CreateForm/CreatingForm";
import VacationPreview from "../components/VacationForm/VacationPreview";

export const RouteList: RouteProps[] = [
  { path: "/", element: <CreatingForm /> },
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

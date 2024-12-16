import { Route, RouteProps, Routes } from "react-router-dom";
import CreatingForm from "../CreateForm/CreatingForm";
import PDFPreview from "../pages/PDFPreview";

export const RouteList: RouteProps[] = [
  { path: "/", element: <CreatingForm /> },
  { path: "/preview", element: <PDFPreview /> },
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

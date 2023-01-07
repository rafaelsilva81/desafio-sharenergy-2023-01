import Navigation from "./Navigation";
import Sidemenu from "./Sidemenu";

const Layout = ({}: /*   children,
  active, */
{
  /*   children: ReactNode;
  active: number; */
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidemenu />

      <Navigation />
    </div>
  );
};

export default Layout;

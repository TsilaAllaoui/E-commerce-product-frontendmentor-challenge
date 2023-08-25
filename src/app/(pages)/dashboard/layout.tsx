import { Panels } from "@/app/components/Panels";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Panels />
      {children}
    </div>
  );
};

export default Layout;

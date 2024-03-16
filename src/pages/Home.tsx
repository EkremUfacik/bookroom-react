import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-x-8">
        <Link to="admin">
          <Button>Login as a Admin</Button>
        </Link>
        <Link to="user">
          <Button>Login as a User</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

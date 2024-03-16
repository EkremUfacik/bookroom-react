import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <Link to="/">
      <Button
        variant="link"
        className="ml-auto block border bg-cyan-800 text-white mt-4"
      >
        Logout
      </Button>
    </Link>
  );
};

export default LogoutButton;

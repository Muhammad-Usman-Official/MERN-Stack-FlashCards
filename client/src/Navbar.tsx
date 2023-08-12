import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="">
        <ul className="container mx-auto">
          <li>
            <Link className="hover:underline underline-offset-2" to={"/"}>
              LOGO
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

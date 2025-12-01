import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="flex flex-col relative bg-[var(--nav)] w-full justify-center items-center p-6"
      aria-label="Website footer with project information and homepage link"
    >
      <Typography
        variant="body1"
        className="text-[var(--text)] text-center mt-2"
      >
        This website is created for project-purposes for IT2810 WebDevelopment
        at NTNU.
      </Typography>

      <Typography
        variant="body1"
        className="text-[var(--text)] text-center mt-1 mb-4 max-w-4xl"
      >
        On this website you can see a number of selected books, read more about
        the ones you want and see reviews.
      </Typography>

      {/* Changed from typography-wrapped link to a standalone link to improve semantic structure, keyboard focus visibility, and accessibility*/}
      <Link
        to="/"
        className="text-[var(--text)] pt-4 hover:underline cursor-pointer text-sm font-semibold"
      >
        HOME
      </Link>
    </footer>
  );
};

export default Footer;

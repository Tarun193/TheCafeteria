// Important imports;
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <section>
      <hr className="h-1 bg-yellow-950 w-2/3 mx-auto rounded-full mt-2" />
      <footer className="flex flex-col items-center sticky bottom-0 mt-2 py-2">
        <a>
          <p className="text-lg">
            &copy; The<span className="text-yellow-950">Cafeteria</span> ☕
          </p>
        </a>
        <div className="mt-3 flex flex-row gap-4">
          <FaInstagram className="hover:cursor-pointer" size={40} />
          <FaFacebook className="hover:cursor-pointer" size={40} />
          <FaTwitter className="hover:cursor-pointer" size={40} />
        </div>
      </footer>
    </section>
  );
};

export default Footer;

import "@/app/styles/Contact.scss";
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";

const Contact = () => {
  return (
    <div id="contact">
      <h1>😄 Wanna chat? 😄 Here are my infos: </h1>
      <div id="links">
        <div id="github">
          <a href="https://github.com/TsilaAllaoui">
            <AiFillGithub />
          </a>
        </div>
        <div id="linkedin">
          <a href="https://www.linkedin.com/in/rasolo-allaoui-tsilavo-maminiaina-manatombo-948634201">
            <AiFillLinkedin />
          </a>
        </div>
        <div id="facebook">
          <a href="https://www.facebook.com/tsilavomaminiaina.rasoloallaoui">
            <AiFillFacebook />
          </a>
        </div>
        <div id="email">
          <a href="tsila.allaoui@gmail.com">
            <BiLogoGmail />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

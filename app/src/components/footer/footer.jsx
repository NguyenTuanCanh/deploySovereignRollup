import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./footer.css";

import { SOCIAL } from "../../constants/main.js";

function Footer() {
  const socialEl = SOCIAL.map((item, index) => (
    <a href={item.link} key={index}>
      <FontAwesomeIcon icon={item.icon} style={{color: "#fff", fontSize: "24px", marginRight: "10px"}} />
    </a>
  ));

  return (
    <div style={footer}>
      {socialEl}
    </div>
  );
}

const footer = {
  height: "100px",
}

export default Footer;

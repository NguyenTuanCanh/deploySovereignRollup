import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ReactSVG } from "react-svg";

import "./header.css";

function Header() {
  return (
    <div className="header">
      <ReactSVG src="./public/celestia-logo.svg" />
      <div className="connectButton">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Header;

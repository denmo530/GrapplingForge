import { FacebookIcon, GithubIcon, UserIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import React from "react";

const ConnectedAccount = ({ identity }: { identity: any }) => {
  let icon;
  switch (identity.provider) {
    case "google":
      icon = <FaGoogle size={17} />;
      break;
    case "github":
      icon = <GithubIcon />;
      break;
    case "facebook":
      icon = <FacebookIcon />;
      break;
    default:
      icon = <UserIcon />;
      break;
  }

  return (
    <div key={identity.id} className="flex gap-3 items-center">
      {icon}
      <div className="flex gap-2">
        <p>{identity.provider}</p>
        <span>({identity.identity_data?.email})</span>
      </div>
    </div>
  );
};

export default ConnectedAccount;

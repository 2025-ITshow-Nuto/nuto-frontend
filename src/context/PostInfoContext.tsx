import { createContext, useContext, useEffect, useState } from "react";

interface PostInfoContextProps {
  name: string;
  location: string;
  setName: (name: string) => void;
  setLocation: (location: string) => void;
  logo: string;
  setLogo: (logo: string) => void;
}

const PostInfoContext = createContext<PostInfoContextProps | undefined>(
  undefined
);

export const PostInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState(() => sessionStorage.getItem("name") || "");
  const [location, setLocation] = useState(
    () => sessionStorage.getItem("location") || ""
  );
  const [logo, setLogo] = useState(() => sessionStorage.getItem("logo") || "");

  useEffect(() => {
    if (name !== "") {
      sessionStorage.setItem("name", name);
    }
    if (location !== "") {
      sessionStorage.setItem("location", location);
    }

    if (logo !== "") {
      sessionStorage.setItem("logo", logo);
    }
  }, [name, location, logo]);

  return (
    <PostInfoContext.Provider
      value={{ name, location, setName, setLocation, logo, setLogo }}
    >
      {children}
    </PostInfoContext.Provider>
  );
};

export const usePostInfo = () => {
  const context = useContext(PostInfoContext);
  if (!context) {
    throw new Error("usePostInfo must be used within a PostInfoProvider");
  }
  return context;
};

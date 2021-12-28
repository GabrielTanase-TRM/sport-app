import { NextApiRequest } from "next";
import { AppRootStore } from "../Redux/interface";

declare global {
  namespace React {
    interface FunctionComponent<P = {}> {
      getInitialProps?: (...args: any[]) => void;
    }
  }
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  disabled: boolean;
  isTrainer: boolean;
  deleted: boolean;
  avatar: string;
  testimonials: string;
}

export interface NextApiRequestAuthenticated extends NextApiRequest {
  decoded: {
    id: string;
    email: string;
  };
}

export interface PagePropsType {
  initialReduxState: AppRootStore;
}

export interface MyAppProps {
  Component: any;
  pageProps: PagePropsType;
  getInitialProps: (...args) => void;
}

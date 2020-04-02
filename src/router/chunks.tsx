import { lazy, LazyExoticComponent } from "react";

export interface ILinkItem {
    title: string;
    pathname: string;
    key: string;
    component: LazyExoticComponent<any>;
    childrens?: Array<ILinkItem>;
}

const Home = lazy(() =>
    import(/* webpackChunkName: "home" */ "@/views/home")
);
const About = lazy(() =>
    import(/* webpackChunkName: "about" */ "@/views/about")
);

export const linkList: Array<ILinkItem> = [
    {
        title: "home",
        key: "home",
        pathname: "/",
        component: Home
    },
    {
        title: "about",
        key: "about",
        pathname: "/about",
        component: About
    },
];

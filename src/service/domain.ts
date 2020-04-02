const env = process.env.APP_ENV;
const href = window.location.href;
const protol = window.location.protocol;

let domain = "";
let loginDomain = "";

const qaEnv = RegExp(/qa/).test(window.location.href);
const preEnv = /-preview/.test(href);

switch (env) {
    case "production":
        domain = "";
        if (preEnv) {
            loginDomain = protol + `//xx.com/`;
            domain = protol + `//xx.com/`;
        } else {
            loginDomain = protol + `//xx.com/`;
            domain = protol + `//xx.com/`;
        }
        break;
    case "staging":
        loginDomain = protol + `//xx.com/`;
        if (qaEnv) {
            domain = protol + `//xx.com/`;

        } else {
            domain = protol + `//xx.com/`;
        }
        break;
    case "development":
        loginDomain = protol + `//xx.com/`;
        domain = protol + `//xx.com/`;
        break;
    default:
        loginDomain = protol + `//xx.com/`;
        domain = protol + `//xx.com/`;
        break;
}

export { domain, loginDomain };

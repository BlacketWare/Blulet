const nonAllowedOrgs = [
    "M247",
    "CLOUDFLARENET",
    "24SHELLS",
    "24 SHELLS",
    "5ive",
    "Leaseweb",
    "G-Core",
    "Zenex",
    "Bluehost",
    "A2",
    "UK-2",
    "Performive",
    "Alibaba",
    "DigitalOcean",
    "xTom",
    "PACSWITCH",
    "FDCSERVERS",
    "WINDSCRIBE",
    "LATITUDE-SH"
];

const nonAllowedHosts = [
    "northghost.com",
    "google.com",
    "replit.com",
    "example.com",
    "megahoster.net",
    "hostinger.com",
    "hostgator.com",
    "hostwinds.com",
    "a2hosting.com",
    "lebcloud.com",
    "setaptr.net",
    "zenex5.com",
    "yandex.com",
    "m247.com",
    "wiredns.net",
    "brainstorm",
    "packet",
    "amazon",
    "microsoft"
];

const nonAllowedAs = [
    "208722",
    "9009",
    "46562",
    "4785",
    "55536",
    "30058",
    "55081",
    "397540",
    "396356"
];

const nonAllowedUserAgents = [
    "curl",
    "wget",
    "python",
    "python-requests",
    "python-urllib",
    "python",
    "axios",
    "node-fetch",
    "go-http-client",
    "java",
    "okhttp"
];

import axios from "axios";
import dns from "dns";

export default class VpnChecker {
    static async execute(ip: string) {
        if (ip.startsWith("34") || ip.startsWith("35") || ip.startsWith("104")) return false;

        try {
            const hostnames = await dns.promises.reverse(ip);
            if (!hostnames || hostnames.length === 0) return false;

            for (const hostname of hostnames) {
                if (nonAllowedHosts.includes(hostname)) return false;
            };

            const res = await axios.get(`https://api.findip.net/${ip}/?token=73233979f0c44efba4b4cab0ac362a89`);
            const data = res.data;

            if (data.traits["user_type"] === "hosting") return false;
            if (nonAllowedOrgs.includes(data.traits.organization)) return false;
            if (nonAllowedOrgs.includes(data.traits.isp)) return false;
            if (nonAllowedAs.includes(data.traits["autonomous_system_number"])) return false;
            if (nonAllowedUserAgents.includes(data.headers["user-agent"])) return false;

            return true;
        } catch {
            return true;
        };
    }
};
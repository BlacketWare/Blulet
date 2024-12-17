import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Blacklisted from "@components/Blacklisted";

export default function RootWrapper() {
    {/* @ts-ignore */ }
    const [blacklisted, setBlacklisted] = useState({ status: false, reason: "" });
    console.log("%cBlulet", "font-size: 50px; color: #000070; font-weight: bold; font-family: 'Titan One', sans-serif;");
    console.log("%cWarning", "font-size: 30px; color: #FF0000; font-weight: bold; font-family: 'Titan One', sans-serif;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or hack someone's account, it is a scam and will give them access to your account.", "font-size: 20px; color: #FF0000; font-weight: bold; font-family: 'Nunito', sans-serif;");

    useEffect(() => {
        // const keyAuth = new XMLHttpRequest();
        // keyAuth.open("POST", "/api/v2/auth/verify");
        // keyAuth.setRequestHeader("Content-Type", "application/json");
        // keyAuth.send(JSON.stringify({ accessKey: localStorage.getItem("key") }));
        // keyAuth.onload = () => {
        //     if (keyAuth.responseText !== "OK") window.location.href = "https://blulet.org";
        // };

        // const xhr = new XMLHttpRequest();
        // xhr.open("GET", "/api/v1/auth/status");
        // xhr.send();
        // xhr.onload = () => {
        //     if (xhr.responseText !== "OK") setBlacklisted({ status: true, reason: new DOMParser().parseFromString(xhr.responseText, "text/html").getElementsByClassName("containerText")[0]?.textContent || "" });
        // };
    }, []);

    if (blacklisted.status) return <Blacklisted reason={blacklisted.reason} />;
    return <div id="root-wrapper"><Outlet /></div>;
};
"use client";
import { useEffect } from 'react';

export default function IntercomProvider() {
    useEffect(() => {
        window.intercomSettings = { app_id: "YOUR_APP_ID" };
        (function () {
            const w = window as any;
            const ic = w.Intercom;
            if (typeof ic === "function") {
                ic("reattach_activator");
                ic("update", w.intercomSettings);
            } else {
                const d = document;
                const i: any = function (...args: any[]) { (i.q = i.q || []).push(args); };
                i.q = i.q || [];
                w.Intercom = i;
                const l = function () {
                    const s = d.createElement("script");
                    s.type = "text/javascript";
                    s.async = true;
                    s.src = "https://widget.intercom.io/widget/YOUR_APP_ID";
                    const x = d.getElementsByTagName("script")[0];
                    x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === "complete") {
                    l();
                } else if (w.attachEvent) {
                    w.attachEvent("onload", l);
                } else {
                    w.addEventListener("load", l, false);
                }
            }
        })();
    }, []);

    return null;
}

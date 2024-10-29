"use client";
import { useEffect } from 'react';

export default function IntercomProvider() {
    useEffect(() => {
        window.intercomSettings = { app_id: "desatz83" };
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

                const loadScript = () => {
                    const scriptElement = d.createElement("script");
                    scriptElement.type = "text/javascript";
                    scriptElement.async = true;
                    scriptElement.src = "https://widget.intercom.io/widget/YOUR_APP_ID";

                    const firstScript = d.getElementsByTagName("script")[0];
                    if (firstScript?.parentNode) {
                        firstScript.parentNode.insertBefore(scriptElement, firstScript);
                    }
                };

                if (document.readyState === "complete") {
                    loadScript();
                } else if (w.attachEvent) {
                    w.attachEvent("onload", loadScript);
                } else {
                    w.addEventListener("load", loadScript, false);
                }
            }
        })();
    }, []);

    return null;
}

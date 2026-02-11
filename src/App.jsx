import React, { useState } from "react";
import {
    Sun,
    Moon,
    FileText,
    Image,
    Video as VideoIcon,
    Presentation,
    Layout,
    ArrowUpRight,
} from "lucide-react";

const typeMeta = {
    pdf: { label: "PDF Document", color: "text-rose-500" },
    drawing: { label: "Architectural Drawing", color: "text-indigo-500" },
    gallery: { label: "Image Gallery", color: "text-emerald-500" },
    video: { label: "Video", color: "text-violet-500" },
    ppt: { label: "Presentation (PPTX)", color: "text-orange-500" },
};

const iconMap = {
    pdf: FileText,
    drawing: Layout,
    gallery: Image,
    video: VideoIcon,
    ppt: Presentation,
};

function resolveType(meta) {
    if (meta?.type) return meta.type;
    if (!meta?.link) return null;
    const url = meta.link.toLowerCase();
    if (url.endsWith(".pdf")) return "pdf";
    if (url.endsWith(".ppt") || url.endsWith(".pptx")) return "ppt";
    if (url.endsWith(".mp4") || url.includes("youtube")) return "video";
    if (url.endsWith(".jpg") || url.endsWith(".png")) return "gallery";
    return "pdf";
}

const data = {
    "Commune Overview": {
        Teaser: {
            link: "https://drive.google.com/file/d/1SKKwB8Ae20NooZ52KDII3afbJea91WgY/view?usp=drive_link",
            type: "ppt",
        },
        // Brochure: {
        //     link: null,
        //     type: "pdf"
        // },
        "Site Gallery": {
            link: "https://drive.google.com/file/d/1td-kIyBXrz8CI0sLEw0AsY59qfvhmUSJ/view?usp=drive_link",
            type: "gallery",
        },
        // Video: {
        //     link: null,
        //     type: "video"
        // },
    },

    "Site Layout": {
        "Integrated Site Plan AutoCAD": {
            link: "https://drive.google.com/file/d/1hK-c5AKGgivDTKxdZEexLyMs98auwYMu/view?usp=drive_link",
            type: "drawing"
        },
        "Overall Site Architecture PDF": {
            link: "https://drive.google.com/file/d/1lx9zZ_C3cOKXriXtimXmS8bNLlsD4A9J/view?usp=drive_link",
            type: "pdf"
        },
        "Overall Site Architecture AutoCAD": {
            link: "https://drive.google.com/file/d/1yGH8glDleL1OZkgnUhUhNuJfX2kY7PZe/view?usp=drive_link",
            type: "drawing"
        },
        "Phase 1 Detailing": {
            link: "https://drive.google.com/file/d/1QPIhuMPL_0OCUlhMjddB6C2ZbN3nxXQW/view?usp=drive_link",
            type: "pdf"
        },
    },

    "Layout Plans": {
        Villas: {
            link: "https://drive.google.com/file/d/1sPwWvphgrPJi7ohkQNKvoJ5L6lIafosa/view?usp=drive_link",
            type: "drawing",
        },
        "2 BHK": {
            link: "https://drive.google.com/file/d/1cU-uwIU3BhQEKJ7PyeeqlgQcWmqcdBDQ/view?usp=drive_link",
            type: "drawing",
        },
        "1 BHK": {
            link: "https://drive.google.com/file/d/1N1m2Q1mqRRGDYrOPQUqLMQbpw5zinNpM/view?usp=drive_link",
            type: "drawing",
        },
    },

    "Interior Design": {
        "Style 1": {
            link: "https://drive.google.com/file/d/1pkjkCwyD4CJvGlw8jAc4HBuIHagh2b1W/view?usp=drive_link",
            type: "ppt"
        },
        "Style 2": {
            link: "https://drive.google.com/file/d/1oNcArYGswiIL8_GJfK9SWa5qQmTB-02L/view?usp=drive_link",
            type: "ppt"
        },
    },

    "Landscaping Design": {
        "Villa Surroundings": {
            link: "https://drive.google.com/file/d/12nPiXLl3uUhhxvXPGJEjB11DjFDx1F-B/view?usp=drive_link",
            type: "ppt"
        },
        "Site Overview": {
            link: "https://drive.google.com/file/d/1k0uYC1Mp_7809dDKJmXDsKczLcObZZ_t/view?usp=drive_link",
            type: "ppt"
        },
    },

    "Booking Documents": {
        "Application Form": {
            link: "https://drive.google.com/file/d/1KRYic0syTdrB6-6tO2zHbYsITf5XmftO/view?usp=drive_link",
            type: "pdf"
        },
        "Agreement for Sale": {
            link: "https://drive.google.com/file/d/1UR8Iaj5wnTx1HEzrgVdcBHIgiOOc__wb/view?usp=drive_link",
            type: "pdf"
        },
        "ICICI Bank APF": {
            link: "https://drive.google.com/file/d/10m_xJNb8nW0iZq9gn_A3zV4cHwX8fClI/view?usp=drive_link",
            type: "pdf"
        },
        "PNB APF": {
            link: "https://drive.google.com/file/d/11gYk3GQgoOWCYf1QJcUbffO9SEn-HDj4/view?usp=drive_link",
            type: "pdf"
        },
        "Canara Bank APF": {
            link: "https://drive.google.com/file/d/19scXEDF7liMOZcFtyUhf9Gxo03RhsjGT/view?usp=drive_link",
            type: "pdf"
        }
    },

    "GFC Drawings": {
        Elevation: {
            link: "",
            type: "pdf"
        },
        Electrical: {
            link: "",
            type: "pdf"
        },
        Flooring: {
            link: "",
            type: "pdf"
        },
        "Floor Finishes": {
            link: "",
            type: "pdf"
        },
        "Furniture Layout": {
            link: "",
            type: "pdf"
        },
        "Interior Theme": {
            link: "",
            type: "pdf"
        }
    }
};

export default function IntranetUI() {
    const [activeTab, setActiveTab] = useState(Object.keys(data)[0]);
    const [theme, setTheme] = useState("light");
    const isDark = theme === "dark";

    return (
        <div
            className={`min-h-screen p-10 transition-colors duration-300 ${isDark
                ? "bg-neutral-950 text-neutral-100"
                : "bg-neutral-100 text-neutral-900"
                }`}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold">
                    Elevated Living Ventures · KP Commune
                </h1>

                {/* Desktop Toggle Switch */}
                <div
                    role="switch"
                    aria-checked={isDark}
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`hidden sm:block relative w-14 h-8 rounded-full cursor-pointer transition ${isDark ? "bg-neutral-700" : "bg-neutral-300"
                        }`}
                >
                    <div
                        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform ${isDark ? "translate-x-6" : "translate-x-0"
                            }`}
                    >
                        {isDark ? (
                            <Moon size={14} className="text-neutral-800" />
                        ) : (
                            <Sun size={14} className="text-neutal-800" />
                        )}
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`sm:hidden p-2 rounded-full border transition ${isDark
                        ? "bg-neutral-800 border-neutral-700"
                        : "bg-white border-neutral-300"
                        }`}
                >
                    {isDark ? (
                        <Moon size={18} className="text-neutral-200" />
                    ) : (
                        <Sun size={18} className="text-amber-500" />
                    )}
                </button>
            </div>

            <div className="flex gap-4 mb-10 flex-wrap">
                {Object.keys(data).map((tab) => {
                    const hasActiveDocs = Object.values(data[tab]).some(
                        (item) => item.link
                    );
                    const isActive = activeTab === tab;

                    return (
                        <button
                            key={tab}
                            disabled={!hasActiveDocs}
                            onClick={() => hasActiveDocs && setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm border transition-all duration-300 shadow-sm underline-offset-4 ${!hasActiveDocs
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:shadow-lg hover:underline"
                                }  ${isActive
                                    ? isDark
                                        ? "bg-neutral-100 text-neutral-900"
                                        : "bg-neutral-900 text-white"
                                    : isDark
                                        ? "bg-neutral-900 border-neutral-800"
                                        : "bg-white border-neutral-200"
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(data[activeTab]).map(([label, meta]) => {
                    const type = resolveType(meta);
                    const Icon = type ? iconMap[type] : null;
                    const metaInfo = type ? typeMeta[type] : null;
                    const isDisabled = !meta.link;

                    const Wrapper = isDisabled ? "div" : "a";
                    const wrapperProps = isDisabled
                        ? {}
                        : {
                            href: meta.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                        };

                    return (
                        <Wrapper
                            key={label}
                            {...wrapperProps}
                            title={metaInfo?.label}
                            className={`group p-6 rounded-2xl border shadow-md flex justify-between items-start transition ${isDisabled
                                ? "opacity-40 cursor-not-allowed"
                                : "cursor-pointer hover:shadow-lg"
                                } ${isDark
                                    ? "bg-neutral-900 border-neutral-800"
                                    : "bg-neutral-200 border-neutral-300"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {Icon && (
                                    <Icon
                                        size={20}
                                        className={`${metaInfo?.color} opacity-80`}
                                    />
                                )}
                                <h2 className="text-lg font-medium underline-offset-4 group-hover:underline">
                                    {label}
                                </h2>
                            </div>
                            {!isDisabled && (
                                <ArrowUpRight size={18} className="opacity-70" />
                            )}
                        </Wrapper>
                    );
                })}
            </div>
        </div>
    );
}

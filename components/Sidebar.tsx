"use client";
import {
  EllipsisVertical,
  History,
  MessageCirclePlus,
  PanelLeft,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { useState } from "react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      {/* ---------- 1.  ALWAYS-VISIBLE TOGGLE  ---------- */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        className="fixed left-4 top-4 cursor-pointer z-0 rounded-md bg-white p-2 shadow hover:shadow-md transition"
        aria-label="Toggle sidebar"
      >
        <PanelLeft className="h-6 w-6 text-black" />
      </button>

      {/* ---------- 2.  SLIDING SIDEBAR  ---------- */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-slate-50 shadow-2xl p-4
          transition-transform duration-300 z-10
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-8">
          {/* header */}
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <PanelLeft
              onClick={() => setSidebarOpen((o) => !o)}
              className="h-6 w-6 text-black cursor-pointer mb-2"
            />
          </div>

          {/* New Chat */}
          <div className="flex cursor-pointer items-center justify-center rounded-full bg-white shadow hover:shadow-lg transition-shadow">
            <MessageCirclePlus className="m-4 h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium">New Chat</span>
          </div>

          {/* History */}
          <div>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <span className="text-sm font-medium">Chat History</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex gap-4 cursor-pointer items-center justify-between rounded-md p-3 hover:bg-slate-100">
                <p className="truncate text-sm text-ellipsis whitespace-nowrap overflow-hidden">
                  Cv chat updated azertyujinfkjnfkdjvnjkfdnjjnjk
                </p>
                <EllipsisVertical className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

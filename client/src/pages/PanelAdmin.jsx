import React from "react";
import ChatIA from "../components/ChatIA";
import DesignAI from "../components/DesignAI";
import DashboardStatsIA from "../components/DashboardStatsIA";

export default function PanelAdmin() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Panel Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DesignAI />
        <DashboardStatsIA />
      </div>
      <ChatIA />
    </div>
  );
}

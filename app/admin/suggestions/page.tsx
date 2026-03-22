"use client";

import React from "react";
import { MessageSquare, Calendar, User } from "lucide-react";

export default function SuggestionsPage() {
    // Mock data for the last 20 suggestions
    const suggestions = [
        { id: "SUG-020", name: "Ramesh Sharma", date: "2023-11-20", text: "Please organize a weekly farmers market in the main square." },
        { id: "SUG-019", name: "Anonymous", date: "2023-11-19", text: "We need more dustbins near the primary school area." },
        { id: "SUG-018", name: "Sita Devi", date: "2023-11-18", text: "Consider installing CCTV cameras at the village entrance for security." },
        { id: "SUG-017", name: "Vijay Kumar", date: "2023-11-17", text: "The village library needs more books for competitive exams." },
        { id: "SUG-016", name: "Anita Patil", date: "2023-11-16", text: "Can we have a dedicated women's helpline number displayed at the Panchayat?" },
        { id: "SUG-015", name: "Anonymous", date: "2023-11-15", text: "Repair the potholes on the road connecting to the highway." },
        { id: "SUG-014", name: "Mohan Lal", date: "2023-11-14", text: "Start a monthly newsletter to keep everyone informed about new schemes." },
        { id: "SUG-013", name: "Kiran R", date: "2023-11-13", text: "The public park's swings are broken and need maintenance." },
        { id: "SUG-012", name: "Priya Singh", date: "2023-11-12", text: "Please conduct a health camp for seniors next month." },
        { id: "SUG-011", name: "Anonymous", date: "2023-11-11", text: "Street dogs are becoming an issue; maybe coordinate with an animal shelter?" },
        { id: "SUG-010", name: "Rajesh V", date: "2023-11-10", text: "Open a computer training center for the village youth." },
        { id: "SUG-009", name: "Meera D", date: "2023-11-09", text: "Improve the drainage system near Ward 3 before the monsoons." },
        { id: "SUG-008", name: "Suresh P", date: "2023-11-08", text: "Hold a village gathering to discuss the new property tax rules." },
        { id: "SUG-007", name: "Anonymous", date: "2023-11-07", text: "Plant more trees along the main roads." },
        { id: "SUG-006", name: "Alok N", date: "2023-11-06", text: "Provide a digital payment option for the water tax directly from this portal." },
        { id: "SUG-005", name: "Anonymous", date: "2023-11-05", text: "Organize a sports tournament for children during the summer holidays." },
        { id: "SUG-004", name: "Gita Patel", date: "2023-11-04", text: "Ensure the local dispensary has antivenom stocked." },
        { id: "SUG-003", name: "Rahul Verma", date: "2023-11-03", text: "The street light in front of my house flickers constantly." },
        { id: "SUG-002", name: "Smita Singh", date: "2023-11-02", text: "Set up a suggestion box physically at the Panchayat office as well." },
        { id: "SUG-001", name: "Javed Ali", date: "2023-11-01", text: "Requesting a bus stop shed near the highway crossing." },
    ];

    return (
        <>
            <section className="bg-white p-6 border-l-4 border-purple-600 shadow-sm flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                        <MessageSquare className="text-purple-600" size={24} />
                        Citizen Suggestions
                    </h1>
                    <p className="text-sm text-gray-700">Review the latest 20 suggestions and feedback submitted by the village residents.</p>
                </div>
            </section>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h2 className="font-bold text-gray-800">Recent Submissions</h2>
                    <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full border border-purple-200">
                        {suggestions.length} Entries
                    </span>
                </div>

                <div className="divide-y divide-gray-100">
                    {suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="p-5 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1 font-semibold text-[#2c5577]">
                                        <User size={14} />
                                        {suggestion.name}
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-1 text-xs">
                                        <Calendar size={13} className="text-gray-400" />
                                        {suggestion.date}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">
                                    {suggestion.id}
                                </span>
                            </div>
                            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pl-1 border-l-2 border-purple-200 mt-2 p-2 bg-purple-50/30 rounded-r-md">
                                {suggestion.text}
                            </p>
                        </div>
                    ))}
                    {suggestions.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No recent suggestions to display.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

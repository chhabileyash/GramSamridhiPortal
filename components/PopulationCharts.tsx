"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend } from
"recharts";
import { Users, BookOpen, Layers } from "lucide-react";

interface PopulationChartsProps {
  population: any;
}

export default function PopulationCharts({
  population
}: PopulationChartsProps) {

  const extractPercent = (val: any) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val.replace("%", "")) || 0;
    return 0;
  };

  const femalePercent = extractPercent(population["Female Population %"]);
  const malePercent = Math.max(0, 100 - femalePercent);

  const literacyRate = extractPercent(population["Total Literacy rate %"]);
  const illiterateRate = Math.max(0, 100 - literacyRate);

  const scPercent = extractPercent(population["Scheduled Caste Population %"]);
  const stPercent = extractPercent(population["Scheduled Tribes Population %"]);

  const generalPercent = Math.max(0, 100 - (scPercent + stPercent));

  const genderData = [
  {
    name: "Male",
    value: malePercent,
    fill: "#374151"
  },
  { name: "Female", value: femalePercent, fill: "#f58320" }];


  const literacyData = [
  { name: "Literate", value: literacyRate, fill: "#f58320" },
  { name: "Illiterate", value: illiterateRate, fill: "#cbd5e1" }];


  const categoryData = [
  { name: "General", value: 2100, fill: "#374151" },
  { name: "SC", value: 850, fill: "#f58320" },
  { name: "ST", value: 500, fill: "#64748b" }];



  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#082b57] pt-6">
        {payload.map((entry: any, index: number) =>
        <li key={`item-${index}`} className="flex items-center gap-2">
            <span
            className="block h-3 w-3"
            style={{ backgroundColor: entry.color }} />
          
            {entry.value}{" "}
            <span className="text-green-950">
              ({entry.payload.value.toFixed(1)}%)
            </span>
          </li>
        )}
      </ul>);

  };

  return (
    <section className="bg-green-50 py-16 animate-[fadeUp_900ms_ease-out] [animation-fill-mode:both]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 w-fit border-b-4 border-[#f58320] pb-2">
          <h2 className="text-3xl font-black uppercase text-green-950">
            Demographic Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {}
          <div className="flex flex-col items-center border border-green-100 bg-white p-8 shadow-sm">
            <h3 className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-950">
              <Users className="size-4 text-[#f58320]" /> Gender Distribution
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value">
                    
                    {genderData.map((entry, index) =>
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      stroke="none" />

                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) =>
                    `${(typeof value === "number" ? value : 0).toFixed(1)}%`
                    }
                    contentStyle={{
                      backgroundColor: "#374151",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                      borderRadius: "4px"
                    }}
                    itemStyle={{ color: "#fff" }} />
                  
                  <Legend content={<CustomLegend />} verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {}
          <div className="flex flex-col items-center border border-green-100 bg-white p-8 shadow-sm">
            <h3 className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-950">
              <BookOpen className="size-4 text-[#f58320]" /> Literacy Rate
            </h3>
            <div className="relative h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={literacyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}>
                    
                    {literacyData.map((entry, index) =>
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      stroke="none" />

                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) =>
                    `${(typeof value === "number" ? value : 0).toFixed(1)}%`
                    }
                    contentStyle={{
                      backgroundColor: "#374151",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                      borderRadius: "4px"
                    }}
                    itemStyle={{ color: "#fff" }} />
                  
                  <Legend content={<CustomLegend />} verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {}
          <div className="flex flex-col items-center border border-green-100 bg-white p-8 shadow-sm">
            <h3 className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#082b57]">
              <Layers className="size-4 text-[#f58320]" /> Population Categories
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  barSize={40}>
                  
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#64748b", fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10} />
                  
                  <YAxis
                    tick={{ fontSize: 10, fill: "#cbd5e1", fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false} />
                  
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#374151",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                      borderRadius: "4px"
                    }}
                    itemStyle={{ color: "#fff" }} />
                  
                  <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                    {" "}
                    {categoryData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-[#1a365d]">
              Based on local administrative records
            </p>
          </div>
        </div>
      </div>
    </section>);

}
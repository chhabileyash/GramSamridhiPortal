"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import data from "../app/data.json";

interface District {
  district: string;
  subDistricts: SubDistrict[];
}

interface SubDistrict {
  subDistrict: string;
  villages: string[];
}

export default function DistrictSelector() {
  const router = useRouter();
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [village, setVillage] = useState("");

  const districts: District[] = data.districts || [];

  const selectedDistrictData = districts.find(
    (d: District) => d.district === district,
  );
  const talukas: SubDistrict[] = selectedDistrictData
    ? selectedDistrictData.subDistricts
    : [];

  const selectedTalukaData = talukas.find(
    (t: SubDistrict) => t.subDistrict === taluka,
  );
  const villages: string[] = selectedTalukaData
    ? selectedTalukaData.villages
    : [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <div>
        <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase">
          District Selection
        </label>
        <select
          className="h-12 w-full border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 focus:border-[#002147] focus:ring-1 focus:ring-[#002147]"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setTaluka("");
            setVillage("");
          }}
        >
          <option value="" disabled className="text-slate-400">
            -- Select District --
          </option>
          {districts.map((d: District) => (
            <option key={d.district} value={d.district}>
              {d.district}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase">
          Taluka Selection
        </label>
        <select
          className="h-12 w-full border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 focus:border-[#002147] focus:ring-1 focus:ring-[#002147] disabled:cursor-not-allowed disabled:opacity-50"
          value={taluka}
          onChange={(e) => {
            setTaluka(e.target.value);
            setVillage("");
          }}
          disabled={!district}
        >
          <option value="" disabled className="text-slate-400">
            -- Select Taluka --
          </option>
          {talukas.map((t: SubDistrict) => (
            <option key={t.subDistrict} value={t.subDistrict}>
              {t.subDistrict}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase">
          Village Selection
        </label>
        <select
          className="h-12 w-full border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 focus:border-[#002147] focus:ring-1 focus:ring-[#002147] disabled:cursor-not-allowed disabled:opacity-50"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          disabled={!taluka}
        >
          <option value="" disabled className="text-slate-400">
            -- Select Village --
          </option>
          {villages.map((v: string) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end sm:col-span-2 lg:col-span-1">
        <button
          className="group flex h-12 w-full items-center justify-center gap-2 bg-[#002147] text-sm font-bold text-white uppercase transition-all duration-300 hover:bg-slate-800 hover:shadow-md"
          onClick={() => {
            if (district && taluka && village) {
              const formattedDistrict = encodeURIComponent(district);
              const formattedTaluka = encodeURIComponent(taluka);
              const formattedVillage = encodeURIComponent(village);
              router.push(
                `/villages/${formattedDistrict}/${formattedTaluka}/${formattedVillage}`,
              );
            } else {
              alert("Please select District, Taluka, and Village.");
            }
          }}
        >
          <Search className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:text-[#e67e22]" />
          Find Village
        </button>
      </div>
    </div>
  );
}

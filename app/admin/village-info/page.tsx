"use client";

import React, { useState, useEffect } from "react";
import { Save, Map, Users, Phone, Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function VillageInfoPage() {
  const { user, isLoaded } = useUser();

  const [formData, setFormData] = useState({
    village: {
      name: "",
      location: {
        taluka: "",
        district: "",
        state: "Maharashtra"
      },
      about: "Enter a brief overview about your village here...",
    },
    stats: {
      population: {
        total: 0,
        male: 0,
        female: 0
      },
      distribution: {
        children: 0,
        youth: 0,
        adults: 0,
        seniors: 0
      }
    },
    contact: {
      address: "",
      phone: "",
      email: ""
    }
  });

  type ImageItem = { file: File | null; url: string; title: string; type: string; isPrimary: boolean };
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Load village metadata from Clerk user on mount
  useEffect(() => {
    if (isLoaded && user && user.unsafeMetadata) {
      const meta = user.unsafeMetadata as any;
      const name = meta.village || "";
      const taluka = meta.taluka || "";
      const district = meta.district || "";
      const villageId = meta.village_id;

      const setMetaDefaults = () => {
        setFormData(prev => ({
          ...prev,
          village: { ...prev.village, name, location: { taluka, district, state: "Maharashtra" } }
        }));
      };

      if (!villageId) {
        setMetaDefaults();
        return;
      }

      // Fetch existing DB data
      const loadDB = async () => {
        try {
          const res = await fetch(`/api/village-info?villageId=${villageId}`);
          const json = await res.json();
          if (json.data) {
            const d = json.data;
            setFormData({
              village: { name, location: { taluka, district, state: "Maharashtra" }, about: d.about || "" },
              stats: {
                population: { total: d.totalPopulation || 0, male: d.malePopulation || 0, female: d.femalePopulation || 0 },
                distribution: { children: d.childrenCount || 0, youth: d.youthCount || 0, adults: d.adultsCount || 0, seniors: d.seniorsCount || 0 }
              },
              contact: { address: d.address || "", phone: d.phone || "", email: d.email || "" }
            });
            if (d.images && Array.isArray(d.images)) {
              setImages(d.images.map((img: any) => ({
                file: null,
                url: img.url,
                title: img.title,
                type: img.type,
                isPrimary: img.isPrimary
              })));
            }
          } else {
            setMetaDefaults();
          }
        } catch (e) {
          console.error(e);
          setMetaDefaults();
        }
      };

      loadDB();
    }
  }, [isLoaded, user]);

  const handleVillageChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, village: { ...prev.village, [field]: value } }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, village: { ...prev.village, location: { ...prev.village.location, [field]: value } } }));
  };

  const handleStatsPopChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, stats: { ...prev.stats, population: { ...prev.stats.population, [field]: Number(value) || 0 } } }));
  };

  const handleStatsDistChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, stats: { ...prev.stats, distribution: { ...prev.stats.distribution, [field]: Number(value) || 0 } } }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };

  // Image Multi-Upload Management
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const newImages = selectedFiles.map((file, index) => ({
        file: file,
        url: URL.createObjectURL(file), // Generate local preview URL
        title: file.name.split('.')[0], // Use filename as default title
        type: "gallery",
        isPrimary: images.length === 0 && index === 0 // First ever image is primary by default
      }));
      setImages(prev => [...prev, ...newImages]);
    }
    // Reset file input so the exact same files can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newArr = [...prev];
      // Revoke the object URL to avoid memory leaks
      if (newArr[index].url.startsWith("blob:")) {
        URL.revokeObjectURL(newArr[index].url);
      }
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const updateImage = (index: number, field: string, value: string | boolean) => {
    setImages(prev => {
      const newImages = [...prev];

      // If setting this image as primary, unset all others
      if (field === 'isPrimary' && value === true) {
        newImages.forEach(img => img.isPrimary = false);
      }

      newImages[index] = { ...newImages[index], [field]: value };
      return newImages;
    });
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const meta = user?.unsafeMetadata as any;
      const villageId = meta?.village_id;
      if (!villageId) {
        alert("Error: No village ID linked to this account.");
        return;
      }

      const data = new FormData();
      data.append("payload", JSON.stringify(formData));
      data.append("villageId", villageId);

      images.forEach((img, index) => {
        if (img.file) data.append(`image_${index}`, img.file);
        data.append(`imageMetadata_${index}`, JSON.stringify({
          title: img.title,
          type: img.type,
          isPrimary: img.isPrimary,
          url: img.file ? "" : img.url
        }));
      });

      const res = await fetch("/api/village-info", {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        const js = await res.json();
        throw new Error(js.error || "Failed to save");
      }

      alert("Village Information and uploaded images saved successfully!");
    } catch (err: any) {
      console.error("Save Error:", err);
      alert("Failed to save: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-indigo-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Village Configuration Data</h1>
          <p className="text-sm text-gray-700">Update the comprehensive details, demographics, and assets of your village.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="text-black px-6 py-2.5 rounded-md font-bold transition-colors flex items-center justify-center gap-2 min-w-[160px] shadow-md"
        >
          {isSaving ? (
            <span className="flex items-center gap-2 animate-pulse">Saving...</span>
          ) : (
            <>
              <Save size={18} />
              <span>Save Master Data</span>
            </>
          )}
        </button>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Forms */}
        <div className="xl:col-span-8 space-y-6">

          {/* Detailed Info Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center gap-2">
              <Map className="text-indigo-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-900">1. Core Information & Geography</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
                    Village Name <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">Auto-synced</span>
                  </label>
                  <input type="text" value={formData.village.name} onChange={(e) => handleVillageChange("name", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">State</label>
                  <input type="text" value={formData.village.location.state} onChange={(e) => handleLocationChange("state", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
                    District <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">Auto-synced</span>
                  </label>
                  <input type="text" value={formData.village.location.district} onChange={(e) => handleLocationChange("district", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
                    Taluka <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">Auto-synced</span>
                  </label>
                  <input type="text" value={formData.village.location.taluka} onChange={(e) => handleLocationChange("taluka", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50" readOnly />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">About Summary (Displayed on public portal)</label>
                <textarea
                  value={formData.village.about}
                  onChange={(e) => handleVillageChange("about", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Demographics & Statistics */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center gap-2">
              <Users className="text-green-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-900">2. Real-Time Demographics & Stats</h2>
            </div>
            <div className="p-6 space-y-6">

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">A. Total Population Census</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Total Headcount</label>
                    <input type="number" value={formData.stats.population.total} onChange={(e) => handleStatsPopChange("total", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm font-bold text-gray-900 bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Male</label>
                    <input type="number" value={formData.stats.population.male} onChange={(e) => handleStatsPopChange("male", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Female</label>
                    <input type="number" value={formData.stats.population.female} onChange={(e) => handleStatsPopChange("female", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">B. Age Distribution</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Children</label>
                    <input type="number" value={formData.stats.distribution.children} onChange={(e) => handleStatsDistChange("children", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Youth</label>
                    <input type="number" value={formData.stats.distribution.youth} onChange={(e) => handleStatsDistChange("youth", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Adults</label>
                    <input type="number" value={formData.stats.distribution.adults} onChange={(e) => handleStatsDistChange("adults", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Seniors</label>
                    <input type="number" value={formData.stats.distribution.seniors} onChange={(e) => handleStatsDistChange("seniors", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column - Images & Contact */}
        <div className="xl:col-span-4 space-y-6">

          {/* Contact Details */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center gap-2">
              <Phone className="text-[#FF9933] w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-900">3. Support Contact</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Panchayat Address</label>
                <textarea rows={2} value={formData.contact.address} onChange={(e) => handleContactChange("address", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#FF9933]"></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Office Phone</label>
                <input type="text" value={formData.contact.phone} onChange={(e) => handleContactChange("phone", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#FF9933]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Official Email</label>
                <input type="email" value={formData.contact.email} onChange={(e) => handleContactChange("email", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#FF9933]" />
              </div>
            </div>
          </div>

          {/* Media / Images Gallery */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden max-h-[800px]">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="text-blue-500 w-5 h-5" />
                <h2 className="text-lg font-bold text-gray-900">4. Display Images</h2>
              </div>
              <label className="border-2 border-blue-600 text-black hover:bg-blue-700  px-3 py-1.5 rounded text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm">
                <Upload size={16} />
                <span>Upload</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto bg-gray-50 flex-1">
              {images.map((img, index) => (
                <div key={index} className={`bg-white p-4 border rounded-md shadow-sm relative ${img.isPrimary ? 'border-blue-400 ring-1 ring-blue-400' : 'border-gray-200'}`}>

                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                      Image {index + 1}
                      <span className="truncate max-w-[120px] inline-block lowercase text-[10px] text-gray-400 font-normal">
                        ({img.file?.name})
                      </span>
                    </span>
                    <button onClick={() => removeImage(index)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex gap-4 items-start pb-1">
                    {/* Image Preview Block */}
                    <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                      <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1 text-left">Title</label>
                        <input type="text" placeholder="Caption" value={img.title} onChange={(e) => updateImage(index, "title", e.target.value)} className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1 text-left">Theme Type</label>
                        <select value={img.type} onChange={(e) => updateImage(index, "type", e.target.value)} className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer">
                          <option value="banner">Banner Image</option>
                          <option value="gallery">Gallery Photo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={img.isPrimary || false}
                        onChange={(e) => updateImage(index, "isPrimary", e.target.checked)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300 cursor-pointer"
                      />
                      <span className={`text-xs font-bold transition-colors ${img.isPrimary ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {img.isPrimary ? '★ Primary Display Info' : 'Set as Primary Cover'}
                      </span>
                    </label>
                  </div>
                </div>
              ))}

              {images.length === 0 && (
                <div className="text-center py-10 bg-white border border-dashed border-gray-300 rounded-lg">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-gray-500 text-sm font-medium">No images uploaded.</p>
                  <p className="text-xs text-gray-400 mt-1">Click the Upload button to select multiple images.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

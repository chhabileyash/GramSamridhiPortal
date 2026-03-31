"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  User,
  MapPin,
  Calendar,
  UploadCloud,
  XCircle,
} from "lucide-react";

// --- Types & Interfaces ---

export type CertificateType = "Birth" | "Death" | "Marriage";

export interface Address {
  country: string;
  state: string;
  district: string;
  city: string;
  addressLine: string;
}

export interface Person {
  fullName: string;
  gender: string;
  dobOrAge: string;
  nationality: string;
  aadhaar: string;
  occupation: string;
  address: Address;
}

export interface UnifiedFormData {
  certificateType: CertificateType;
  application: {
    registrationDate: string;
    place: Address;
  };
  applicant: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  event: {
    date: string;
    time: string;
    placeDetail: string;
    eventTypeData: Record<string, string>;
  };
  persons: {
    primary: Person;
    related: Person[];
    witnesses: Person[];
  };
  documents: File[];
}

// --- Initial States ---

const emptyAddress: Address = {
  country: "India",
  state: "",
  district: "",
  city: "",
  addressLine: "",
};

const emptyPerson: Person = {
  fullName: "",
  gender: "",
  dobOrAge: "",
  nationality: "Indian",
  aadhaar: "",
  occupation: "",
  address: { ...emptyAddress },
};

const initialFormData: UnifiedFormData = {
  certificateType: "Birth",
  application: {
    registrationDate: "",
    place: { ...emptyAddress },
  },
  applicant: {
    fullName: "",
    phone: "",
    email: "",
    address: "",
  },
  event: {
    date: "",
    time: "",
    placeDetail: "",
    eventTypeData: {},
  },
  persons: {
    primary: { ...emptyPerson },
    related: [
      { ...emptyPerson, gender: "Male" },
      { ...emptyPerson, gender: "Female" },
    ],
    witnesses: [],
  },
  documents: [],
};

// --- Validation Logic ---

const validateForm = (data: UnifiedFormData) => {
  let isValid = true;
  const errors: Record<string, string> = {};

  const setErr = (path: string, msg: string) => {
    isValid = false;
    errors[path] = msg;
  };

  const isBlank = (str: string) => !str || str.trim() === "";

  if (isBlank(data.applicant.fullName))
    setErr("applicant.fullName", "Applicant full name is required");
  if (!/^\d{10}$/.test(data.applicant.phone))
    setErr("applicant.phone", "Phone must be exactly 10 digits");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.applicant.email))
    setErr("applicant.email", "Invalid email address");

  if (isBlank(data.event.date)) setErr("event.date", "Event date is required");

  const validatePerson = (
    person: Person,
    pathPrefix: string,
    isRequired: boolean = true
  ) => {
    if (!isRequired && isBlank(person.fullName)) return;

    if (isBlank(person.fullName))
      setErr(`${pathPrefix}.fullName`, "Full name is required");
    if (isBlank(person.gender)) setErr(`${pathPrefix}.gender`, "Gender is required");

    if (person.aadhaar && !/^\d{12}$/.test(person.aadhaar)) {
      setErr(`${pathPrefix}.aadhaar`, "Aadhaar must be exactly 12 digits");
    }

    if (person.dobOrAge) {
      if (
        new Date(person.dobOrAge) >= new Date(data.application.registrationDate)
      ) {
        setErr(`${pathPrefix}.dobOrAge`, "DOB must be before registration date");
      }
      if (data.certificateType === "Death") {
        if (
          data.event.date &&
          new Date(data.event.date) < new Date(person.dobOrAge)
        ) {
          setErr("event.date", "Death date cannot be before Date of Birth");
        }
      }
    } else {
      setErr(`${pathPrefix}.dobOrAge`, "DOB/Age is required");
    }
  };

  if (data.certificateType === "Birth") {
    validatePerson(data.persons.primary, "persons.primary");
    if (data.persons.related.length < 2) {
      setErr("persons.related", "Both parents' details are required for Birth");
    } else {
      validatePerson(data.persons.related[0], "persons.related.0");
      validatePerson(data.persons.related[1], "persons.related.1");
    }

    if (isBlank(data.event.eventTypeData.hospitalOrHome)) {
      setErr(
        "event.eventTypeData.hospitalOrHome",
        "Specify if born in hospital or home"
      );
    }
  }

  if (data.certificateType === "Death") {
    validatePerson(data.persons.primary, "persons.primary");
    if (isBlank(data.event.eventTypeData.causeOfDeath)) {
      setErr("event.eventTypeData.causeOfDeath", "Cause of death is required");
    }
  }

  if (data.certificateType === "Marriage") {
    validatePerson(data.persons.primary, "persons.primary");
    if (data.persons.related.length < 1) {
      setErr("persons.related.0", "Bride details required");
    } else {
      validatePerson(data.persons.related[0], "persons.related.0");
    }

    if (!data.persons.witnesses || data.persons.witnesses.length < 2) {
      setErr("persons.witnesses", "Minimum 2 witnesses required for marriage");
    } else {
      data.persons.witnesses.forEach((w, i) =>
        validatePerson(w, `persons.witnesses.${i}`)
      );
    }
  }

  return { isValid, errors };
};

// --- Shared Tailwind Classes ---

const inputClass =
  "w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-400 rounded-sm";
const labelClass = "text-[10px] font-bold text-slate-400 uppercase";
const containerClass = "bg-white border border-gray-300 shadow-sm p-6 rounded-sm mb-6";
const dividerClass = "flex items-center gap-3 mb-6 pb-4 border-b border-slate-100";
const iconWrapClass = "bg-[#FF9933]/10 text-[#FF9933] p-2 rounded-sm";
const sectionTitleClass = "text-sm font-bold uppercase tracking-wider text-slate-700";

// --- Subcomponents ---

const ErrorMsg = ({
  errors,
  path,
}: {
  errors: Record<string, string>;
  path: string;
}) => {
  return errors[path] ? (
    <span className="text-red-500 text-xs mt-1 block font-medium">
      {errors[path]}
    </span>
  ) : null;
};

const AddressForm = ({ address, pathPrefix, onChange, errors }: any) => {
  const handleChange = (field: keyof Address, val: string) => {
    const updated = { ...address, [field]: val };
    onChange(updated);
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-slate-400" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Address Details
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <label className={labelClass}>Country</label>
          <input
            className={inputClass}
            value={address.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>State</label>
          <input
            className={inputClass}
            value={address.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>District</label>
          <input
            className={inputClass}
            value={address.district}
            onChange={(e) => handleChange("district", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>City / Village</label>
          <input
            className={inputClass}
            value={address.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-4 space-y-1">
          <label className={labelClass}>Address Line</label>
          <input
            className={inputClass}
            value={address.addressLine}
            onChange={(e) => handleChange("addressLine", e.target.value)}
            placeholder="Complete street address"
          />
        </div>
      </div>
    </div>
  );
};

const PersonForm = ({ title, person, pathPrefix, onChange, errors }: any) => {
  const handleField = (field: keyof Person, val: string) => {
    onChange({ ...person, [field]: val });
  };

  const handleAddress = (newAddr: Address) => {
    onChange({ ...person, address: newAddr });
  };

  return (
    <div className={containerClass}>
      <div className={dividerClass}>
        <div className={iconWrapClass}>
          <User className="w-5 h-5" />
        </div>
        <h3 className={sectionTitleClass}>{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className={labelClass}>Full Name *</label>
          <input
            className={inputClass}
            value={person.fullName}
            onChange={(e) => handleField("fullName", e.target.value)}
          />
          <ErrorMsg errors={errors} path={`${pathPrefix}.fullName`} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Gender *</label>
          <select
            className={inputClass}
            value={person.gender}
            onChange={(e) => handleField("gender", e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <ErrorMsg errors={errors} path={`${pathPrefix}.gender`} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Date of Birth / Age *</label>
          <input
            type="date"
            className={inputClass}
            value={person.dobOrAge}
            onChange={(e) => handleField("dobOrAge", e.target.value)}
          />
          <ErrorMsg errors={errors} path={`${pathPrefix}.dobOrAge`} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Nationality</label>
          <input
            className={inputClass}
            value={person.nationality}
            onChange={(e) => handleField("nationality", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Aadhaar Number</label>
          <input
            className={inputClass}
            value={person.aadhaar}
            onChange={(e) => handleField("aadhaar", e.target.value)}
            placeholder="12-digit number"
          />
          <ErrorMsg errors={errors} path={`${pathPrefix}.aadhaar`} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Occupation</label>
          <input
            className={inputClass}
            value={person.occupation}
            onChange={(e) => handleField("occupation", e.target.value)}
          />
        </div>
      </div>
      <AddressForm
        address={person.address}
        pathPrefix={`${pathPrefix}.address`}
        onChange={handleAddress}
        errors={errors}
      />
    </div>
  );
};

const DocumentUpload = ({ onChange }: any) => {
  return (
    <div className="bg-slate-50 border-2 border-dashed border-gray-300 shadow-sm p-8 rounded-sm mb-6 text-center">
      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-3" />
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
        Supporting Documents
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Upload ID proofs, residential proofs, doctor certificates, etc.
      </p>
      <input
        type="file"
        multiple
        className="block w-full max-w-sm mx-auto text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-bold file:bg-[#FF9933]/10 file:text-[#FF9933] hover:file:bg-[#FF9933]/20 transition cursor-pointer"
        onChange={(e) => {
          if (e.target.files) {
            onChange(Array.from(e.target.files));
          }
        }}
      />
    </div>
  );
};

// --- Main Form Component ---

export default function CivilRegistrationForm() {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState<UnifiedFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    type: string;
  } | null>(null);

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      application: {
        ...prev.application,
        registrationDate: new Date().toISOString().split("T")[0],
      },
    }));
  }, []);

  const handleTypeChange = (type: CertificateType) => {
    setFormData({
      ...initialFormData,
      certificateType: type,
      application: {
        ...initialFormData.application,
        registrationDate: new Date().toISOString().split("T")[0],
      },
      persons: {
        primary: type === "Marriage" ? { ...emptyPerson, gender: "Male" } : { ...emptyPerson },
        related:
          type === "Birth"
            ? [
                { ...emptyPerson, gender: "Male" },
                { ...emptyPerson, gender: "Female" },
              ]
            : type === "Marriage"
            ? [{ ...emptyPerson, gender: "Female" }]
            : [],
        witnesses:
          type === "Marriage" ? [{ ...emptyPerson }, { ...emptyPerson }] : [],
      },
    });
    setErrors({});
  };

  const updateNested = (path: string[], value: any) => {
    setFormData((prev: any) => {
      const copy = { ...prev };
      let curr = copy;
      for (let i = 0; i < path.length - 1; i++) {
        curr[path[i]] = Array.isArray(curr[path[i]])
          ? [...curr[path[i]]]
          : { ...curr[path[i]] };
        curr = curr[path[i]];
      }
      curr[path[path.length - 1]] = value;
      return copy;
    });
  };

  const handleApplicant = (
    field: keyof UnifiedFormData["applicant"],
    val: string
  ) => updateNested(["applicant", field], val);
  const handleEvent = (field: keyof UnifiedFormData["event"], val: string) =>
    updateNested(["event", field], val);
  const handleEventData = (field: string, val: string) =>
    updateNested(["event", "eventTypeData", field], val);

  const addWitness = () => {
    setFormData((p) => ({
      ...p,
      persons: { ...p.persons, witnesses: [...p.persons.witnesses, { ...emptyPerson }] },
    }));
  };
  const removeWitness = (idx: number) => {
    setFormData((p) => ({
      ...p,
      persons: {
        ...p.persons,
        witnesses: p.persons.witnesses.filter((_, i) => i !== idx),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const meta = user?.unsafeMetadata as any;
      const payload = {
        formData: formData,
        villageId: meta?.village_id || null,
      };

      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let referenceId = `REF-${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`;
      if (res.ok) {
        const body = await res.json();
        if (body.data?.certificateId) {
          referenceId = body.data.certificateId;
        }
      } else if (res.status !== 404) {
        throw new Error("Failed to submit");
      }

      setSubmittedData({
        referenceId,
        type: formData.certificateType,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });

      handleTypeChange(formData.certificateType);
    } catch (err: any) {
      alert(err.message || "An error occurred connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Civil <span className="text-[#ab7845]">Registration</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Apply for a Birth, Death, or Marriage certificate.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {["Birth", "Death", "Marriage"].map((type) => (
          <button
            key={type}
            type="button"
            className={`font-bold py-2.5 px-6 rounded-sm text-sm transition-colors ${
              formData.certificateType === type
                ? "bg-[#FF9933] text-white shadow-sm ring-2 ring-offset-2 ring-[#FF9933]"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
            onClick={() => handleTypeChange(type as CertificateType)}
          >
            {type} Application
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Applicant Block */}
        <div className={containerClass}>
          <div className={dividerClass}>
            <div className={iconWrapClass}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className={sectionTitleClass}>
              Section 1: Applicant / Informant Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Full Name *</label>
              <input
                className={inputClass}
                value={formData.applicant.fullName}
                onChange={(e) => handleApplicant("fullName", e.target.value)}
              />
              <ErrorMsg errors={errors} path="applicant.fullName" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                className={inputClass}
                value={formData.applicant.phone}
                onChange={(e) => handleApplicant("phone", e.target.value)}
                placeholder="10-digit mobile"
              />
              <ErrorMsg errors={errors} path="applicant.phone" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                className={inputClass}
                value={formData.applicant.email}
                onChange={(e) => handleApplicant("email", e.target.value)}
              />
              <ErrorMsg errors={errors} path="applicant.email" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Residential Address</label>
              <input
                className={inputClass}
                value={formData.applicant.address}
                onChange={(e) => handleApplicant("address", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Event Details */}
        <div className={containerClass}>
          <div className={dividerClass}>
            <div className={iconWrapClass}>
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className={sectionTitleClass}>
              Section 2: Event Details ({formData.certificateType})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Event Date *</label>
              <input
                type="date"
                className={inputClass}
                value={formData.event.date}
                onChange={(e) => handleEvent("date", e.target.value)}
              />
              <ErrorMsg errors={errors} path="event.date" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Event Time</label>
              <input
                type="time"
                className={inputClass}
                value={formData.event.time}
                onChange={(e) => handleEvent("time", e.target.value)}
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className={labelClass}>Place Details / Landmarks</label>
              <input
                className={inputClass}
                value={formData.event.placeDetail}
                onChange={(e) => handleEvent("placeDetail", e.target.value)}
              />
            </div>

            {formData.certificateType === "Birth" && (
              <div className="md:col-span-2 space-y-1">
                <label className={labelClass}>Hospital or Home? *</label>
                <select
                  className={inputClass}
                  value={formData.event.eventTypeData.hospitalOrHome || ""}
                  onChange={(e) =>
                    handleEventData("hospitalOrHome", e.target.value)
                  }
                >
                  <option value="">Select Option</option>
                  <option value="Hospital">Hospital / Institution</option>
                  <option value="Home">Home / Other</option>
                </select>
                <ErrorMsg
                  errors={errors}
                  path="event.eventTypeData.hospitalOrHome"
                />
              </div>
            )}

            {formData.certificateType === "Death" && (
              <>
                <div className="md:col-span-2 space-y-1">
                  <label className={labelClass}>Cause of Death *</label>
                  <input
                    className={inputClass}
                    value={formData.event.eventTypeData.causeOfDeath || ""}
                    onChange={(e) =>
                      handleEventData("causeOfDeath", e.target.value)
                    }
                  />
                  <ErrorMsg
                    errors={errors}
                    path="event.eventTypeData.causeOfDeath"
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Consulting Doctor Details</label>
                  <input
                    className={inputClass}
                    value={formData.event.eventTypeData.doctorDetails || ""}
                    onChange={(e) =>
                      handleEventData("doctorDetails", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Disposal Method</label>
                  <input
                    className={inputClass}
                    value={formData.event.eventTypeData.disposalMethod || ""}
                    onChange={(e) =>
                      handleEventData("disposalMethod", e.target.value)
                    }
                    placeholder="(Burial/Cremation)"
                  />
                </div>
              </>
            )}

            {formData.certificateType === "Marriage" && (
              <div className="md:col-span-2 space-y-1">
                <label className={labelClass}>
                  Marriage Act / Registration Sub-type
                </label>
                <input
                  className={inputClass}
                  value={formData.event.eventTypeData.marriageDetails || ""}
                  onChange={(e) =>
                    handleEventData("marriageDetails", e.target.value)
                  }
                  placeholder="e.g. Hindu Marriage Act, Special Marriage Act"
                />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Person Sections */}
        {formData.certificateType === "Birth" && (
          <>
            <PersonForm
              title="Section 3: Child Details"
              person={formData.persons.primary}
              pathPrefix="persons.primary"
              errors={errors}
              onChange={(p: Person) => updateNested(["persons", "primary"], p)}
            />
            <PersonForm
              title="Section 4: Father's Details"
              person={formData.persons.related[0] || emptyPerson}
              pathPrefix="persons.related.0"
              errors={errors}
              onChange={(p: Person) => {
                const updated = [...formData.persons.related];
                updated[0] = p;
                updateNested(["persons", "related"], updated);
              }}
            />
            <PersonForm
              title="Section 5: Mother's Details"
              person={formData.persons.related[1] || emptyPerson}
              pathPrefix="persons.related.1"
              errors={errors}
              onChange={(p: Person) => {
                const updated = [...formData.persons.related];
                updated[1] = p;
                updateNested(["persons", "related"], updated);
              }}
            />
          </>
        )}

        {formData.certificateType === "Death" && (
          <PersonForm
            title="Section 3: Deceased Details"
            person={formData.persons.primary}
            pathPrefix="persons.primary"
            errors={errors}
            onChange={(p: Person) => updateNested(["persons", "primary"], p)}
          />
        )}

        {formData.certificateType === "Marriage" && (
          <>
            <PersonForm
              title="Section 3: Groom Details"
              person={formData.persons.primary}
              pathPrefix="persons.primary"
              errors={errors}
              onChange={(p: Person) => updateNested(["persons", "primary"], p)}
            />
            <PersonForm
              title="Section 4: Bride Details"
              person={formData.persons.related[0] || emptyPerson}
              pathPrefix="persons.related.0"
              errors={errors}
              onChange={(p: Person) => {
                const updated = [...formData.persons.related];
                updated[0] = p;
                updateNested(["persons", "related"], updated);
              }}
            />

            <div className={containerClass}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h3 className={sectionTitleClass}>
                  Section 5: Witnesses (Min 2 Required)
                </h3>
                <button
                  type="button"
                  className="text-xs border border-slate-300 bg-white hover:bg-slate-50 font-bold py-2 px-4 rounded-sm text-slate-700 transition"
                  onClick={addWitness}
                >
                  + Add Witness
                </button>
              </div>
              <ErrorMsg errors={errors} path="persons.witnesses" />

              {formData.persons.witnesses.map((w, idx) => (
                <div key={idx} className="relative mt-4">
                  {formData.persons.witnesses.length > 2 && (
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-50 text-red-600 hover:bg-red-100 py-1.5 px-3 rounded-sm text-xs font-bold transition z-10 flex items-center gap-1 border border-red-200"
                      onClick={() => removeWitness(idx)}
                    >
                      <XCircle className="w-3 h-3" /> Remove
                    </button>
                  )}
                  <PersonForm
                    title={`Witness ${idx + 1}`}
                    person={w}
                    pathPrefix={`persons.witnesses.${idx}`}
                    errors={errors}
                    onChange={(p: Person) => {
                      const updated = [...formData.persons.witnesses];
                      updated[idx] = p;
                      updateNested(["persons", "witnesses"], updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <DocumentUpload
          onChange={(files: File[]) => updateNested(["documents"], files)}
        />

        <div className="flex justify-end pt-4 pb-12">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#138808] text-white font-bold py-3 px-8 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-50 w-full sm:w-auto text-sm"
          >
            {loading ? "SUBMITTING..." : `SUBMIT REGISTRATION`}
          </button>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm text-center text-sm font-medium mt-4">
            Please fix the highlighted fields above before submitting.
          </div>
        )}
      </form>

      {/* Success Dialog Modal */}
      {submittedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-10 rounded-sm max-w-[420px] w-full text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-5 border border-green-100">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Submission Successful!
            </h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Your application for a <strong>{submittedData.type} Certificate</strong> has been registered.
            </p>
            <div className="bg-slate-50 p-5 rounded-sm mb-8 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-widest">
                Reference ID
              </p>
              <p className="text-2xl font-bold text-slate-800 tracking-wider m-0">
                {submittedData.referenceId}
              </p>
            </div>
            <button
              onClick={() => setSubmittedData(null)}
              className="w-full py-3 bg-[#138808] text-white text-sm font-bold rounded-sm border-none cursor-pointer transition-colors hover:bg-green-700 shadow-sm"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

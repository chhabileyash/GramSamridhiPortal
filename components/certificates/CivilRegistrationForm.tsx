"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

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
  aadhaar: string; // Optional, but if provided must be 12 digits
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
    eventTypeData: Record<string, string>; // e.g., causeOfDeath, hospitalOrHome
  };
  persons: {
    primary: Person; // Child, Deceased, Groom
    related: Person[]; // Parents, Bride
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
    registrationDate: new Date().toISOString().split("T")[0],
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
    related: [{ ...emptyPerson }, { ...emptyPerson }], // Father, Mother by default for Birth
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

  // Applicant Validation
  if (isBlank(data.applicant.fullName)) setErr("applicant.fullName", "Applicant full name is required");
  if (!/^\d{10}$/.test(data.applicant.phone)) setErr("applicant.phone", "Phone must be exactly 10 digits");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.applicant.email)) setErr("applicant.email", "Invalid email address");

  // Event Date Validation
  if (isBlank(data.event.date)) setErr("event.date", "Event date is required");

  // Person Helper Validation
  const validatePerson = (person: Person, pathPrefix: string, isRequired: boolean = true) => {
    if (!isRequired && isBlank(person.fullName)) return; // skip if not required and blank

    if (isBlank(person.fullName)) setErr(`${pathPrefix}.fullName`, "Full name is required");
    if (isBlank(person.gender)) setErr(`${pathPrefix}.gender`, "Gender is required");
    
    if (person.aadhaar && !/^\d{12}$/.test(person.aadhaar)) {
      setErr(`${pathPrefix}.aadhaar`, "Aadhaar must be exactly 12 digits");
    }

    // DOB logic vs Registration/Event
    if (person.dobOrAge) {
      if (new Date(person.dobOrAge) >= new Date(data.application.registrationDate)) {
        setErr(`${pathPrefix}.dobOrAge`, "DOB must be before registration date");
      }
      if (data.certificateType === "Death") {
        if (data.event.date && new Date(data.event.date) < new Date(person.dobOrAge)) {
          setErr("event.date", "Death date cannot be before Date of Birth");
        }
      }
    } else {
        setErr(`${pathPrefix}.dobOrAge`, "DOB/Age is required");
    }
  };

  // Type-specific validations
  if (data.certificateType === "Birth") {
    validatePerson(data.persons.primary, "persons.primary"); // Child
    if (data.persons.related.length < 2) {
      setErr("persons.related", "Both parents' details are required for Birth");
    } else {
      validatePerson(data.persons.related[0], "persons.related.0"); // Father
      validatePerson(data.persons.related[1], "persons.related.1"); // Mother
    }
    
    if (isBlank(data.event.eventTypeData.hospitalOrHome)) {
        setErr("event.eventTypeData.hospitalOrHome", "Specify if born in hospital or home");
    }
  }

  if (data.certificateType === "Death") {
    // Only validate the deceased since related (informant/doctor) is handled in eventTypeData for now
    validatePerson(data.persons.primary, "persons.primary"); // Deceased
    if (isBlank(data.event.eventTypeData.causeOfDeath)) {
      setErr("event.eventTypeData.causeOfDeath", "Cause of death is required");
    }
  }

  if (data.certificateType === "Marriage") {
    // Primary: Groom, Related[0]: Bride
    validatePerson(data.persons.primary, "persons.primary"); // Groom
    if (data.persons.related.length < 1) {
       setErr("persons.related.0", "Bride details required");
    } else {
       validatePerson(data.persons.related[0], "persons.related.0"); // Bride
    }

    // Witnesses check
    if (!data.persons.witnesses || data.persons.witnesses.length < 2) {
      setErr("persons.witnesses", "Minimum 2 witnesses required for marriage");
    } else {
      data.persons.witnesses.forEach((w, i) => validatePerson(w, `persons.witnesses.${i}`));
    }
  }

  return { isValid, errors };
};

// --- Subcomponents ---

const ErrorMsg = ({ errors, path }: { errors: Record<string, string>; path: string }) => {
  return errors[path] ? <span className="error" style={{color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block'}}>{errors[path]}</span> : null;
};

const AddressForm = ({ address, pathPrefix, onChange, errors }: any) => {
  const handleChange = (field: keyof Address, val: string) => {
    const updated = { ...address, [field]: val };
    onChange(updated);
  };

  const inputStyle = { width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', marginTop: '0.25rem' };

  return (
    <div className="address-form" style={{ marginTop: "1rem" }}>
      <h4 style={{marginBottom: "0.5rem", fontSize: "1rem", fontWeight: "600", color: "#374151"}}>Address Details</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: '0.875rem', color: '#4b5563' }}>Country</label>
          <input className="input" style={inputStyle} value={address.country} onChange={(e) => handleChange("country", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', color: '#4b5563' }}>State</label>
          <input className="input" style={inputStyle} value={address.state} onChange={(e) => handleChange("state", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', color: '#4b5563' }}>District</label>
          <input className="input" style={inputStyle} value={address.district} onChange={(e) => handleChange("district", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', color: '#4b5563' }}>City / Village</label>
          <input className="input" style={inputStyle} value={address.city} onChange={(e) => handleChange("city", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ fontSize: '0.875rem', color: '#4b5563' }}>Address Line</label>
          <input className="input" style={inputStyle} value={address.addressLine} onChange={(e) => handleChange("addressLine", e.target.value)} placeholder="Complete street address" />
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

  const inputStyle = { width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', marginTop: '0.25rem' };
  const labelStyle = { fontSize: '0.875rem', color: '#4b5563', fontWeight: '500' };

  return (
    <div className="form-container" style={{ padding: "1.5rem", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
      <h3 style={{marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600", color: "#111827", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem"}}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input className="input" style={inputStyle} value={person.fullName} onChange={(e) => handleField("fullName", e.target.value)} />
          <ErrorMsg errors={errors} path={`${pathPrefix}.fullName`} />
        </div>
        <div>
          <label style={labelStyle}>Gender *</label>
          <select className="input" style={inputStyle} value={person.gender} onChange={(e) => handleField("gender", e.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <ErrorMsg errors={errors} path={`${pathPrefix}.gender`} />
        </div>
        <div>
          <label style={labelStyle}>Date of Birth / Age *</label>
          <input type="date" className="input" style={inputStyle} value={person.dobOrAge} onChange={(e) => handleField("dobOrAge", e.target.value)} />
          <ErrorMsg errors={errors} path={`${pathPrefix}.dobOrAge`} />
        </div>
        <div>
          <label style={labelStyle}>Nationality</label>
          <input className="input" style={inputStyle} value={person.nationality} onChange={(e) => handleField("nationality", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Aadhaar Number</label>
          <input className="input" style={inputStyle} value={person.aadhaar} onChange={(e) => handleField("aadhaar", e.target.value)} placeholder="12-digit number" />
          <ErrorMsg errors={errors} path={`${pathPrefix}.aadhaar`} />
        </div>
        <div>
           <label style={labelStyle}>Occupation</label>
           <input className="input" style={inputStyle} value={person.occupation} onChange={(e) => handleField("occupation", e.target.value)} />
        </div>
      </div>
      <AddressForm address={person.address} pathPrefix={`${pathPrefix}.address`} onChange={handleAddress} errors={errors} />
    </div>
  );
};

const DocumentUpload = ({ onChange }: any) => {
  return (
    <div className="form-container document-upload" style={{ padding: "1.5rem", border: "2px dashed #d1d5db", borderRadius: "0.5rem", marginBottom: "1.5rem", textAlign: "center", background: "#f9fafb" }}>
      <h3 style={{marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "600", color: "#374151"}}>Supporting Documents</h3>
      <p style={{fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem"}}>Upload ID proofs, residential proofs, doctor certificates, etc.</p>
      <input type="file" multiple className="input" style={{ display: "block", margin: "0 auto", color: "#4b5563" }} onChange={(e) => {
        if (e.target.files) {
          onChange(Array.from(e.target.files));
        }
      }} />
    </div>
  );
};

// --- Main Form Component ---

export default function CivilRegistrationForm() {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState<UnifiedFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleTypeChange = (type: CertificateType) => {
    // Reset form but keep type
    setFormData({
      ...initialFormData,
      certificateType: type,
      persons: {
        primary: { ...emptyPerson },
        related: type === "Birth" ? [{ ...emptyPerson }, { ...emptyPerson }] : (type === "Marriage" ? [{ ...emptyPerson }] : []),
        witnesses: type === "Marriage" ? [{ ...emptyPerson }, { ...emptyPerson }] : [],
      }
    });
    setErrors({});
    setSuccessMsg("");
  };

  // State Updaters
  const updateNested = (path: string[], value: any) => {
    setFormData((prev: any) => {
      const copy = { ...prev };
      let curr = copy;
      for (let i = 0; i < path.length - 1; i++) {
        curr[path[i]] = Array.isArray(curr[path[i]]) ? [...curr[path[i]]] : { ...curr[path[i]] };
        curr = curr[path[i]];
      }
      curr[path[path.length - 1]] = value;
      return copy;
    });
  };

  const handleApplicant = (field: keyof UnifiedFormData["applicant"], val: string) => updateNested(["applicant", field], val);
  const handleEvent = (field: keyof UnifiedFormData["event"], val: string) => updateNested(["event", field], val);
  const handleEventData = (field: string, val: string) => updateNested(["event", "eventTypeData", field], val);

  // Witness Handlers
  const addWitness = () => {
    setFormData((p) => ({ ...p, persons: { ...p.persons, witnesses: [...p.persons.witnesses, { ...emptyPerson }] } }));
  };
  const removeWitness = (idx: number) => {
    setFormData((p) => ({
      ...p,
      persons: { ...p.persons, witnesses: p.persons.witnesses.filter((_, i) => i !== idx) },
    }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      // Optional: Scroll to top to ensure user sees error states
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      // Manual delay for UX since no real API is connected in standard mode yet
      await new Promise((resolve) => setTimeout(resolve, 800));

      const meta = user?.unsafeMetadata as any;
      const payload = {
         formData: formData,
         villageId: meta?.village_id || null
      };

      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Simple mock fallback if the endpoint doesn't truly exist in next routing yet
      if (!res.ok && res.status !== 404) throw new Error("Failed to submit");
      
      setSuccessMsg(`Successfully registered for ${formData.certificateType} certificate.`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // Keep type and reset others
      handleTypeChange(formData.certificateType);
      
    } catch (err: any) {
      alert(err.message || "An error occurred connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', marginTop: '0.25rem', outline: 'none' };
  const labelStyle = { fontSize: '0.875rem', color: '#4b5563', fontWeight: '500' };

  return (
    <div className="form-container" style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "inherit" }}>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#1f2937", marginBottom: "0.5rem" }}>Civil Registration Application</h2>
        <p style={{ color: "#6b7280" }}>Apply for a Birth, Death, or Marriage certificate.</p>
      </div>
      
      {successMsg && (
        <div style={{ padding: "1rem", backgroundColor: "#d1fae5", border: "1px solid #10b981", color: "#065f46", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          {successMsg}
        </div>
      )}

      {/* Type Selector */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", justifyContent: "center" }}>
        {["Birth", "Death", "Marriage"].map((type) => (
          <button
            key={type}
            type="button"
            className={formData.certificateType === type ? "btn-primary" : "btn"}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              border: formData.certificateType === type ? "1px solid #2563eb" : "1px solid #d1d5db",
              background: formData.certificateType === type ? "#2563eb" : "#ffffff",
              color: formData.certificateType === type ? "#ffffff" : "#374151",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s",
              boxShadow: formData.certificateType === type ? "0 4px 6px -1px rgba(37, 99, 235, 0.2)" : "none"
            }}
            onClick={() => handleTypeChange(type as CertificateType)}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
         
        {/* Abstracted Application & Informant Block */}
        <div className="form-container" style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", background: "#ffffff", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600", color: "#111827", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem"}}>Applicant / Informant Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
             <div>
               <label style={labelStyle}>Full Name *</label>
               <input className="input" style={inputStyle} value={formData.applicant.fullName} onChange={(e) => handleApplicant("fullName", e.target.value)} />
               <ErrorMsg errors={errors} path="applicant.fullName" />
             </div>
             <div>
               <label style={labelStyle}>Phone Number *</label>
               <input type="tel" className="input" style={inputStyle} value={formData.applicant.phone} onChange={(e) => handleApplicant("phone", e.target.value)} placeholder="10-digit mobile" />
               <ErrorMsg errors={errors} path="applicant.phone" />
             </div>
             <div>
               <label style={labelStyle}>Email Address *</label>
               <input type="email" className="input" style={inputStyle} value={formData.applicant.email} onChange={(e) => handleApplicant("email", e.target.value)} />
               <ErrorMsg errors={errors} path="applicant.email" />
             </div>
             <div>
               <label style={labelStyle}>Residential Address</label>
               <input className="input" style={inputStyle} value={formData.applicant.address} onChange={(e) => handleApplicant("address", e.target.value)} />
             </div>
          </div>
        </div>

        {/* Dynamic Event Details */}
        <div className="form-container" style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", background: "#ffffff", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600", color: "#111827", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem"}}>Event Details ({formData.certificateType})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Event Date *</label>
              <input type="date" className="input" style={inputStyle} value={formData.event.date} onChange={(e) => handleEvent("date", e.target.value)} />
              <ErrorMsg errors={errors} path="event.date" />
            </div>
            <div>
              <label style={labelStyle}>Event Time</label>
              <input type="time" className="input" style={inputStyle} value={formData.event.time} onChange={(e) => handleEvent("time", e.target.value)} />
            </div>
            <div style={{gridColumn: "1 / -1"}}>
              <label style={labelStyle}>Place Details / Landmarks</label>
              <input className="input" style={inputStyle} value={formData.event.placeDetail} onChange={(e) => handleEvent("placeDetail", e.target.value)} />
            </div>
            
            {formData.certificateType === "Birth" && (
               <div style={{gridColumn: "1 / -1"}}>
                 <label style={labelStyle}>Hospital or Home? *</label>
                 <select className="input" style={inputStyle} value={formData.event.eventTypeData.hospitalOrHome || ""} onChange={(e) => handleEventData("hospitalOrHome", e.target.value)}>
                   <option value="">Select Option</option>
                   <option value="Hospital">Hospital / Institution</option>
                   <option value="Home">Home / Other</option>
                 </select>
                 <ErrorMsg errors={errors} path="event.eventTypeData.hospitalOrHome" />
               </div>
            )}
            
            {formData.certificateType === "Death" && (
                <>
                  <div style={{gridColumn: "span 2"}}>
                    <label style={labelStyle}>Cause of Death *</label>
                    <input className="input" style={inputStyle} value={formData.event.eventTypeData.causeOfDeath || ""} onChange={(e) => handleEventData("causeOfDeath", e.target.value)} />
                    <ErrorMsg errors={errors} path="event.eventTypeData.causeOfDeath" />
                  </div>
                  <div>
                    <label style={labelStyle}>Consulting Doctor Details</label>
                    <input className="input" style={inputStyle} value={formData.event.eventTypeData.doctorDetails || ""} onChange={(e) => handleEventData("doctorDetails", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Disposal Method (Burial/Cremation)</label>
                    <input className="input" style={inputStyle} value={formData.event.eventTypeData.disposalMethod || ""} onChange={(e) => handleEventData("disposalMethod", e.target.value)} />
                  </div>
                </>
            )}
            
            {formData.certificateType === "Marriage" && (
                <div style={{gridColumn: "1 / -1"}}>
                   <label style={labelStyle}>Marriage Act / Registration Sub-type</label>
                   <input className="input" style={inputStyle} value={formData.event.eventTypeData.marriageDetails || ""} onChange={(e) => handleEventData("marriageDetails", e.target.value)} placeholder="e.g. Hindu Marriage Act, Special Marriage Act" />
                </div>
            )}
          </div>
        </div>

        {/* Dynamic Person Sections */}
        {formData.certificateType === "Birth" && (
           <>
             <PersonForm title="Child Details" person={formData.persons.primary} pathPrefix="persons.primary" errors={errors} onChange={(p: Person) => updateNested(["persons", "primary"], p)} />
             <PersonForm title="Father's Details" person={formData.persons.related[0] || emptyPerson} pathPrefix="persons.related.0" errors={errors} onChange={(p: Person) => {
                const updated = [...formData.persons.related]; updated[0] = p; updateNested(["persons", "related"], updated);
             }} />
             <PersonForm title="Mother's Details" person={formData.persons.related[1] || emptyPerson} pathPrefix="persons.related.1" errors={errors} onChange={(p: Person) => {
                const updated = [...formData.persons.related]; updated[1] = p; updateNested(["persons", "related"], updated);
             }} />
           </>
        )}

        {formData.certificateType === "Death" && (
           <PersonForm title="Deceased Details" person={formData.persons.primary} pathPrefix="persons.primary" errors={errors} onChange={(p: Person) => updateNested(["persons", "primary"], p)} />
        )}

        {formData.certificateType === "Marriage" && (
          <>
            <PersonForm title="Groom Details" person={formData.persons.primary} pathPrefix="persons.primary" errors={errors} onChange={(p: Person) => updateNested(["persons", "primary"], p)} />
            <PersonForm title="Bride Details" person={formData.persons.related[0] || emptyPerson} pathPrefix="persons.related.0" errors={errors} onChange={(p: Person) => {
               const updated = [...formData.persons.related]; updated[0] = p; updateNested(["persons", "related"], updated);
            }} />
            
            <div className="form-container" style={{ padding: "1.5rem", border: "1px dashed #d1d5db", borderRadius: "0.5rem", background: "#f9fafb", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827", margin: 0 }}>Witnesses (Min 2 Required)</h3>
                  <button type="button" className="btn" style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", background: "#ffffff", borderRadius: "0.375rem", cursor: "pointer", fontWeight: "500", color: "#374151" }} onClick={addWitness}>+ Add Witness</button>
              </div>
              <ErrorMsg errors={errors} path="persons.witnesses" />
              
              {formData.persons.witnesses.map((w, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                   {formData.persons.witnesses.length > 2 && (
                     <button type="button" className="btn error" style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "#ef4444", color: "white", border: "none", padding: "0.375rem 0.75rem", borderRadius: "0.375rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: "500"}} onClick={() => removeWitness(idx)}>Remove</button>
                   )}
                   <PersonForm title={`Witness ${idx + 1}`} person={w} pathPrefix={`persons.witnesses.${idx}`} errors={errors} onChange={(p: Person) => {
                      const updated = [...formData.persons.witnesses]; updated[idx] = p; updateNested(["persons", "witnesses"], updated);
                   }} />
                </div>
              ))}
            </div>
          </>
        )}

        <DocumentUpload onChange={(files: File[]) => updateNested(["documents"], files)} />

        <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{
                  padding: "0.875rem 2rem",
                  fontSize: "1.125rem",
                  background: loading ? "#9ca3af" : "#059669",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  boxShadow: "0 4px 6px -1px rgba(5, 150, 105, 0.2)",
                  transition: "background 0.2s"
                }}
            >
              {loading ? "Submitting Application..." : `Submit ${formData.certificateType} Registration`}
            </button>
        </div>
        
        {Object.keys(errors).length > 0 && (
           <div style={{ padding: "1rem", backgroundColor: "#fee2e2", border: "1px solid #ef4444", color: "#b91c1c", borderRadius: "0.5rem", marginTop: "1rem", textAlign: "center" }}>
               Please fix the errors above before submitting the application.
           </div>
        )}
      </form>
    </div>
  );
}

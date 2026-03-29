"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

const styles = `
  .custom-user-button { position: relative; display: inline-block; }

  .custom-user-button-trigger {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px;
    border-radius: 50px;
    transition: background 0.15s;
  }
  .custom-user-button-trigger:hover { background: rgba(0, 0, 0, 0.04); }
  .custom-user-button-trigger:focus-visible { outline: 2px solid #1F4E79; outline-offset: 2px; }

  .custom-avatar-box {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, #1F4E79, #F28C28);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .custom-avatar-box::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.3);
  }
  .custom-avatar-initials {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.5px;
    pointer-events: none;
    z-index: 1;
  }
  .custom-avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .custom-user-popover-card {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 280px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 8px 24px rgba(31, 78, 121, 0.15), 0 0 0 1px rgba(31, 78, 121, 0.08);
    border: 1px solid rgba(31, 78, 121, 0.1);
    overflow: hidden;
    transform-origin: top right;
    z-index: 999;
  }
  .custom-popover-enter {
    animation: customPopIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .custom-popover-exit {
    animation: customPopOut 0.15s ease forwards;
  }
  @keyframes customPopIn {
    from { transform: scale(0.94) translateY(-8px); opacity: 0; }
    to   { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes customPopOut {
    from { transform: scale(1) translateY(0); opacity: 1; }
    to   { transform: scale(0.94) translateY(-8px); opacity: 0; }
  }

  .custom-user-popover-main { padding: 6px; }

  .custom-user-preview {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid rgba(31, 78, 121, 0.08);
    margin-bottom: 4px;
  }
  .custom-user-preview-avatar-container .custom-avatar-box { width: 44px; height: 44px; }
  .custom-avatar-box.large { width: 44px; height: 44px; }
  .custom-avatar-box.large .custom-avatar-initials { font-size: 16px; }

  .custom-user-preview-text-container { overflow: hidden; flex: 1; }
  .custom-user-preview-main-identifier {
    font-size: 14px;
    font-weight: 600;
    color: #1F4E79;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .custom-user-preview-secondary-identifier {
    font-size: 12px;
    color: #8a8a95;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .custom-user-popover-actions { 
    display: flex; 
    flex-direction: column; 
    gap: 2px; 
    padding: 4px 0; 
  }

  .custom-user-popover-action-button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #1F4E79;
    transition: background 0.12s, color 0.12s;
    width: 100%;
  }
  .custom-user-popover-action-button:hover {
    background: rgba(31, 78, 121, 0.06);
    color: #1F4E79;
  }
  .custom-user-popover-action-button:focus-visible {
    outline: 2px solid #1F4E79;
    outline-offset: -2px;
  }

  .custom-user-popover-action-button__signOut:hover {
    color: #ff4d4f;
    background: rgba(255, 77, 79, 0.08);
  }
  .custom-user-popover-action-button__signOut:hover .custom-user-popover-action-button-icon-box {
    color: #ff4d4f;
  }

  .custom-user-popover-action-button-icon-box {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8a8a95;
    flex-shrink: 0;
    transition: color 0.12s;
  }
  .custom-user-popover-action-button:hover:not(.custom-user-popover-action-button__signOut)
    .custom-user-popover-action-button-icon-box {
    color: #1F4E79;
  }

  .custom-user-popover-action-button-icon {
    width: 16px;
    height: 16px;
  }
`;

const SignOutIcon = () =>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  className="custom-user-popover-action-button-icon custom-user-popover-action-button-icon__signOut">
  
    <path
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2.6 2.604A2.045 2.045 0 0 1 4.052 2h3.417c.544 0 1.066.217 1.45.604.385.387.601.911.601 1.458v.69c0 .413-.334.75-.746.75a.748.748 0 0 1-.745-.75v-.69a.564.564 0 0 0-.56-.562H4.051a.558.558 0 0 0-.56.563v7.875a.564.564 0 0 0 .56.562h3.417a.558.558 0 0 0 .56-.563v-.671c0-.415.333-.75.745-.75s.746.335.746.75v.671c0 .548-.216 1.072-.6 1.459a2.045 2.045 0 0 1-1.45.604H4.05a2.045 2.045 0 0 1-1.45-.604A2.068 2.068 0 0 1 2 11.937V4.064c0-.548.216-1.072.6-1.459Zm8.386 3.116a.743.743 0 0 1 1.055 0l1.74 1.75a.753.753 0 0 1 0 1.06l-1.74 1.75a.743.743 0 0 1-1.055 0 .753.753 0 0 1 0-1.06l.467-.47H5.858A.748.748 0 0 1 5.112 8c0-.414.334-.75.746-.75h5.595l-.467-.47a.753.753 0 0 1 0-1.06Z" />
  
  </svg>;


interface CustomUserButtonProps {
  isMobile?: boolean;
  onSignOut?: () => void;
}

const CustomUserButton: React.FC<CustomUserButtonProps> = ({
  isMobile = false,
  onSignOut
}) => {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { signOut } = useClerk();

  const openDropdown = useCallback(() => {
    setVisible(true);
    setAnimating(true);
    setOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setAnimating(false);
    setTimeout(() => {
      setOpen(false);
      setVisible(false);
    }, 140);
  }, []);

  const toggle = useCallback(
    () => open ? closeDropdown() : openDropdown(),
    [open, closeDropdown, openDropdown]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [closeDropdown]);

  const handleSignOut = async () => {
    closeDropdown();
    await signOut();
    onSignOut?.();
  };

  const displayName =
  user?.fullName || user?.firstName || user?.username || "User";
  const displayInitials =
  (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "";

  return (
    <>
      <style>{styles}</style>
      <div
        className="custom-user-button"
        ref={ref}
        style={{
          width: isMobile ? "100%" : "auto"
        }}>
        
        <button
          className="custom-user-button-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={toggle}
          style={{ width: isMobile ? "100%" : "auto" }}>
          
          <span className="custom-avatar-box">
            {user?.imageUrl ?
            <img
              src={user.imageUrl}
              alt={displayName}
              className="custom-avatar-image" /> :


            <span className="custom-avatar-initials">
                {displayInitials || "U"}
              </span>
            }
          </span>
          {!isMobile &&
          <span style={{ fontSize: "13px", color: "#1F4E79" }}>▼</span>
          }
        </button>

        {visible &&
        <div
          className={`custom-user-popover-card ${
          animating ? "custom-popover-enter" : "custom-popover-exit"}`
          }
          role="dialog"
          aria-label="User menu">
          
            <div className="custom-user-popover-main">
              {}
              <div className="custom-user-preview">
                <span className="custom-user-preview-avatar-container">
                  <span className="custom-avatar-box large">
                    {user?.imageUrl ?
                  <img
                    src={user.imageUrl}
                    alt={displayName}
                    className="custom-avatar-image" /> :


                  <span className="custom-avatar-initials">
                        {displayInitials || "U"}
                      </span>
                  }
                  </span>
                </span>
                <span className="custom-user-preview-text-container">
                  <div className="custom-user-preview-main-identifier">
                    {displayName}
                  </div>
                  <div className="custom-user-preview-secondary-identifier">
                    {displayEmail}
                  </div>
                </span>
              </div>

              {}
              <div className="custom-user-popover-actions" role="menu">
                <button
                className="custom-user-popover-action-button custom-user-popover-action-button__signOut"
                role="menuitem"
                onClick={handleSignOut}>
                
                  <span className="custom-user-popover-action-button-icon-box custom-user-popover-action-button-icon-box__signOut">
                    <SignOutIcon />
                  </span>
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </>);

};

export default CustomUserButton;
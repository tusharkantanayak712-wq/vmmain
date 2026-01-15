"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  FaShoppingCart,
  FaIdCard,
  FaWallet,
  FaMoneyBillWave,
  FaGem,
} from "react-icons/fa";

const steps = [
  {
    title: "Select diamond package",
    icon: FaShoppingCart,
    content: "Choose the diamond pack you want to purchase.",
  },
  {
    title: "Enter Player ID & Zone",
    icon: FaIdCard,
    content:
      "Provide your MLBB Player ID, Zone ID, and in-game name accurately.",
  },
  {
    title: "Choose payment method",
    icon: FaWallet,
    content: "Select UPI or wallet as your preferred payment option.",
  },
  {
    title: "Complete payment",
    icon: FaMoneyBillWave,
    content: "Finish the payment securely.",
  },
  {
    title: "Diamonds delivered",
    icon: FaGem,
    content: "Diamonds are credited instantly to your account.",
  },
];

export default function MLBBPurchaseGuide() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 ">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-semibold">
          How it works
        </h3>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Complete your MLBB diamond purchase in a few simple steps
        </p>
      </div>

      {/* Steps */}
      <div className="divide-y divide-[var(--border)]">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOpen = openIndex === index;

          return (
            <div key={index} className="py-3">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-4 text-left"
              >
                {/* Index */}
                <div className="w-6 text-xs font-medium text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                    isOpen
                      ? "border-[var(--accent)] text-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--muted)]"
                  }`}
                >
                  <Icon size={14} />
                </div>

                {/* Title */}
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      isOpen ? "font-medium" : "text-[var(--muted)]"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>

                {/* Chevron */}
                <FiChevronDown
                  className={`text-sm transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Content */}
              <div
                className={`grid transition-all duration-200 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-[76px] pr-2 pt-2 text-xs leading-relaxed text-[var(--muted)]">
                  {step.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

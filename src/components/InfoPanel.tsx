import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Phone, MapPin, Stethoscope, AlertCircle } from "lucide-react";
import type { Coe } from "../types";
import { getContactText, getStaffDirectoryUrl } from "../lib/coe-helpers";

interface InfoPanelProps {
  coe: Coe | null;
  onClose: () => void;
}

export default function InfoPanel({ coe, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {coe && (
        <motion.div
          key={coe.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-auto absolute bottom-4 left-4 right-4 z-10 max-h-[70vh] overflow-y-auto rounded-xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:left-auto sm:right-4 sm:w-96"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="pr-8 text-base font-semibold text-slate-900">{coe.name}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {coe.city}, {coe.state}
          </p>

          <div className="mt-4 flex items-start gap-2 text-sm text-slate-700">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>{coe.address}</span>
          </div>

          {getContactText(coe) && (
            <div className="mt-3 flex items-start gap-2 whitespace-pre-line text-sm text-slate-700">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>{getContactText(coe)}</span>
            </div>
          )}

          {getStaffDirectoryUrl(coe) && (
            <a
              href={getStaffDirectoryUrl(coe)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              <ExternalLink className="h-4 w-4" />
              Staff directory
            </a>
          )}

          {coe.headDoctors && (
            <div className="mt-3 flex items-start gap-2 text-sm text-slate-700">
              <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>{coe.headDoctors}</span>
            </div>
          )}

          {coe.other && (
            <div className="mt-4 flex items-start gap-2 rounded-md bg-amber-50 p-2 text-xs text-amber-800">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{coe.other}</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

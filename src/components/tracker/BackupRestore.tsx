"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import type { DataModel } from "@/lib/types";
import { download, todayISO } from "@/lib/utils";

export default function BackupRestore({ data, setData }: { data: DataModel; setData: React.Dispatch<React.SetStateAction<DataModel>> }) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onDownload = () => download(`tracker-${todayISO()}.json`, JSON.stringify(data, null, 2));

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = (e.target?.result ?? null) as string | null;
        if (!text) return alert("Empty file or failed to read file");
        const parsed = JSON.parse(text) as Partial<DataModel>;
        if ((parsed as DataModel).entries && (parsed as DataModel).plan) setData(parsed as DataModel);
        else alert("Invalid file format");
      } catch {
        alert("Could not parse file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Export JSON
      </Button>
      <input
        ref={fileRef}
        className="hidden"
        type="file"
        accept="application/json"
        onChange={(e) => e.target.files && e.target.files[0] && onUpload(e.target.files[0])}
      />
      <Button variant="secondary" onClick={() => fileRef.current?.click()}>
        <Upload className="mr-2 h-4 w-4" />
        Import JSON
      </Button>
    </div>
  );
}



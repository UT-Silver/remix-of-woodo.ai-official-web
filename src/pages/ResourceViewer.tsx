import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Resource = {
  id: string;
  title: string;
  file_path: string;
  file_type: string;
};

const ResourceViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("resources")
      .select("id, title, file_path, file_type")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setResource(data as Resource | null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "100vh", backgroundColor: "#FAF9F6" }}>
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  if (!resource || resource.file_type !== "html") {
    return (
      <div className="flex flex-col items-center justify-center gap-4" style={{ minHeight: "100vh", backgroundColor: "#FAF9F6" }}>
        <p style={{ color: "#4B5563" }}>Resource not found or not viewable.</p>
        <Link to="/resources" className="text-sm underline" style={{ color: "#16A34A" }}>Back to Resources</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      <div
        className="flex items-center justify-between px-6"
        style={{
          height: "72px",
          paddingTop: "96px",
          paddingBottom: "16px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px]"
          style={{ color: "#4B5563" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Resources
        </Link>
        <a
          href={resource.file_path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px]"
          style={{ color: "#16A34A" }}
        >
          Open in new tab
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="px-6 pb-16" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1
          className="mb-4 text-2xl md:text-3xl font-semibold"
          style={{ color: "#1E293B", fontFamily: "'Playfair Display', serif" }}
        >
          {resource.title}
        </h1>
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "0.5px solid #E8E5E0", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
        >
          <iframe
            src={resource.file_path}
            title={resource.title}
            style={{ width: "100%", height: "calc(100vh - 240px)", border: "none", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceViewer;

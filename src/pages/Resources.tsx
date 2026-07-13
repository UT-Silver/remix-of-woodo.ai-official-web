import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, FileText, Presentation, FileArchive, File as FileIcon, Download, Loader2, Settings, Globe, ArrowUpRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Resource = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export const CATEGORIES = ["Reports", "Decks", "Data", "Other"] as const;

const iconFor = (fileType: string, fileName: string) => {
  if (fileType === "html") return Globe;
  const n = fileName.toLowerCase();
  if (n.endsWith(".xlsx") || n.endsWith(".xls") || n.endsWith(".csv")) return FileSpreadsheet;
  if (n.endsWith(".pdf")) return FileText;
  if (n.endsWith(".ppt") || n.endsWith(".pptx") || n.endsWith(".key")) return Presentation;
  if (n.endsWith(".zip") || n.endsWith(".rar") || n.endsWith(".7z") || n.endsWith(".tar") || n.endsWith(".gz")) return FileArchive;
  return FileIcon;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const categoryColor = (cat: string) => {
  switch (cat) {
    case "Reports":
      return "bg-primary/10 text-primary-dark";
    case "Decks":
      return "bg-accent/10 text-accent-dark";
    case "Data":
      return "bg-secondary/10 text-secondary-dark";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Resources = () => {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Failed to load resources");
      } else {
        setItems(data ?? []);
      }
      setLoading(false);
    };
    fetchItems();

    // Check admin status for showing Manage button
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      }
    });
  }, []);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  const handleDownload = async (r: Resource) => {
    setDownloadingId(r.id);
    try {
      const { data, error } = await supabase.storage
        .from("resources")
        .createSignedUrl(r.file_path, 60, { download: r.file_name });
      if (error || !data) throw error;
      window.location.href = data.signedUrl;
    } catch (e) {
      toast.error("Download failed");
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  return (
    <div className="page-enter" style={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "180px 24px 80px" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="fadeOnly">
            <p className="text-xs uppercase mb-5" style={{ color: "#16A34A", letterSpacing: "4px" }}>
              Open Library
            </p>
            <h1
              className="text-4xl md:text-6xl font-semibold leading-tight"
              style={{ color: "#1E293B", fontFamily: "'Playfair Display', serif" }}
            >
              Resources
            </h1>
            <p className="mt-6 max-w-2xl" style={{ color: "#4B5563", fontSize: "18px", lineHeight: 1.8 }}>
              Reports, decks, datasets, and working documents from the Woodo team — free to read, free to share.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter + Admin */}
      <section className="px-6" style={{ paddingBottom: "24px" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: filter === cat ? "#22C55E" : "transparent",
                  color: filter === cat ? "#FFFFFF" : "#4B5563",
                  border: filter === cat ? "1px solid #22C55E" : "1px solid #E2E8F0",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <Link
            to="/resources/admin"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px]"
            style={{ color: "#94A3B8" }}
          >
            <Settings className="w-3.5 h-3.5" />
            {isAdmin ? "Manage" : "Admin"}
          </Link>
        </div>
      </section>

      {/* List */}
      <section className="px-6" style={{ padding: "24px 24px 160px" }}>
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#22C55E" }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24" style={{ color: "#94A3B8" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontStyle: "italic" }}>
                No resources here yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((r) => {
                const Icon = iconFor(r.file_type, r.file_name);
                return (
                  <ScrollReveal key={r.id} direction="up">
                    <div
                      className="rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "#FFFFFF",
                        border: "0.5px solid #E8E5E0",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: "#F3F1ED" }}
                        >
                          <Icon className="w-6 h-6" style={{ color: "#16A34A" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold mb-2 ${categoryColor(
                              r.category
                            )}`}
                          >
                            {r.category}
                          </span>
                          <h3
                            className="text-lg font-semibold leading-snug"
                            style={{ color: "#1E293B" }}
                          >
                            {r.title}
                          </h3>
                        </div>
                      </div>
                      {r.description && (
                        <p className="text-sm mb-4 flex-1" style={{ color: "#4B5563", lineHeight: 1.6 }}>
                          {r.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "0.5px solid #E8E5E0" }}>
                        <div className="text-xs" style={{ color: "#94A3B8" }}>
                          {r.file_type === "html" ? "Interactive · Web" : `${formatSize(r.file_size)} · ${formatDate(r.created_at)}`}
                        </div>
                        {r.file_type === "html" ? (
                          <Link
                            to={`/resources/view/${r.id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold rounded-full transition-all active:scale-[0.97]"
                            style={{ background: "#22C55E", color: "#FFFFFF", padding: "8px 18px" }}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            Open
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleDownload(r)}
                            disabled={downloadingId === r.id}
                            className="inline-flex items-center gap-2 text-sm font-semibold rounded-full transition-all active:scale-[0.97]"
                            style={{ background: "#22C55E", color: "#FFFFFF", padding: "8px 18px" }}
                          >
                            {downloadingId === r.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Download className="w-3.5 h-3.5" />
                            )}
                            Download
                          </button>
                        )}
                      </div>

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;

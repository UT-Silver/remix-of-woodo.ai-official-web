import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Trash2, Upload, ArrowLeft, LogOut } from "lucide-react";
import { CATEGORIES } from "./Resources";

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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #E2E8F0",
  borderRadius: "10px",
  fontSize: "15px",
  background: "#FFFFFF",
  color: "#1E293B",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: "#64748B",
  marginBottom: "8px",
};

const ResourcesAdmin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  // Auth form
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Admin panel
  const [items, setItems] = useState<Resource[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) checkAdmin(s.user.id);
      else {
        setIsAdmin(null);
        setChecking(false);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkAdmin(session.user.id);
      else setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    setChecking(true);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
    setChecking(false);
    if (data) loadItems();
  };

  const loadItems = async () => {
    setListLoading(true);
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load resources");
    else setItems(data ?? []);
    setListLoading(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/resources/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/resources");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast.error("Title and file are required");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("resources").upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("resources").insert({
        title: title.trim(),
        description: description.trim() || null,
        category,
        file_path: path,
        file_name: file.name,
        file_type: file.type || "application/octet-stream",
        file_size: file.size,
        created_by: session?.user?.id ?? null,
      });
      if (insErr) {
        await supabase.storage.from("resources").remove([path]);
        throw insErr;
      }
      toast.success("Uploaded");
      setTitle("");
      setDescription("");
      setFile(null);
      setCategory(CATEGORIES[0]);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value &&
        ((document.getElementById("file-input") as HTMLInputElement).value = "");
      loadItems();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (r: Resource) => {
    if (!confirm(`Delete "${r.title}"?`)) return;
    const { error: dbErr } = await supabase.from("resources").delete().eq("id", r.id);
    if (dbErr) {
      toast.error("Delete failed");
      return;
    }
    await supabase.storage.from("resources").remove([r.file_path]);
    toast.success("Deleted");
    loadItems();
  };

  // ------- Render states -------

  if (checking) {
    return (
      <div style={{ background: "#FAF9F6", minHeight: "100vh" }} className="flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  // Not signed in
  if (!session) {
    return (
      <div className="page-enter" style={{ background: "#FAF9F6", minHeight: "100vh", padding: "180px 24px 80px" }}>
        <div className="max-w-md mx-auto">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: "#64748B" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <h1
            className="text-3xl md:text-4xl font-semibold mb-2"
            style={{ color: "#1E293B", fontFamily: "'Playfair Display', serif" }}
          >
            {mode === "signin" ? "Admin sign in" : "Create admin account"}
          </h1>
          <p className="text-sm mb-8" style={{ color: "#64748B" }}>
            Manage the Resources library.
          </p>
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full font-semibold rounded-full transition-all active:scale-[0.97]"
              style={{ background: "#22C55E", color: "#FFFFFF", padding: "14px 24px", fontSize: "15px" }}
            >
              {authLoading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-sm"
            style={{ color: "#16A34A" }}
          >
            {mode === "signin" ? "Need to create an account?" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    );
  }

  // Signed in but not admin
  if (!isAdmin) {
    return (
      <div className="page-enter" style={{ background: "#FAF9F6", minHeight: "100vh", padding: "180px 24px 80px" }}>
        <div className="max-w-md mx-auto text-center">
          <h1
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ color: "#1E293B", fontFamily: "'Playfair Display', serif" }}
          >
            Account pending
          </h1>
          <p className="text-sm mb-4" style={{ color: "#4B5563", lineHeight: 1.7 }}>
            You're signed in as <strong>{session.user.email}</strong>, but this account isn't an admin yet.
          </p>
          <p className="text-xs mb-8" style={{ color: "#94A3B8", lineHeight: 1.7 }}>
            Share your account email with the Lovable agent to be promoted.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full"
              style={{ background: "transparent", border: "1px solid #E2E8F0", padding: "10px 20px", color: "#4B5563" }}
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full"
              style={{ background: "#22C55E", color: "#FFFFFF", padding: "10px 20px" }}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="page-enter" style={{ background: "#FAF9F6", minHeight: "100vh", padding: "140px 24px 100px" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/resources" className="inline-flex items-center gap-2 text-sm mb-3" style={{ color: "#64748B" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Resources
            </Link>
            <h1
              className="text-3xl md:text-4xl font-semibold"
              style={{ color: "#1E293B", fontFamily: "'Playfair Display', serif" }}
            >
              Manage Resources
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px]"
            style={{ color: "#94A3B8" }}
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>

        {/* Upload form */}
        <form
          onSubmit={handleUpload}
          className="rounded-2xl p-6 md:p-8 mb-10"
          style={{ background: "#FFFFFF", border: "0.5px solid #E8E5E0" }}
        >
          <h2 className="text-lg font-semibold mb-6" style={{ color: "#1E293B" }}>
            Upload new file
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label style={labelStyle}>Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label style={labelStyle}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" as const }}
              />
            </div>
            <div className="md:col-span-2">
              <label style={labelStyle}>File * (Excel, PDF, PPT, ZIP, …)</label>
              <input
                id="file-input"
                type="file"
                required
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                style={{ ...inputStyle, padding: "10px 12px" }}
              />
              {file && (
                <p className="text-xs mt-2" style={{ color: "#94A3B8" }}>
                  {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="mt-6 inline-flex items-center gap-2 font-semibold rounded-full transition-all active:scale-[0.97]"
            style={{ background: "#22C55E", color: "#FFFFFF", padding: "12px 28px", fontSize: "15px" }}
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </form>

        {/* List */}
        <h2 className="text-lg font-semibold mb-4" style={{ color: "#1E293B" }}>
          Current files ({items.length})
        </h2>
        {listLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto my-8" style={{ color: "#22C55E" }} />
        ) : items.length === 0 ? (
          <p className="text-sm" style={{ color: "#94A3B8" }}>No files yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl"
                style={{ background: "#FFFFFF", border: "0.5px solid #E8E5E0" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold"
                      style={{ background: "#F3F1ED", color: "#4B5563" }}
                    >
                      {r.category}
                    </span>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>
                      {r.file_name} · {(r.file_size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="text-sm font-semibold truncate" style={{ color: "#1E293B" }}>
                    {r.title}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(r)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "#EF4444" }}
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesAdmin;

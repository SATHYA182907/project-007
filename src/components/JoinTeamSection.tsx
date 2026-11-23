import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  X,
  HeartHandshake,
  Sparkles,
  Clock3,
} from 'lucide-react';
import { dbService } from '../services/db';
import { SectionHeader, Reveal } from './fx';

export const JoinTeamSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    areaOfInterest: 'Event Facilitation & Coordination',
    skills: '',
    experience: '',
    message: '',
  });

  const [cvFile, setCvFile] = useState<{
    name: string;
    size: string;
    type: string;
    dataUrl: string;
  } | null>(null);

  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const areaOptions = [
    'Event Facilitation & Coordination',
    'Brain Gym & Cognitive Workshops',
    'Community & Elder Care Outreach',
    'Special Needs & Inclusive Programs',
    'Creative Arts, Music & Theatre',
    'Physical Fitness, Marathons & Sports',
    'Media, Documentation & Logistics',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError('Please upload a PDF, DOC, or DOCX document.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5MB limit. Please upload a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const formattedSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      setCvFile({
        name: file.name,
        size: formattedSize,
        type: file.type || 'application/pdf',
        dataUrl: reader.result as string,
      });
    };
    reader.onerror = () => {
      setFileError('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setCvFile(null);
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const detailedMessage = `Area of Interest: ${formData.areaOfInterest}\n\nKey Skills: ${formData.skills || 'Not specified'}\n\nExperience: ${formData.experience || 'Not specified'}\n\nApplicant Statement:\n${formData.message || 'No additional message provided.'}`;

      const filesPayload = cvFile
        ? [
            {
              name: cvFile.name,
              url: cvFile.dataUrl,
              size: cvFile.size,
              type: cvFile.type,
            },
          ]
        : undefined;

      await dbService.createSubmission({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: 'Volunteer',
        category: 'Team Application',
        message: detailedMessage,
        files: filesPayload,
      });

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        areaOfInterest: 'Event Facilitation & Coordination',
        skills: '',
        experience: '',
        message: '',
      });
      setCvFile(null);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setSubmitError('Failed to submit application. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join-team" className="section bg-brand-dark text-brand-ivory border-t border-white/5">
      <div className="fx-aurora top-1/4 -right-20 w-[600px] h-[600px] bg-brand-lavender/[0.07]" />
      <div className="fx-aurora bottom-10 -left-20 w-[500px] h-[500px] bg-brand-gold/[0.06]" style={{ animationDelay: '-8s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-10">
          <SectionHeader
            align="left"
            className="mb-6"
            icon={<Users />}
            eyebrow="Join Our Team"
            title="Be Part of Something"
            accent="Meaningful."
            subtitle="“Join Offscreen Hub in creating experiences that bring people together and inspire meaningful change beyond screens.”"
          />
          <div className="hidden sm:grid grid-cols-1 gap-2.5">
            {[
              { icon: <HeartHandshake className="w-4 h-4" />, t: areaOptions.length + ' areas of interest', d: areaOptions.slice(0, 3).join(' • ') + ' & more' },
              { icon: <Sparkles className="w-4 h-4" />, t: 'Secure CV upload', d: 'PDF, DOC, DOCX up to 5MB' },
              { icon: <Clock3 className="w-4 h-4" />, t: 'Personal review', d: 'We review each application personally and will get in touch with you soon.' },
            ].map((f, i) => (
              <Reveal key={f.t} delay={0.2 + i * 0.08}>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="w-8 h-8 shrink-0 rounded-xl bg-brand-gold/10 border border-brand-gold/25 text-brand-gold flex items-center justify-center">{f.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-brand-ivory">{f.t}</p>
                    <p className="text-[11px] text-brand-mutedIvory/80 leading-relaxed">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fx-border fx-border-on rounded-3xl fx-glass p-5 sm:p-8 relative"
          >
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center mx-auto text-brand-gold">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-ivory">
                    Thank You for Applying!
                  </h3>
                  <p className="text-sm text-brand-mutedIvory max-w-md mx-auto leading-relaxed">
                    Your application and CV have been securely transmitted to our administrative team. We review each application personally and will get in touch with you soon.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-brand-ivory transition-colors uppercase tracking-wider"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* 1. Full Name, Email, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                        Full Name <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ananya Sundaram"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory placeholder-brand-mutedIvory/40 text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                        Email Address <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ananya@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory placeholder-brand-mutedIvory/40 text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                        Phone Number <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory placeholder-brand-mutedIvory/40 text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* 2. Area of Interest */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                      Primary Area of Interest
                    </label>
                    <select
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-brand-ivory text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300"
                    >
                      {areaOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-brand-dark text-brand-ivory">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Skills & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                        Key Skills & Talents
                      </label>
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. Workshop Hosting, Emceeing, Yoga"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory placeholder-brand-mutedIvory/40 text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                        Relevant Experience
                      </label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="e.g. 2 years volunteering, student leader"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory placeholder-brand-mutedIvory/40 text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* 4. Message / Statement */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                      Why do you want to join Offscreen Hub?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your passion for offline living, community work, or how you would like to contribute..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-brand-ivory placeholder-brand-mutedIvory/40 text-base sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* 5. Upload CV / Resume */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-brand-ivory block">
                      Upload CV / Resume (PDF, DOC, DOCX • Max 5MB)
                    </label>

                    {cvFile ? (
                      <div className="p-4 rounded-xl bg-white/5 border border-brand-gold/40 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-brand-gold shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-brand-ivory line-clamp-1">{cvFile.name}</p>
                            <span className="text-[10px] text-brand-mutedIvory/60 font-mono">{cvFile.size}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-brand-mutedIvory hover:text-brand-ivory transition-colors"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-white/15 hover:border-brand-gold/40 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-all">
                        <Upload className="w-6 h-6 text-brand-gold mb-2" />
                        <span className="text-xs font-medium text-brand-ivory">
                          Click to upload your CV / Resume
                        </span>
                        <span className="text-[10px] text-brand-mutedIvory/60 mt-1">
                          Supported formats: PDF, DOC, DOCX up to 5MB
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-400 flex items-center gap-1.5 pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{fileError}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden w-full py-4 px-8 rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-glow-gold hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Application...</span>
                      ) : (
                        <>
                          <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                          <span>SEND YOUR CV</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

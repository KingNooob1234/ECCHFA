import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trash2, AlertTriangle, Loader2, LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { createPageUrl } from '../utils';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function Account() {
  const { user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await base44.functions.invoke('deleteAccount', {});
      setOpen(false);
      // Sign out on success
      logout(true);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Failed to delete account. Please try again or contact support.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to={createPageUrl('Home')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-[14px]">← Back to Home</span>
        </Link>
      </div>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DC2626]/10 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0044CC]">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Account</h1>
              <p className="text-white/60 mt-1 text-[14px]">Manage your profile and settings</p>
            </div>
          </motion.div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#D4AF37] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-slate-900 font-bold text-lg truncate">{user?.full_name || 'User'}</p>
                <p className="text-white/60 text-[14px] truncate">{user?.email || ''}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-[14px] capitalize">
                  {user?.role || 'user'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sign out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-slate-900 font-semibold text-[14px]">Sign out</p>
                  <p className="text-white/60 text-[14px]">End your current session</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => logout(true)} className="text-[14px]">
                Sign out
              </Button>
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#DC2626]/10 to-transparent border border-[#DC2626]/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#DC2626]" />
              <h2 className="text-slate-900 font-bold text-lg">Danger Zone</h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-semibold text-[14px]">Delete account</p>
                  <p className="text-white/60 text-[14px]">
                    Permanently remove your account and sign you out. This cannot be undone.
                  </p>
                </div>
              </div>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex items-center gap-2 text-[14px] flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                    Delete account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#1a1f36] border-white/10 text-slate-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900">Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/70 text-[14px]">
                      This will permanently delete your account and remove your access to ECCHFA Hub.
                      You will need an administrator to invite you again if you want to return.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  {error && (
                    <p className="text-[14px] text-[#DC2626] bg-[#DC2626]/10 rounded-lg px-3 py-2">{error}</p>
                  )}
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-[14px]" disabled={deleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={deleting}
                      className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white text-[14px] flex items-center gap-2"
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting…
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete permanently
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
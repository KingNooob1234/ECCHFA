import React, { useState } from 'react';
import { Search, ArrowDownWideNarrow, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const sortOptions = [
  { value: 'trophies', label: 'Most Trophies' },
  { value: 'rating', label: 'Highest Rating' },
];

export default function PlayerFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}) {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sortLabel = sortOptions.find((o) => o.value === sortBy)?.label || 'Sort';

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white/60 border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-[#0066FF] focus:ring-[#0066FF]/20"
          />
        </div>

        {/* Sort trigger */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="h-12 bg-white/60 border-slate-300 text-slate-900 rounded-xl justify-start gap-2 text-[14px]"
            >
              <ArrowDownWideNarrow className="w-4 h-4 text-slate-500" />
              {sortLabel}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-slate-100 border-slate-300 text-slate-900" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <DrawerHeader>
              <DrawerTitle className="text-slate-900">Sort by</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 space-y-6">
              <div>
                <p className="text-slate-500 text-[14px] font-semibold mb-2">Sort by</p>
                <div className="space-y-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] transition-colors ${
                        sortBy === opt.value
                          ? 'bg-[#0066FF]/20 text-slate-900'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                      style={{ minHeight: 44 }}
                    >
                      {opt.label}
                      {sortBy === opt.value && <Check className="w-4 h-4 text-[#0066FF]" />}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => setDrawerOpen(false)}
                className="w-full h-12 bg-[#0066FF] hover:bg-[#004BB5] text-white rounded-xl text-[14px]"
              >
                Apply
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-white/60 border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-[#0066FF] focus:ring-[#0066FF]/20"
        />
      </div>

      {/* Sort */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48 h-12 bg-white/60 border-slate-300 text-slate-900 rounded-xl">
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="w-4 h-4 text-slate-500" />
            <SelectValue placeholder="Sort" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-slate-100 border-slate-300">
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-slate-900 hover:bg-slate-200">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
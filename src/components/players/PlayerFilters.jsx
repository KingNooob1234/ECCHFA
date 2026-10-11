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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white/5 border-white/10 text-slate-100 placeholder:text-white/40 rounded-xl focus:border-[#16a34a] focus:ring-[#16a34a]/20"
          />
        </div>

        {/* Sort trigger */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="h-12 bg-white/5 border-white/10 text-slate-100 rounded-xl justify-start gap-2 text-[14px]"
            >
              <ArrowDownWideNarrow className="w-4 h-4 text-white/50" />
              {sortLabel}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#242428] border-white/10 text-slate-100" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <DrawerHeader>
              <DrawerTitle className="text-slate-100">Sort by</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 space-y-6">
              <div>
                <p className="text-white/50 text-[14px] font-semibold mb-2">Sort by</p>
                <div className="space-y-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] transition-colors ${
                        sortBy === opt.value
                          ? 'bg-[#16a34a]/20 text-slate-100'
                          : 'text-white/60 hover:bg-white/5'
                      }`}
                      style={{ minHeight: 44 }}
                    >
                      {opt.label}
                      {sortBy === opt.value && <Check className="w-4 h-4 text-[#16a34a]" />}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => setDrawerOpen(false)}
                className="w-full h-12 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-[14px]"
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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <Input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-white/5 border-white/10 text-slate-100 placeholder:text-white/40 rounded-xl focus:border-[#16a34a] focus:ring-[#16a34a]/20"
        />
      </div>

      {/* Sort */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48 h-12 bg-white/5 border-white/10 text-slate-100 rounded-xl">
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="w-4 h-4 text-white/50" />
            <SelectValue placeholder="Sort" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#242428] border-white/10">
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-slate-100 hover:bg-white/5">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Search,
  PlusCircle,
  Clock,
  MapPin,
 
  ArrowRight,
} from "lucide-react";
import { useGetLostFoundQuery } from "@/redux/features/lost-found/lostFound.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LostFoundListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const activeType = searchParams.get("type") || "All";

  const {
    data: lostFoundResponse,
    isLoading,
    isError,
    refetch,
  } = useGetLostFoundQuery({
    search: searchQuery || undefined,
    type: activeType === "All" ? undefined : activeType.toLowerCase(),
  });

  const items = lostFoundResponse?.data || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set("search", searchQuery);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleTypeSelect = (type) => {
    const newParams = new URLSearchParams(searchParams);
    if (type === "All") {
      newParams.delete("type");
    } else {
      newParams.set("type", type);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 mt-14">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-muted">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground font-serif">
            Lost & Found
          </h1>
          <p className="text-sm text-muted-foreground">
            Recover lost items or list found belongings on the Metropolitan University campus.
          </p>
        </div>
        <Link to="/lost-found/new">
          <Button className="rounded-xl gap-2 font-semibold shadow-md bg-amber-600 hover:bg-amber-700 text-white">
            <PlusCircle className="h-4 w-4" />
            Report Item
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="pl-10 h-10 rounded-xl"
          />
        </form>

        {/* Type selector */}
        <div className="flex items-center gap-2">
          {["All", "Lost", "Found"].map((type) => (
            <Button
              key={type}
              onClick={() => handleTypeSelect(type)}
              variant={activeType === type ? "default" : "outline"}
              className="rounded-full text-xs h-8 px-4"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Notice Board grid */}
      {isLoading ? (
        <LoadingState message="Loading campus listings..." items={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : items.length === 0 ? (
        <EmptyState
          title="No notices found"
          description={
            searchQuery || activeType !== "All"
              ? "No items match your filter criteria. Try expanding search tags."
              : "All clear! No lost or found items are currently reported on campus."
          }
        >
          <Link to="/lost-found/new">
            <Button className="rounded-xl">Report an Item</Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.id || item._id}
              className="overflow-hidden border border-muted rounded-2xl shadow-xs hover:shadow-md hover:border-primary/25 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Item image or placeholder */}
                <div className="relative h-44 bg-muted border-b overflow-hidden">
                  <img
                    src={item.image || "https://i.ibb.co.com/47C2Fh6L/placeholder.jpg"}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border text-white shadow-sm ${
                      item.type === "lost"
                        ? "bg-red-600 border-red-500"
                        : "bg-green-600 border-green-500"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h2 className="text-lg font-bold text-foreground tracking-tight leading-snug line-clamp-1">
                    {item.itemName}
                  </h2>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{item.location || "Campus Ground"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <Link to={`/lost-found/${item.id || item._id}`} className="block">
                  <Button variant="outline" className="w-full rounded-xl text-xs gap-1.5 font-semibold">
                    <span>Details & Contact</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

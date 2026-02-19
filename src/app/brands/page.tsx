"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBrands, deleteBrand, type Brand } from "@/lib/store";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    setBrands(getBrands());
  }, []);

  const handleDelete = (id: string) => {
    deleteBrand(id);
    setBrands(getBrands());
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage brand profiles and knowledge bases
          </p>
        </div>
        <Link href="/brands/new">
          <Button size="sm">
            <Plus className="size-4 mr-1" />
            Add Brand
          </Button>
        </Link>
      </div>

      {brands.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <Building2 className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-sm font-semibold mb-1">No brands yet</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Add your first brand to start generating campaigns and flows
          </p>
          <Link href="/brands/new">
            <Button size="sm">
              <Plus className="size-4 mr-1" />
              Add Brand
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <Card key={brand.id} className="group">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{brand.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(brand.id)}
                  >
                    <Trash2 className="size-3 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {brand.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {brand.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {brand.website && (
                    <Badge variant="outline" className="text-[10px]">
                      <Globe className="size-2.5 mr-1" />
                      {brand.website.replace(/^https?:\/\//, "")}
                    </Badge>
                  )}
                  {brand.klaviyoAccount && (
                    <Badge variant="outline" className="text-[10px]">
                      Klaviyo: {brand.klaviyoAccount}
                    </Badge>
                  )}
                  {brand.products.length > 0 && (
                    <Badge variant="secondary" className="text-[10px]">
                      {brand.products.length} products
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import SavedContractsButton from "../../../../../../components/trade/SavedContractsButton";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSavedContractDraft } from "../../../../../../data/trade/storage";

export default function EditContractPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const id = String(params.id);

    if (!id) {
      router.replace("/admin/trade/contracts");
      return;
    }

    const saved = getSavedContractDraft(id);

    if (!saved) {
      router.replace("/admin/trade/contracts");
      return;
    }

    const query = new URLSearchParams({
      editContractId: saved.id,
      businessType: saved.businessType,
      companyId: saved.companyId,
      customerId: saved.customerId,
      productId: saved.productId,
    });

    router.replace(`/admin/trade/new?${query.toString()}`);
  }, [params.id, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6f8]">
            <div className="flex justify-end mb-4">
              <SavedContractsButton />
            </div>

      <div className="text-sm text-black/50">
        Opening contract editor...
      </div>
    </main>
  );
}

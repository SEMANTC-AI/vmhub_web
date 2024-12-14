// src/app/campaigns/layouts.tsx

export default function CampaignLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        {/* Using font-display for Space_Grotesk */}
        <h2 className="text-2xl font-display font-semibold text-gray-900">Campanhas</h2>
        {/* Using default Manrope via font-sans */}
        <p className="mt-2 text-sm text-gray-500">
          Gerencie suas campanhas de marketing automatizadas
        </p>
      </div>
      {children}
    </div>
  );
}
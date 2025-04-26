import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function BoutiqueChart({ data }) {
  return (
    <section
      className="bg-white p-4 rounded shadow border mt-6"
      aria-label="Graphique des boutiques créées par mois"
    >
      <h2 className="text-md font-semibold mb-4 text-gray-700">
        📈 Boutiques créées par mois
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} role="img" aria-label="Histogramme des boutiques par mois">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#3b82f6"
            name="Nombre de boutiques"
            isAnimationActive={true}
          >
            {
              // Ajout dynamique d’un titre dans chaque barre pour SEO et accessibilité
              data.map((entry, index) => (
                <title key={index}>
                  {`${entry.mois} : ${entry.count} boutiques créées`}
                </title>
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

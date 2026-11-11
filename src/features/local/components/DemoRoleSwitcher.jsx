import LegacyIcon from "../../../components/common/LegacyIcon";

const roles = [
  ["visitante", "Visitante"],
  ["usuario", "Usuário"],
  ["morador", "Morador"],
  ["admin", "Admin"],
];

export default function DemoRoleSwitcher({ role, onChange }) {
  return (
    <aside className="demo" aria-label="Controles demonstrativos">
      <div><LegacyIcon name="settings" /><b>Modo demonstração</b></div>
      <div className="roles">
        {roles.map(([value, label]) => (
          <button key={value} type="button" onClick={() => onChange(value)} aria-pressed={role === value}>{label}</button>
        ))}
      </div>
    </aside>
  );
}

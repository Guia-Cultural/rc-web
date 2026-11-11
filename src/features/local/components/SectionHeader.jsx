import LegacyIcon from "../../../components/common/LegacyIcon";

export default function SectionHeader({ icon, badge, children, lead, split = false, action }) {
  return (
    <div className={`sh rv ${split ? "split" : ""}`}>
      <div>
        <span className="badge"><LegacyIcon name={icon} />{badge}</span>
        <h2 className="title">{children}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}

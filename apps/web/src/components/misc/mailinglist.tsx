import DarkButton from "~/styles/shared/buttons/darkButton";
import mailingStyle from "./mailingStyle.module.scss";

const MailingListComponent = () => {
  const containerClass = "flex px-6 py-14 flex-col";
  return (
    <div className={mailingStyle.box}>
      <div>
        <div className={mailingStyle.title}>Join Our Mailing List</div>
        <div className={mailingStyle.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
          mi.
        </div>
      </div>
      <div className="sm:flex">
        <input placeholder="Enter your email" className={mailingStyle.input} />
        <DarkButton text="Subscribe" className={mailingStyle.btn} />
      </div>
    </div>
  );
};

export default MailingListComponent;

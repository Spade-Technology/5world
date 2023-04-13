import { Button, Input } from "antd";

export function MailingListComponent() {
  return (
    <section className="flex flex-col items-center bg-vdao-lightpurple py-24">
      <div className="flex gap-48">
        <div className="flex w-full flex-col">
          <h1 className="text-center text-5xl font-medium text-vdao-dark">
            Join Our Mailing List
          </h1>
          <span className="text-vdao-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
            mi.
          </span>
        </div>
        <div className="flex w-full items-center gap-4">
          <Input
            placeholder="Enter your email"
            className="h-8 w-96 "
            type="email"
          />
          <Button type="primary" className="h-8 !bg-vdao-dark">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

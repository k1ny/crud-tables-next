import { HeaderLink } from "@/shared/ui/headerLink";
import {
  ClipboardType,
  ClockArrowUp,
  Hotel,
  MapPinHouse,
  Package,
  Send,
  User,
} from "lucide-react";

export const Header = () => {
  return (
    <div className="flex flex-col min-h-full absolute border-1 pt-2">
      <HeaderLink href={"/"} name="Пользователи" icon={<User />} />
      <HeaderLink href={"/towns"} name="Города" icon={<Hotel />} />
      <HeaderLink
        href={"/packageTypes"}
        name="Типы посылок"
        icon={<Package />}
      />
      <HeaderLink href={"/places"} name="Пункты выдачи" icon={<Send />} />
      <HeaderLink
        href={"/userAddresses"}
        name="Адреса пользователей"
        icon={<MapPinHouse />}
      />
      <HeaderLink
        href={"/orderTypes"}
        name="Типы заказов"
        icon={<ClipboardType />}
      />
      <HeaderLink href={"/orders"} name="Заказы" icon={<ClockArrowUp />} />
    </div>
  );
};
